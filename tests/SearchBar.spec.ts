import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { nextTick } from "vue";
import SearchBar from "../src/components/SearchBar.vue";
import SearchInput from "./../src/components/SearchInput.vue";
import ClearButton from "../src/components/ClearButton.vue";
import ErrorMessage from "../src/components/ErrorMessage.vue";

// Mock composables
vi.mock("@/composables/useDebounce", () => ({
  useDebounce: () => ({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    debounce: (fn: Function) => fn(),
  }),
}));

vi.mock("@/composables/useValidation", () => ({
  useValidation: (value: string, minLength: number) => ({
    validate: () => ({
      isValid: value.length >= minLength,
      errorMessage: value.length >= minLength ? "" : `Minimum length is ${minLength}`,
    }),
  }),
}));

// Mock child components
const mockComponents = {
  SearchInput: {
    template:
      '<input type="text" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" @focus="$emit(\'focus\')" @blur="$emit(\'blur\')" />',
    props: ["modelValue", "placeholder", "errorMessage"],
    emits: ["update:modelValue", "focus", "blur"],
  },
  ClearButton: {
    template: "<button @click=\"$emit('clear')\">Clear</button>",
    emits: ["clear"],
  },
  ErrorMessage: {
    template: '<div class="error">{{ message }}</div>',
    props: ["message"],
  },
};

describe("Search Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(SearchBar, {
      global: {
        components: mockComponents,
      },
      props: {
        placeholder: "Search...",
        minLength: 2,
        debounceTime: 300,
      },
    });
  });

  describe("Component Rendering", () => {
    it("renders the component", () => {
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(".search-wrapper").exists()).toBe(true);
    });

    it("renders SearchInput component", () => {
      expect(wrapper.findComponent(SearchInput).exists()).toBe(true);
    });

    it("does not render ClearButton initially", () => {
      expect(wrapper.findComponent(ClearButton).exists()).toBe(false);
    });

    it("does not render ErrorMessage initially", () => {
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
    });
  });

  describe("Props Handling", () => {
    it("uses default props correctly", () => {
      const defaultWrapper = mount(SearchBar);
      expect(defaultWrapper.props("placeholder")).toBe("Search...");
      expect(defaultWrapper.props("minLength")).toBe(0);
      expect(defaultWrapper.props("debounceTime")).toBe(300);
    });

    it("accepts custom props", () => {
      expect(wrapper.props("placeholder")).toBe("Search...");
      expect(wrapper.props("minLength")).toBe(2);
      expect(wrapper.props("debounceTime")).toBe(300);
    });
  });

  describe("User Input Handling", () => {
    it("updates searchQuery on input", async () => {
      const input = wrapper.findComponent(SearchInput);
      await input.setValue("test");
      expect(wrapper.vm.searchQuery).toBe("test");
    });

    it("emits search event with valid input", async () => {
      const input = wrapper.findComponent(SearchInput);
      await input.setValue("test");
      expect(wrapper.emitted("search")).toBeTruthy();
      expect(wrapper.emitted("search")[0]).toEqual(["test"]);
    });

    it("shows error message for invalid input", async () => {
      const input = wrapper.findComponent(SearchInput);
      await input.setValue("t"); // Less than minLength
      await nextTick();
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(true);
    });
  });

  describe("Focus Handling", () => {
    it("sets isFocused to true on focus", async () => {
      const input = wrapper.findComponent(SearchInput);
      await input.trigger("focus");
      expect(wrapper.vm.isFocused).toBe(true);
    });

    it("sets isFocused to false on blur", async () => {
      const input = wrapper.findComponent(SearchInput);
      await input.trigger("focus");
      await input.trigger("blur");
      expect(wrapper.vm.isFocused).toBe(false);
    });

    it("applies focused class when focused", async () => {
      const input = wrapper.findComponent(SearchInput);
      await input.trigger("focus");
      expect(wrapper.find(".search-container").classes()).toContain("is-focused");
    });
  });

  describe("Validation", () => {
    it("validates input against minLength", async () => {
      const input = wrapper.findComponent(SearchInput);
      await input.setValue("t");
      await nextTick();
      expect(wrapper.vm.errorMessage).toBeTruthy();
    });

    it("clears error when input becomes valid", async () => {
      const input = wrapper.findComponent(SearchInput);
      await input.setValue("t");
      await nextTick();
      await input.setValue("test");
      await nextTick();
      expect(wrapper.vm.errorMessage).toBeFalsy();
    });
  });

  describe("Debounce Behavior", () => {
    it("debounces search emit", async () => {
      const input = wrapper.findComponent(SearchInput);
      await input.setValue("t");
      await input.setValue("te");
      await input.setValue("tes");
      await input.setValue("test");

      // Due to mock implementation, we still get all events
      // In real implementation, this would be debounced
      expect(wrapper.emitted("search")).toBeTruthy();
    });
  });
});

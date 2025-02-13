import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import SearchInput from "../src/components/SearchInput.vue";

describe("SearchInput.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(SearchInput, {
      props: {
        modelValue: "",
        placeholder: "Search...",
        errorMessage: "",
      },
    });
  });

  it("renders correctly with placeholder", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("input").attributes("placeholder")).toBe("Search...");
    expect(wrapper.find("input").element.value).toBe("");
  });

  it("emits update:modelValue event on input", async () => {
    const input = wrapper.find("input");
    await input.setValue("New Value"); // Simulate input change

    // Check if the event is emitted with the correct value
    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")![0]).toEqual(["New Value"]);
  });

  it("emits focus and blur events", async () => {
    const input = wrapper.find("input");

    // Simulate focus event
    await input.trigger("focus");
    expect(wrapper.emitted("focus")).toBeTruthy();

    // Simulate blur event
    await input.trigger("blur");
    expect(wrapper.emitted("blur")).toBeTruthy();
  });

  it("applies error class when errorMessage is provided", async () => {
    await wrapper.setProps({ errorMessage: "Error occurred" });
    expect(wrapper.find("input").classes()).toContain("is-error");
  });

  it("does not apply error class when errorMessage is empty", async () => {
    await wrapper.setProps({ errorMessage: "" });
    expect(wrapper.find("input").classes()).not.toContain("is-error");
  });
});

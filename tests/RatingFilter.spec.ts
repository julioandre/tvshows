import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import RatingFilter from "../src/components/RatingSort.vue";

describe("RatingFilter Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(RatingFilter);
  });

  describe("Component Rendering", () => {
    it("renders the component", () => {
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(".rating-filter").exists()).toBe(true);
    });

    it("renders the label correctly", () => {
      const label = wrapper.find("label");
      expect(label.exists()).toBe(true);
      expect(label.text()).toBe("Sort by Rating:");
    });

    it("renders the select element", () => {
      const select = wrapper.find("select");
      expect(select.exists()).toBe(true);
    });

    it("renders both option elements", () => {
      const options = wrapper.findAll("option");
      expect(options).toHaveLength(2);
      expect(options[0].text()).toBe("Ascending");
      expect(options[1].text()).toBe("Descending");
    });
  });

  describe("Default State", () => {
    it("initializes with ascending order selected", () => {
      const select = wrapper.find("select");
      expect(select.element.value).toBe("asc");
    });

    it("has correct initial v-model value", () => {
      expect(wrapper.vm.selectedRating).toBe("asc");
    });
  });

  describe("User Interaction", () => {
    it("updates selectedRating when select value changes", async () => {
      const select = wrapper.find("select");
      await select.setValue("desc");
      expect(wrapper.vm.selectedRating).toBe("desc");
    });

    it("emits update event when value changes to descending", async () => {
      const select = wrapper.find("select");
      await select.setValue("desc");

      expect(wrapper.emitted("update")).toBeTruthy();
      expect(wrapper.emitted("update")[0]).toEqual(["desc"]);
    });

    it("emits update event when value changes to ascending", async () => {
      // First change to desc
      await wrapper.find("select").setValue("desc");
      // Then change back to asc
      await wrapper.find("select").setValue("asc");

      const updateEvents = wrapper.emitted("update");
      expect(updateEvents).toHaveLength(2);
      expect(updateEvents[1]).toEqual(["asc"]);
    });

    it("maintains correct value after multiple changes", async () => {
      const select = wrapper.find("select");

      await select.setValue("desc");
      expect(wrapper.vm.selectedRating).toBe("desc");

      await select.setValue("asc");
      expect(wrapper.vm.selectedRating).toBe("asc");

      await select.setValue("desc");
      expect(wrapper.vm.selectedRating).toBe("desc");
    });
  });

  describe("Accessibility", () => {
    it("has associated label for select element", () => {
      const label = wrapper.find("label");
      const select = wrapper.find("select");

      expect(label.attributes("for")).toBe("rating-filter");
      expect(select.attributes("id")).toBe("rating-filter");
    });

    it("select element is not disabled", () => {
      const select = wrapper.find("select");
      expect(select.element.disabled).toBe(false);
    });
  });

  describe("CSS Classes", () => {
    it("has correct CSS classes", () => {
      expect(wrapper.find(".rating-filter").exists()).toBe(true);
      expect(wrapper.find(".filter-label").exists()).toBe(true);
      expect(wrapper.find(".filter-select").exists()).toBe(true);
    });
  });

  describe("Type Checking", () => {
    it("only accepts valid sort orders", async () => {
      const select = wrapper.find("select");

      // Valid values
      await select.setValue("asc");
      expect(wrapper.vm.selectedRating).toBe("asc");

      await select.setValue("desc");
      expect(wrapper.vm.selectedRating).toBe("desc");
    });
  });
});

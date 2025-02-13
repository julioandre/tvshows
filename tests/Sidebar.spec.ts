import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Sidebar from "../src/components/SideBar.vue";

// Mock the useBreakpoint composable
vi.mock("../src/composables/useBreakpoints.ts", () => ({
  useBreakpoint: () => ({
    isMobile: false,
  }),
}));

describe("Sidebar Component", () => {
  let wrapper: VueWrapper;
  const mockGenres = [
    { name: "Action", id: 1 },
    { name: "Comedy", id: 2 },
    { name: "Drama", id: 3 },
  ];

  const createWrapper = (props = {}) => {
    return mount(Sidebar, {
      props: {
        allGenres: mockGenres,
        selctedGenres: [],
        ...props,
      },
    });
  };

  beforeEach(() => {
    wrapper = createWrapper();
  });

  it("renders properly", () => {
    expect(wrapper.find(".sidebar").exists()).toBe(true);
    expect(wrapper.find(".sidebar-title").text()).toBe("Genres");
    expect(wrapper.findAll(".sidebar-links")).toHaveLength(3);
  });

  it("renders all genres from props", () => {
    const genreLabels = wrapper.findAll("label");
    expect(genreLabels).toHaveLength(mockGenres.length);
    genreLabels.forEach((label, index) => {
      expect(label.text().trim()).toBe(mockGenres[index].name);
    });
  });

  it("initializes with selected genres from props", async () => {
    const selectedGenres = ["Action", "Drama"];
    wrapper = createWrapper({ selctedGenres: selectedGenres });
    await wrapper.vm.$nextTick();

    const checkboxes = wrapper.findAll('input[type="checkbox"]');
    const selectedCheckboxes = checkboxes.filter(
      (checkbox) => (checkbox.element as HTMLInputElement).checked
    );
    expect(selectedCheckboxes).toHaveLength(2);
  });

  it("emits filter event when genre is selected", async () => {
    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.setValue(true);

    expect(wrapper.emitted("filter")).toBeTruthy();
  });

  it("clears all selected genres when clear button is clicked", async () => {
    // First select some genres
    const checkboxes = wrapper.findAll('input[type="checkbox"]');
    await checkboxes[0].setValue(true);
    await checkboxes[1].setValue(true);

    // Click clear button
    const clearButton = wrapper.find(".sidebar-button");
    await clearButton.trigger("click");

    // Check that all checkboxes are unchecked
    const selectedCheckboxes = wrapper
      .findAll('input[type="checkbox"]')
      .filter((checkbox) => (checkbox.element as HTMLInputElement).checked);
    expect(selectedCheckboxes).toHaveLength(0);

    // Verify filter event was emitted with empty array
    expect(wrapper.emitted("filter")?.[wrapper.emitted("filter")?.length - 1][0]).toEqual([]);
  });

  describe("Mobile functionality", () => {
    beforeEach(() => {
      vi.mock("../src/composables/useBreakpoints.ts", () => ({
        useBreakpoint: () => ({
          isMobile: true,
        }),
      }));
      wrapper = createWrapper();
    });

    it("renders toggle button only on mobile", () => {
      expect(wrapper.find(".toggle-button").exists()).toBe(true);
    });

    it("toggles sidebar expansion when toggle button is clicked", async () => {
      const toggleButton = wrapper.find(".toggle-button");
      expect(wrapper.find(".sidebar").classes()).toContain("collapsed");

      await toggleButton.trigger("click");
      expect(wrapper.find(".sidebar").classes()).not.toContain("collapsed");

      await toggleButton.trigger("click");
      expect(wrapper.find(".sidebar").classes()).toContain("collapsed");
    });

    it("shows overlay when sidebar is expanded", async () => {
      const toggleButton = wrapper.find(".toggle-button");
      await toggleButton.trigger("click");

      expect(wrapper.find(".sidebar-overlay").exists()).toBe(true);
    });

    it("closes sidebar when overlay is clicked", async () => {
      const toggleButton = wrapper.find(".toggle-button");
      await toggleButton.trigger("click");

      const overlay = wrapper.find(".sidebar-overlay");
      await overlay.trigger("click");

      expect(wrapper.find(".sidebar").classes()).toContain("collapsed");
    });
  });
});

import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import Sidebar from "../src/components/Sidebar.vue";
import { nextTick } from "vue";

describe("Sidebar.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Sidebar, {
      props: {
        allGenres: [{ name: "Action" }, { name: "Comedy" }, { name: "Drama" }],
        selctedGenres: [],
      },
    });
  });

  it("renders correctly", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".sidebar-title").text()).toBe("Genres");
    expect(wrapper.findAll(".sidebar-links").length).toBe(3); // Three genres should be rendered
  });

  it("toggles sidebar when button is clicked on mobile", async () => {
    // Initially, check that the sidebar is collapsed
    expect(wrapper.classes()).not.toContain("collapsed");

    // Simulate clicking the toggle button
    const toggleButton = wrapper.find(".toggle-button");
    await toggleButton.trigger("click");

    // Sidebar should now be collapsed
    expect(wrapper.classes()).toContain("collapsed");
  });

  it("selects a genre when the checkbox is checked", async () => {
    const checkbox = wrapper.find('input[type="checkbox"][value="Action"]');

    // Check the checkbox
    await checkbox.setChecked();

    // Check if the selectedGenre updated correctly
    expect(wrapper.vm.selectedGenre).toContain("Action");
  });

  it("clears selected genres when the clear button is clicked", async () => {
    // First, check that a genre is selected
    const checkbox = wrapper.find('input[type="checkbox"][value="Action"]');
    await checkbox.setChecked();

    expect(wrapper.vm.selectedGenre).toContain("Action");

    // Now, click the clear filters button
    const clearButton = wrapper.find(".sidebar-button");
    await clearButton.trigger("click");

    // Check if selectedGenre is cleared
    expect(wrapper.vm.selectedGenre).toEqual([]);
  });

  it("emits the filter event with selected genres when a checkbox is checked", async () => {
    const emitSpy = vi.spyOn(wrapper.vm.$emit, "filter");
    const checkbox = wrapper.find('input[type="checkbox"][value="Comedy"]');

    // Check the checkbox
    await checkbox.setChecked();

    // Wait for next tick to ensure the watcher has run
    await nextTick();

    // Verify the emit call
    expect(emitSpy).toHaveBeenCalledWith(["Comedy"]);
  });
});

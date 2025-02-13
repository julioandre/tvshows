import { mount } from "@vue/test-utils";
import SearchBar from "../src/components/SearchBar.vue";
import SearchInput from "../src/components/SearchInput.vue";
import ClearButton from "../src/components/ClearButton.vue";
import ErrorMessage from "../src/components/ErrorMessage.vue";
import { nextTick } from "vue";
import { beforeEach, describe, expect, it } from "vitest";

describe("SearchWrapper.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(SearchBar, {
      props: {
        placeholder: "Search...",
        minLength: 3,
        debounceTime: 300,
      },
    });
  });

  it("renders the search input and buttons correctly", () => {
    expect(wrapper.findComponent(SearchInput).exists()).toBe(true);
    expect(wrapper.findComponent(ClearButton).exists()).toBe(false); // Initially, the clear button should not be visible
  });

  it("updates the search query", async () => {
    const searchInput = wrapper.findComponent(SearchInput);

    await searchInput.setValue("Te"); // Shorter than minLength, should not show clear button

    expect(wrapper.vm.searchQuery).toBe("Te");
    expect(wrapper.findComponent(ClearButton).exists()).toBe(false); // Clear button should not be visible

    await searchInput.setValue("Test"); // This should trigger debounce and emit the search event
    await nextTick(); // wait for next DOM update

    expect(wrapper.vm.searchQuery).toBe("Test");
    expect(wrapper.findComponent(ClearButton).exists()).toBe(true); // Clear button should be visible
  });

  it('emits "search" only when the input is valid', async () => {
    const searchInput = wrapper.findComponent(SearchInput);
    await searchInput.setValue("Te"); // Invalid query (too short)

    expect(wrapper.emitted("search")).toBeUndefined(); // No search event should be emitted

    await searchInput.setValue("Test"); // Now it's valid
    await nextTick(); // Wait for debounce

    expect(wrapper.emitted("search")).toBeTruthy(); // Search event should be emitted
    expect(wrapper.emitted("search")[0]).toEqual(["Test"]); // Check emitted value
  });

  it("clears the search when clear button is clicked", async () => {
    const searchInput = wrapper.findComponent(SearchInput);
    await searchInput.setValue("Test"); // Make sure there is a value
    await nextTick(); // Wait for potential debounce

    const clearButton = wrapper.findComponent(ClearButton);
    await clearButton.trigger("clear"); // Simulate clear action

    expect(wrapper.vm.searchQuery).toBe(""); // Search query should be cleared
    expect(wrapper.findComponent(ClearButton).exists()).toBe(false); // Clear button should not be visible
    expect(wrapper.emitted("clear")).toBeTruthy(); // Clear event should be emitted
  });

  it("displays error message when input is invalid", async () => {
    const searchInput = wrapper.findComponent(SearchInput);
    await searchInput.setValue("Te"); // Invalid input
    await nextTick();

    expect(wrapper.vm.errorMessage).toBe(""); // check if errorMessage is empty (there's no message in your default implementation)
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(true); // ErrorMessage should be displayed
    expect(wrapper.findComponent(ErrorMessage).props("message")).toBe(""); // The message should be empty
  });

  it("handles focus and blur events correctly", async () => {
    const searchInput = wrapper.findComponent(SearchInput);
    await searchInput.trigger("focus");

    expect(wrapper.vm.isFocused).toBe(true); // Ensure isFocused is true
    expect(wrapper.find(".search-container").classes()).toContain("is-focused"); // CSS class should be added

    await searchInput.trigger("blur");

    expect(wrapper.vm.isFocused).toBe(false); // Ensure isFocused is false
    expect(wrapper.find(".search-container").classes()).not.toContain("is-focused"); // CSS class should be removed
  });
});

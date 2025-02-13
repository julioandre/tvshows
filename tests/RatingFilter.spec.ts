import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import RatingFilter from "../src/components/RatingSort.vue";

describe("RatingFilter.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(RatingFilter);
  });

  it("renders the component correctly", () => {
    expect(wrapper.exists()).toBe(true);
    const label = wrapper.find(".filter-label");
    expect(label.text()).toBe("Sort by Rating:");
    const select = wrapper.find(".filter-select");
    expect(select.exists()).toBe(true);
  });

  it("emits an update event with the default value when mounted", () => {
    const emitted = wrapper.emitted("update");
    expect(emitted).toBeTruthy();
    expect(emitted[0]).toEqual(["asc"]);
  });

  it("emits the correct value when the select option is changed to descending", async () => {
    const select = wrapper.find("select");
    await select.setValue("desc"); // Change the select value to 'desc'

    const emitted = wrapper.emitted("update");
    expect(emitted).toBeTruthy();
    expect(emitted[1]).toEqual(["desc"]); // Check that 'desc' was emitted
  });

  it("emits the correct value when the select option is changed to ascending", async () => {
    const select = wrapper.find("select");
    await select.setValue("desc"); // First, change it to 'desc'
    await select.setValue("asc"); // Then, change it back to 'asc';

    const emitted = wrapper.emitted("update");
    expect(emitted).toBeTruthy();
    expect(emitted[2]).toEqual(["asc"]); // Check that 'asc' was emitted
  });
});

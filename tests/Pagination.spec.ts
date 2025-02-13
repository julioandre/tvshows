import { mount } from "@vue/test-utils";
import Pagination from "../src/components/PaginationComponent.vue";
import { beforeEach, describe, expect, it } from "vitest";

describe("Pagination.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 5,
      },
    });
  });

  it("renders the pagination component correctly", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("span").text()).toBe("Page 1 of 5");
    expect(wrapper.find("button:disabled").text()).toBe("Prev");
  });

  it("does not disable the Next button when not on the last page", () => {
    expect(wrapper.findAll("button")[1].attributes("disabled")).toBeUndefined();
  });

  it('emits "pageChange" with the previous page when Prev button is clicked', async () => {
    await wrapper.setProps({ currentPage: 2 }); // Change to page 2
    const prevButton = wrapper.find("button:first-of-type");
    await prevButton.trigger("click"); // Click the Prev button

    const emitted = wrapper.emitted("pageChange");
    expect(emitted).toBeTruthy();
    expect(emitted[0]).toEqual([1]); // Expect "pageChange" event to emit the previous page
  });

  it('does not emit "pageChange" when Prev button is clicked on the first page', async () => {
    const prevButton = wrapper.find("button:first-of-type");
    await prevButton.trigger("click"); // Click Prev button
    const emitted = wrapper.emitted("pageChange");

    expect(emitted).toBeFalsy(); // There should be no emission
  });

  it('emits "pageChange" with the next page when Next button is clicked', async () => {
    const nextButton = wrapper.find("button:last-of-type");
    await nextButton.trigger("click"); // Click the Next button

    const emitted = wrapper.emitted("pageChange");
    expect(emitted).toBeTruthy();
    expect(emitted[0]).toEqual([2]); // Expect "pageChange" event to emit the next page
  });

  it('does not emit "pageChange" when Next button is clicked on the last page', async () => {
    await wrapper.setProps({ currentPage: 5 }); // Change to the last page
    const nextButton = wrapper.find("button:last-of-type");
    await nextButton.trigger("click"); // Click Next button
    const emitted = wrapper.emitted("pageChange");

    expect(emitted).toBeFalsy(); // There should be no emission
  });
});

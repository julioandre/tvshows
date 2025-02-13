import { mount } from "@vue/test-utils";
import ImageCard from "../src/components/ImageCard.vue";
import { describe, expect, it } from "vitest";

describe("ImageCard.vue", () => {
  it("renders correctly with provided props", () => {
    const wrapper = mount(ImageCard, {
      props: {
        image: "http://example.com/image.jpg",
        name: "Inception",
        rating: 8.8,
      },
    });

    // Check that the image is rendered correctly
    expect(wrapper.find("img").attributes("src")).toBe("http://example.com/image.jpg");
    expect(wrapper.find("img").attributes("alt")).toBe("Inception");
    expect(wrapper.find(".movie-thumbnail").exists()).toBe(true); // Ensure image class exists

    // Check that the name is displayed correctly
    const title = wrapper.find(".card-title strong").text();
    expect(title).toBe("Inception");

    // Check that the rating is displayed
    expect(wrapper.find(".card-title-rating").text()).toBe("8.8");
  });

  it("renders correctly without rating prop", () => {
    const wrapper = mount(ImageCard, {
      props: {
        image: "http://example.com/image.jpg",
        name: "Interstellar",
      },
    });

    // Check that the image is rendered correctly
    expect(wrapper.find("img").attributes("src")).toBe("http://example.com/image.jpg");
    expect(wrapper.find("img").attributes("alt")).toBe("Interstellar");

    // Check that the name is displayed correctly
    // The first instance of .card-title should be the name
    const title = wrapper.find(".card-title strong").text();
    expect(title).toBe("Interstellar");

    // Check that the rating element does not exist
    expect(wrapper.findAll(".card-title strong").length).toBe(1); // Only the name should be present
  });
});

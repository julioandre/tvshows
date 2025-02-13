import { mount } from "@vue/test-utils";
import MovieList from "../src/components/MovieList.vue";
import ImageCard from "../src/components/ImageCard.vue";
import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from "vue";
import { beforeEach, describe, expect, it } from "vitest";

// Mock the router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/about",
      name: "about",
      component: { template: "<div>About Page</div>" }, // Mock component
    },
  ],
});

describe("MovieList.vue", () => {
  let wrapper;

  beforeEach(async () => {
    // Mount the component with the mocked router
    wrapper = mount(MovieList, {
      global: {
        plugins: [router],
      },
      props: {
        items: [
          { id: 1, image: "image1.jpg", name: "Movie 1", rating: 5 },
          { id: 2, image: "image2.jpg", name: "Movie 2", rating: 4 },
        ],
      },
    });
    await router.isReady(); // Wait for the router to be ready
  });

  it("renders the list of movies correctly", () => {
    const movieItems = wrapper.findAll(".movie-item");
    expect(movieItems.length).toBe(2); // There should be 2 items

    // Check if the ImageCard component is correctly rendered
    expect(wrapper.findComponent(ImageCard).exists()).toBe(true);
  });

  it("navigates to the correct page on movie click", async () => {
    const movieItem = wrapper.find(".movie-item:first-of-type");
    await movieItem.trigger("click"); // Simulate a click

    // Check the router's current route params after the click
    await nextTick(); // Wait for the next DOM update cycle

    expect(wrapper.vm.$route.params.show).toBe(
      encodeURIComponent(JSON.stringify({ id: 1, image: "image1.jpg", name: "Movie 1", rating: 5 }))
    ); // Check if parameters are correctly encoded
  });
});

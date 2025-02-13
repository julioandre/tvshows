import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MovieList from "../src/components/MovieList.vue";
import ImageCard from "../src/components/ImageCard.vue";
import { createRouter, createWebHistory } from "vue-router";

// Mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/about/:show",
      name: "about",
      component: {}, // Mock component
    },
  ],
});

// Mock movie data
const mockMovies = [
  {
    id: 1,
    name: "Breaking Bad",
    image: "breaking-bad.jpg",
    rating: 9.5,
  },
  {
    id: 2,
    name: "Friends",
    image: "friends.jpg",
    rating: 8.8,
  },
];

// Mock ImageCard component
vi.mock("./ImageCard.vue", () => ({
  default: {
    name: "ImageCard",
    props: ["image", "name", "rating"],
    template: '<div data-testid="image-card">{{ name }}</div>',
  },
}));

describe("MovieList Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(MovieList, {
      props: {
        items: mockMovies,
      },
      global: {
        plugins: [router],
        stubs: {
          ImageCard: true,
        },
      },
    });
  });

  describe("Component Rendering", () => {
    it("renders the component", () => {
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(".movie-list").exists()).toBe(true);
    });

    it("renders correct number of movie items", () => {
      const movieItems = wrapper.findAll(".movie-item");
      expect(movieItems).toHaveLength(mockMovies.length);
    });

    it("renders ImageCard components with correct props", () => {
      const imageCards = wrapper.findAllComponents(ImageCard);
      expect(imageCards).toHaveLength(mockMovies.length);

      imageCards.forEach((card, index) => {
        expect(card.props()).toEqual({
          image: mockMovies[index].image,
          name: mockMovies[index].name,
          rating: mockMovies[index].rating,
        });
      });
    });
  });

  describe("Navigation", () => {
    it("navigates to correct route when movie item is clicked", async () => {
      const routerPushSpy = vi.spyOn(router, "push");

      await wrapper.findAll(".movie-item")[0].trigger("click");

      expect(routerPushSpy).toHaveBeenCalledWith({
        name: "about",
        params: {
          show: encodeURIComponent(JSON.stringify(mockMovies[0])),
        },
      });
    });

    it("properly encodes movie data in URL", async () => {
      const routerPushSpy = vi.spyOn(router, "push");

      await wrapper.findAll(".movie-item")[0].trigger("click");

      const expectedEncodedData = encodeURIComponent(JSON.stringify(mockMovies[0]));
      expect(routerPushSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          params: { show: expectedEncodedData },
        })
      );
    });
  });

  describe("Props Handling", () => {
    it("accepts items prop as array", () => {
      expect(wrapper.props("items")).toEqual(mockMovies);
    });

    it("updates when items prop changes", async () => {
      const newMovies = [mockMovies[0]];
      await wrapper.setProps({ items: newMovies });

      const movieItems = wrapper.findAll(".movie-item");
      expect(movieItems).toHaveLength(1);
    });
  });

  describe("Error Handling", () => {
    it("handles empty items array", async () => {
      await wrapper.setProps({ items: [] });
      expect(wrapper.findAll(".movie-item")).toHaveLength(0);
    });

    it("handles items with missing properties", async () => {
      const incompleteMovie = [{ id: 1, name: "Test Movie" }];
      await wrapper.setProps({ items: incompleteMovie });

      const imageCards = wrapper.findAllComponents(ImageCard);
      expect(imageCards[0].props().image).toBeUndefined();
      expect(imageCards[0].props().rating).toBeUndefined();
    });
  });

  describe("Component Events", () => {
    it("triggers click event on movie item", async () => {
      const movieItem = wrapper.find(".movie-item");
      await movieItem.trigger("click");

      // Verify router push was called
      expect(router.push).toHaveBeenCalled();
    });
  });
});

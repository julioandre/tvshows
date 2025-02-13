import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CardList from "../src/components/CardList.vue";
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

// Mock data
const mockItems = [
  {
    id: 1,
    name: "Breaking Bad",
    image: "breaking-bad.jpg",
    genres: ["Drama"],
  },
  {
    id: 2,
    name: "Friends",
    image: "friends.jpg",
    genres: ["Comedy"],
  },
];

// Mock ImageCard component
vi.mock("./ImageCard.vue", () => ({
  default: {
    name: "ImageCard",
    props: ["image", "name"],
    template: '<div data-testid="image-card">{{ name }}</div>',
  },
}));

describe("CardList Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CardList, {
      props: {
        items: mockItems,
        genre: "Drama",
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
    it("renders correctly with props", () => {
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find(".card-list-container").exists()).toBe(true);
      expect(wrapper.find(".view-all-button").exists()).toBe(true);
      expect(wrapper.findAll(".card-item")).toHaveLength(mockItems.length);
    });

    it("displays correct genre in view all button", () => {
      expect(wrapper.find(".view-all-button").text()).toBe("All Drama");
    });

    it("renders scroll buttons", () => {
      expect(wrapper.find(".scroll-button.left").exists()).toBe(true);
      expect(wrapper.find(".scroll-button.right").exists()).toBe(true);
    });

    it("renders ImageCard components for each item", () => {
      const imageCards = wrapper.findAllComponents({ name: "ImageCard" });
      expect(imageCards).toHaveLength(mockItems.length);
    });
  });

  describe("Event Handling", () => {
    it("emits filter event when view all button is clicked", async () => {
      await wrapper.find(".view-all-button").trigger("click");
      expect(wrapper.emitted("filter")).toBeTruthy();
      expect(wrapper.emitted("filter")[0]).toEqual([["Drama"]]);
    });

    it("calls scrollLeft when left scroll button is clicked", async () => {
      const scrollBySpy = vi.fn();
      const mockRef = {
        value: {
          scrollBy: scrollBySpy,
        },
      };
      wrapper.vm.cardList = mockRef.value;

      await wrapper.find(".scroll-button.left").trigger("click");
      expect(scrollBySpy).toHaveBeenCalledWith({
        left: -200,
        behavior: "smooth",
      });
    });

    it("calls scrollRight when right scroll button is clicked", async () => {
      const scrollBySpy = vi.fn();
      const mockRef = {
        value: {
          scrollBy: scrollBySpy,
        },
      };
      wrapper.vm.cardList = mockRef.value;

      await wrapper.find(".scroll-button.right").trigger("click");
      expect(scrollBySpy).toHaveBeenCalledWith({
        left: 200,
        behavior: "smooth",
      });
    });
  });

  describe("Navigation", () => {
    it("navigates to correct route when card is clicked", async () => {
      const routerPushSpy = vi.spyOn(router, "push");

      await wrapper.findAll(".card-item")[0].trigger("click");

      expect(routerPushSpy).toHaveBeenCalledWith({
        name: "about",
        params: {
          show: encodeURIComponent(JSON.stringify(mockItems[0])),
        },
      });
    });
  });

  describe("Props Validation", () => {
    it("accepts items prop as array", () => {
      expect(wrapper.props("items")).toEqual(mockItems);
    });

    it("accepts genre prop as string", () => {
      expect(wrapper.props("genre")).toBe("Drama");
    });

    it("updates when props change", async () => {
      await wrapper.setProps({
        genre: "Comedy",
        items: [mockItems[1]],
      });

      expect(wrapper.find(".view-all-button").text()).toBe("All Comedy");
      expect(wrapper.findAll(".card-item")).toHaveLength(1);
    });
  });

  describe("Error Handling", () => {
    it("handles empty items array", async () => {
      await wrapper.setProps({ items: [] });
      expect(wrapper.findAll(".card-item")).toHaveLength(0);
    });

    it("handles undefined cardList ref when scrolling", async () => {
      wrapper.vm.cardList = null;

      // These should not throw errors
      await wrapper.find(".scroll-button.left").trigger("click");
      await wrapper.find(".scroll-button.right").trigger("click");
    });
  });
});

import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { nextTick } from "vue";
import App from "../src/App.vue";
import { useDataStore } from "../src/store/tvshowstore";
import MovieList from "../src/components/MovieList.vue";
import { MovieItem } from "../src/types/movieItem";

// Mock data
const mockShows: MovieItem[] = [
  {
    id: 1,
    name: "The Great Adventure",
    summary: "An epic tale of adventure and discovery across fantastical lands.",
    image: "http://example.com/image1.jpg",
    status: "Running",
    premiered: "2021-09-01",
    genres: ["Adventure", "Fantasy"],
    rating: 8.5,
    ended: null,
    network: {
      id: 101,
      name: "Adventure Network",
      country: {
        name: "USA",
        code: "US",
        timezone: "America/New_York",
      },
      officialSite: "http://example.com/adventure-network",
    },
  },
  {
    id: 2,
    name: "Mystery of the Ages",
    summary: "A gripping mystery that unfolds through time and space.",
    image: "http://example.com/image2.jpg",
    status: "Ended",
    premiered: "2019-06-15",
    genres: ["Mystery", "Drama"],
    rating: 9.0,
    ended: "2022-03-12",
    network: {
      id: 102,
      name: "Drama Channel",
      country: {
        name: "UK",
        code: "GB",
        timezone: "Europe/London",
      },
      officialSite: "http://example.com/drama-channel",
    },
  },
  {
    id: 3,
    name: "Sci-Fi Chronicles",
    summary: "An exploration of futuristic worlds and the impact of technology.",
    image: "http://example.com/image3.jpg",
    status: "Running",
    premiered: "2020-11-20",
    genres: ["Science Fiction", "Thriller"],
    rating: 8.8,
    ended: null,
    network: {
      id: 103,
      name: "Sci-Fi Network",
      country: {
        name: "Canada",
        code: "CA",
        timezone: "America/Toronto",
      },
      officialSite: "http://example.com/sci-fi-network",
    },
  },
];

const mockLinks = [
  { name: "Drama", count: 2 },
  { name: "Comedy", count: 1 },
  { name: "Crime", count: 2 },
];

describe("TV Show Component", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    // Create a fresh pinia instance for each test
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        data: {
          shows: mockShows,
          links: mockLinks,
          loading: false,
          error: null,
        },
      },
    });

    wrapper = shallowMount(App, {
      global: {
        plugins: [pinia],
        stubs: {
          MovieList: true,
          SearchBar: true,
          Sidebar: true,
          RatingSort: true,
          PaginationComponent: true,
          CardList: true,
        },
      },
    });

    store = useDataStore();
  });

  it("initializes with correct default values", () => {
    expect(wrapper.vm.selectedGenre).toEqual([]);
    expect(wrapper.vm.searchQuery).toBe("");
    expect(wrapper.vm.currentPage).toBe(1);
    expect(wrapper.vm.itemsPerPage).toBe(50);
    expect(wrapper.vm.sortOrder).toBe("asc");
  });

  it("fetches shows on mount", () => {
    expect(store.fetchShows).toHaveBeenCalled();
  });

  describe("Search functionality", () => {
    it("updates searchQuery when handleSearch is called", async () => {
      wrapper.vm.handleSearch("breaking");
      await nextTick();
      expect(wrapper.vm.searchQuery).toBe("breaking");
    });

    it("clears search query when handleClear is called", async () => {
      wrapper.vm.searchQuery = "test";
      wrapper.vm.handleClear();
      await nextTick();
      expect(wrapper.vm.searchQuery).toBe("");
    });
  });

  describe("Genre filtering", () => {
    it("updates selectedGenre when filterByGenre is called", async () => {
      wrapper.vm.filterByGenre(["Drama"]);
      await nextTick();
      expect(wrapper.vm.selectedGenre).toEqual(["Drama"]);
    });

    it("correctly filters movies by genre", () => {
      const dramaMovies = wrapper.vm.getMoviesByGenre("Drama");
      expect(dramaMovies).toHaveLength(2);
      expect(dramaMovies[0].name).toBe("Breaking Bad");
    });
  });

  describe("Sorting functionality", () => {
    it("updates sort order when setSortOrder is called", async () => {
      wrapper.vm.setSortOrder("desc");
      await nextTick();
      expect(wrapper.vm.sortOrder).toBe("desc");
    });

    it("correctly sorts movies by rating", async () => {
      wrapper.vm.setSortOrder("desc");
      await nextTick();
      const sortedMovies = wrapper.vm.filteredMovies;
      expect(sortedMovies[0].rating).toBeGreaterThanOrEqual(sortedMovies[1].rating);
    });
  });

  describe("Pagination", () => {
    it("calculates total pages correctly", () => {
      // With 3 mock shows and 50 items per page, should be 1 page
      expect(wrapper.vm.totalPages).toBe(1);
    });

    it("updates current page when handlePageChange is called", async () => {
      wrapper.vm.handlePageChange(2);
      await nextTick();
      expect(wrapper.vm.currentPage).toBe(2);
    });

    it("paginates movies correctly", async () => {
      expect(wrapper.vm.paginatedMovies.value).toHaveLength(3); // All movies since we have less than 50
    });
  });

  describe("Component rendering", () => {
    it("shows loading state when loading is true", async () => {
      store.loading = true;
      await nextTick();
      expect(wrapper.find(".loading-spinner").exists()).toBe(true);
    });

    it("shows error message when error exists", async () => {
      store.error = "Error loading shows";
      await nextTick();
      expect(wrapper.text()).toContain("Error loading shows");
    });

    it("renders MovieList when genres are selected", async () => {
      wrapper.vm.selectedGenre = ["Drama"];
      await nextTick();
      expect(wrapper.findComponent(MovieList).exists()).toBe(true);
    });

    it("renders CardList for each genre when no filters are applied", async () => {
      wrapper.vm.selectedGenre = [];
      wrapper.vm.searchQuery = "";
      await nextTick();
      const genreSections = wrapper.findAll(".genre-section");
      expect(genreSections).toHaveLength(mockLinks.length);
    });
  });
});

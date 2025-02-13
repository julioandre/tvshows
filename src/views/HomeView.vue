<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useDataStore } from "@/store/tvshowstore";
import { storeToRefs } from "pinia";
import MovieList from "../components/MovieList.vue";
import SearchBar from "../components/SearchBar.vue";
import Sidebar from "../components/SideBar.vue";
import RatingSort from "@/components/RatingSort.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import CardList from "@/components/CardList.vue";

const store = useDataStore();
const selectedGenre = ref<string[]>([]);
const searchQuery = ref("");
const currentPage = ref(1); // Track current page
const itemsPerPage = ref(50);
const handleSearch = (query: string) => {
  searchQuery.value = query;
};
const { shows, error, loading, links } = storeToRefs(store);
const sortOrder = ref<"asc" | "desc">("asc");

const handleClear = () => {
  searchQuery.value = "";
  // Handle clear event
};

const filterByGenre = (genres: string[]) => {
  selectedGenre.value = genres;
};
const setSortOrder = (order: "asc" | "desc") => {
  sortOrder.value = order; // Update the selected rating based on the dropdown selection
};
const getMoviesByGenre = (genre: string) => {
  return shows.value.filter((movie) => movie.genres.includes(genre)).slice(0, 20);
};
const filteredMovies = reactive(
  computed(() => {
    return shows.value
      .filter((movie) => {
        const matchesGenre =
          selectedGenre.value.length === 0
            ? shows.value
            : movie.genres.some((genre) => selectedGenre.value.includes(genre));
        const matchesSearch = movie.name.toLowerCase().includes(searchQuery.value.toLowerCase());
        return matchesGenre && matchesSearch;
      })
      .sort((a, b) => (sortOrder.value === "asc" ? a.rating - b.rating : b.rating - a.rating));
  })
);

const totalPages = computed(() => {
  return Math.ceil(filteredMovies.value.length / itemsPerPage.value) > 0
    ? Math.ceil(filteredMovies.value.length / itemsPerPage.value)
    : 1; // Calculate total pages based on filtered results
});

// Get movies for the current page
const paginatedMovies = ref(
  computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    if (filteredMovies.value.length < 50) {
      handlePageChange(1);
      return filteredMovies.value.slice(0, 50);
    }
    return filteredMovies.value.slice(start, end); // Return only the movies for the current page
  })
);
const handlePageChange = (pageNumber: number) => {
  currentPage.value = pageNumber;
};
onMounted(() => {
  store.fetchShows();
});
</script>

<template>
  <div class="app">
    <Sidebar
      :allGenres="links"
      @filter="filterByGenre"
      :selctedGenres="selectedGenre"
      :key="selectedGenre.length"
    />
    <div class="content">
      <SearchBar
        placeholder="Search Shows..."
        :minLength="0"
        :debounceTime="500"
        @search="handleSearch"
        @clear="handleClear"
      />
      <div v-if="loading" class="loading-spinner">Loading...</div>
      <div v-if="error">{{ error }}</div>
      <div v-if="!error || !loading">
        <!-- <h1>{{ selectedGenre ? selectedGenre : "Home" }}</h1> -->

        <div><RatingSort v-if="selectedGenre.length > 0" @update="setSortOrder" /></div>
        <div v-if="selectedGenre.length < 1 && searchQuery.length < 1">
          <div v-for="genre in links" :key="genre.name" class="genre-section">
            <h2>{{ genre.name }}</h2>
            <CardList
              :items="getMoviesByGenre(genre.name)"
              :genre="genre.name"
              @filter="filterByGenre"
            />
          </div>
        </div>

        <MovieList
          v-if="selectedGenre.length > 0 || searchQuery.length > 0"
          :items="paginatedMovies"
        />
        <PaginationComponent
          v-if="selectedGenre.length > 0"
          :currentPage="currentPage"
          :totalPages="totalPages"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

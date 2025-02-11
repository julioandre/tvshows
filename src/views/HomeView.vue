<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { getShows } from "@/utils/composables/getShows";
import MovieList from "../components/MovieList.vue";
import SearchBar from "../components/SearchBar.vue";
import Sidebar from "../components/SideBar.vue";
import RatingSort from "@/components/RatingSort.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";

const selectedGenre = ref<string[]>([]);
const searchQuery = ref("");
const currentPage = ref(1); // Track current page
const itemsPerPage = ref(50);
const handleSearch = (query: string) => {
  console.log("Searching for:", query);
  searchQuery.value = query;
  // Implement your search logic here
};
const { movies, error, loading, fetchShows } = getShows();
const sortOrder = ref<"asc" | "desc">("asc");

const handleClear = () => {
  console.log("Search cleared");
  searchQuery.value = "";
  // Handle clear event
};

const filterByGenre = (genres: string[]) => {
  console.log(genres);
  selectedGenre.value = genres;
};
const setSortOrder = (order: "asc" | "desc") => {
  sortOrder.value = order; // Update the selected rating based on the dropdown selection
};
console.log(movies.value);
const filteredMovies = reactive(
  computed(() => {
    console.log(searchQuery.value.length);
    return movies.value
      .filter((movie) => {
        const matchesGenre =
          selectedGenre.value.length === 0
            ? movies.value
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
    console.log(filteredMovies.value.slice(start, end));
    return filteredMovies.value.slice(start, end); // Return only the movies for the current page
  })
);
const handlePageChange = (pageNumber: number) => {
  currentPage.value = pageNumber;
};
onMounted(() => {
  fetchShows();
});
</script>

<template>
  <div class="app">
    <Sidebar @filter="filterByGenre" />
    <div class="content">
      <SearchBar
        placeholder="Search products..."
        :minLength="0"
        :debounceTime="500"
        @search="handleSearch"
        @clear="handleClear"
      />
      <div>
        <!-- <h1>{{ selectedGenre ? selectedGenre : "Home" }}</h1> -->
        <div v-if="loading">Loading movies...</div>
        <div v-if="error">{{ error }}</div>
        <div><RatingSort @update="setSortOrder" /></div>
        <MovieList :items="paginatedMovies" />
        <PaginationComponent
          :currentPage="currentPage"
          :totalPages="totalPages"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { getShows } from "@/utils/composables/getShows";
import MovieList from "../components/MovieList.vue";
import SearchBar from "../components/SearchBar.vue";
import Sidebar from "../components/SideBar.vue";
import RatingSort from "@/components/RatingSort.vue";

const selectedGenre = ref<string | null>();
const searchQuery = ref("");
const handleSearch = (query: string) => {
  console.log("Searching for:", query);
  searchQuery.value = query;
  // Implement your search logic here
};
const { movies, error, loading, fetchShows } = getShows();
const sortOrder = ref<"asc" | "desc">("asc");

const handleClear = () => {
  console.log("Search cleared");
  // Handle clear event
};

const filterByGenre = (genre: string) => {
  selectedGenre.value = genre === "Home" ? null : genre;
};
const setSortOrder = (order: "asc" | "desc") => {
  sortOrder.value = order; // Update the selected rating based on the dropdown selection
};
console.log(movies.value);
const filteredMovies = computed(() => {
  return movies.value
    .filter(
      (movie) =>
        (selectedGenre.value ? movie.genres.includes(selectedGenre.value) : movies.value) &&
        movie.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .sort((a, b) => (sortOrder.value === "asc" ? a.rating - b.rating : b.rating - a.rating));
});
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
        <h1>{{ selectedGenre ? selectedGenre : "Home" }}</h1>
        <div v-if="loading">Loading movies...</div>
        <div v-if="error">{{ error }}</div>
        <div><RatingSort @update="setSortOrder" /></div>
        <MovieList :items="filteredMovies" />
      </div>
    </div>
  </div>
</template>

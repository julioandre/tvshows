<script setup lang="ts">
import { ref } from "vue";
import MovieList from "./components/MovieList.vue";
import SearchBar from "./components/SearchBar.vue";
import Sidebar from "./components/Sidebar.vue";

const handleSearch = (query: string) => {
  console.log("Searching for:", query);
  // Implement your search logic here
};

const handleClear = () => {
  console.log("Search cleared");
  // Handle clear event
};
const items = ref([
  {
    id: 1,
    name: "The Shawshank Redemption",
    summary:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    image: "https://via.placeholder.com/150", // Sample image URL
    status: "Released",
    premiered: "1994-09-23",
    genres: ["Drama"],
    rating: 9.3,
  },
  {
    id: 2,
    name: "The Godfather",
    summary:
      "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
    image: "https://via.placeholder.com/150",
    status: "Released",
    premiered: "1972-03-24",
    genres: ["Crime", "Drama"],
    rating: 9.2,
  },
  {
    id: 3,
    name: "The Dark Knight",
    summary:
      "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
    image: "https://via.placeholder.com/150",
    status: "Released",
    premiered: "2008-07-18",
    genres: ["Action", "Crime", "Drama"],
    rating: 9.0,
  },
]);
</script>

<template>
  <div class="app">
    <Sidebar />
    <div class="content">
      <SearchBar
        placeholder="Search products..."
        :minLength="3"
        :debounceTime="500"
        @search="handleSearch"
        @clear="handleClear"
      />
      <div>
        <h1>Movie List</h1>
        <MovieList :items="items" />
      </div>
    </div>
  </div>
</template>

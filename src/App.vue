<script setup lang="ts">
import { computed, ref } from "vue";
import MovieList from "./components/MovieList.vue";
import SearchBar from "./components/SearchBar.vue";
import Sidebar from "./components/Sidebar.vue";

const selectedGenre = ref<string | null>(null);
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
    rating: 7.3,
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
  {
    id: 5,
    name: "Forrest Gump",
    summary:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal, and other historical events unfold through the life story of Forrest Gump, a slow-witted but kind-hearted man from Alabama.",
    image: "https://via.placeholder.com/50",
    status: "Released",
    premiered: "1994-07-06",
    genres: ["Drama", "Romance"],
    rating: 8.8,
  },
  {
    id: 6,
    name: "Inception",
    summary:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    image: "https://via.placeholder.com/50",
    status: "Released",
    premiered: "2010-07-16",
    genres: ["Action", "Adventure", "Sci-Fi"],
    rating: 8.8,
  },
  {
    id: 7,
    name: "The Matrix",
    summary:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    image: "https://via.placeholder.com/50",
    status: "Released",
    premiered: "1999-03-31",
    genres: ["Action", "Sci-Fi"],
    rating: 8.7,
  },
]);
const filterByGenre = (genre: string) => {
  selectedGenre.value = genre === "0" ? null : genre; // Set selected genre; "0" represents "All"
};
const filteredMovies = computed(() => {
  return selectedGenre.value
    ? items.value.filter((movie) => movie.genres.includes(selectedGenre.value!))
    : items.value; // Return all movies if no genre is selected
});
</script>

<template>
  <div class="app">
    <Sidebar @filter="filterByGenre" />
    <div class="content">
      <SearchBar
        placeholder="Search products..."
        :minLength="3"
        :debounceTime="500"
        @search="handleSearch"
        @clear="handleClear"
      />
      <div>
        <MovieList :items="filteredMovies" />
      </div>
    </div>
  </div>
</template>

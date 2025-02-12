<template>
  <div class="movie-detail-page">
    <div class="header" :style="{ backgroundImage: `url(${movie.image})` }">
      <div class="gradient-overlay"></div>
    </div>
    <div class="details">
      <h1>{{ movie.name }}</h1>
      <h3>Summary:</h3>
      <p>{{ movie.summary }}</p>
      <p><strong>Status:</strong> {{ movie.status }}</p>
      <p><strong>Premiered:</strong> {{ movie.premiered }}</p>
      <p v-if="movie.ended != null"><strong>Ended:</strong> {{ movie.ended }}</p>
      <p><strong>Genres:</strong> {{ movie.genres.join(", ") }}</p>
      <p><strong>Rating:</strong> {{ movie.rating }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { MovieItem } from "@/types/movieItem";
import { defineProps } from "vue";

// Define the MovieItem interface

// Props for receiving movie data
defineProps<{
  movie: MovieItem;
}>();
</script>
<style scoped>
.movie-detail-page {
  font-family: Arial, sans-serif;
  max-width: 65%;
  margin: auto;
}

.header {
  height: 55vh; /* Set to cover the top third of the page */
  background-size: 100% 100%; /* Allow the background image to cover the area */ /* Center the background image */
  display: flex; /* Center content */
  justify-content: center; /* Center title horizontally */
  align-items: center; /* Center title vertically */
  color: white; /* Text color for title */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8); /* Slight shadow for better readability */
}
.gradient-overlay {
  position: absolute;
  top: 5;
  left: 0;
  width: 100%;
  height: 55vh;

  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.7) 100%
  ); /* Gradient from transparent to dark */
  /* Place the gradient overlay above the background image */
}

.movie-title {
  font-size: 2rem; /* Size for the movie title */
  margin: 0; /* Remove default margin */
}

.details {
  padding: 20px; /* Padding for the details section */
}
</style>

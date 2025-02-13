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

defineProps<{
  movie: MovieItem;
}>();
</script>

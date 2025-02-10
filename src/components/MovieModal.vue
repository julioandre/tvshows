<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <h2>{{ movie.name }}</h2>
      <img v-if="movie.image" :src="movie.image" alt="Movie Image" class="movie-image" />
      <p><strong>Status:</strong> {{ movie.status }}</p>
      <p><strong>Premiered:</strong> {{ movie.premiered }}</p>
      <p><strong>Genres:</strong> {{ movie.genres.join(", ") }}</p>
      <p><strong>Rating:</strong> {{ movie.rating }}</p>
      <p>{{ movie.summary }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MovieItem } from "@/types/movieItem";
import { defineProps } from "vue";

defineProps<{
  isVisible: boolean;
  movie: MovieItem;
}>();

defineEmits<{
  (e: "close"): void;
}>();
</script>

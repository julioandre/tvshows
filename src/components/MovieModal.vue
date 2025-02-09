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
import type { MovieItem } from "@/utils/types/movieItem";
import { defineProps } from "vue";

defineProps<{
  isVisible: boolean;
  movie: MovieItem;
}>();

defineEmits<{
  (e: "close"): void;
}>();
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -3px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: transform 0.3s ease;
}

.modal-content {
  padding: 20px;
}

.close {
  cursor: pointer;
  font-size: 24px;
  float: right;
}

.movie-image {
  max-width: 100%;
  border-radius: 5px;
}
</style>

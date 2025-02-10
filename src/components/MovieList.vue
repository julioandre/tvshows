<template>
  <div class="movie-list">
    <div class="movie-item" v-for="item in props.items" :key="item.id" @click="openModal(item)">
      <img v-if="item.image" :src="item.image" :alt="item.name" class="movie-thumbnail" />
      <div class="movie-info">
        <h4 class="movie-title">{{ item.name }}</h4>
        <p class="movie-description">{{ getTruncatedSummary(item.summary) }}</p>
        <span class="movie-rating">{{ item.rating }}</span>
      </div>
    </div>
    <MovieModal :isVisible="isModalVisible" :movie="selectedMovie!" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import type { MovieItem } from "@/types/movieItem";
import { ref } from "vue";
import MovieModal from "./MovieModal.vue";

// Function to filter movies based on selected rating

const props = defineProps<{
  items: MovieItem[];
}>();
const isModalVisible = ref(false);
const selectedMovie = ref<MovieItem>();

// Function to open modal with the selected movie
const openModal = (movie: MovieItem) => {
  console.log(movie.name);
  selectedMovie.value = movie;
  isModalVisible.value = true;
};
const getTruncatedSummary = (summary: string): string => {
  if (summary.length <= 200) {
    return summary; // Return full summary if it's 300 characters or less
  }
  return summary.substring(0, 200) + "...";
};

// Function to close the modal
const closeModal = () => {
  selectedMovie.value = undefined;
  isModalVisible.value = false;
};
</script>

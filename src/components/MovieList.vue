<template>
  <div class="movie-list">
    <div class="movie-item" v-for="item in items" :key="item.id" @click="openModal(item)">
      <img v-if="item.image" :src="item.image" :alt="item.name" class="movie-thumbnail" />
      <div class="movie-info">
        <h4 class="movie-title">{{ item.name }}</h4>
        <p class="movie-description">{{ item.summary }}</p>
        <span class="movie-rating">{{ item.rating }}</span>
      </div>
    </div>
    <MovieModal :isVisible="isModalVisible" :movie="selectedMovie!" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import type { MovieItem } from "@/utils/types/movieItem";
import { ref } from "vue";
import MovieModal from "./MovieModal.vue";

defineProps<{
  items: MovieItem[];
}>();
const isModalVisible = ref(false);
const selectedMovie = ref<MovieItem | null>(null);

// Function to open modal with the selected movie
const openModal = (movie: MovieItem) => {
  console.log(movie.name);
  selectedMovie.value = movie;
  isModalVisible.value = true;
};

// Function to close the modal
const closeModal = () => {
  selectedMovie.value = null;
  isModalVisible.value = false;
};
</script>

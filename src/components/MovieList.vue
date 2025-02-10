<template>
  <div class="dropdown-wrapper"><RatingFilter @update="setRating" /></div>
  <div class="movie-list">
    <div class="movie-item" v-for="item in filteredMovies" :key="item.id" @click="openModal(item)">
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
import { computed, ref } from "vue";
import MovieModal from "./MovieModal.vue";
import RatingFilter from "./RatingFilter.vue";
const selectedRating = ref(0);

// Function to filter movies based on selected rating

const props = defineProps<{
  items: MovieItem[];
}>();
const isModalVisible = ref(false);
const selectedMovie = ref<MovieItem>();

const filteredMovies = computed(() => {
  return props.items.filter((movie) => movie.rating >= selectedRating.value);
});

// Function to open modal with the selected movie
const openModal = (movie: MovieItem) => {
  console.log(movie.name);
  selectedMovie.value = movie;
  isModalVisible.value = true;
};
const setRating = (rating: number) => {
  selectedRating.value = rating; // Update the selected rating based on the dropdown selection
};

// Function to close the modal
const closeModal = () => {
  selectedMovie.value = undefined;
  isModalVisible.value = false;
};
</script>

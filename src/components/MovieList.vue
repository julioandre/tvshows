<template>
  <div class="movie-list">
    <div class="movie-item" v-for="item in props.items" :key="item.id" @click="openPage(item)">
      <ImageCard :image="item.image" :name="item.name" :rating="item.rating" />
    </div>
    <MovieModal :isVisible="isModalVisible" :movie="selectedMovie!" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import type { MovieItem } from "@/types/movieItem";
import { ref } from "vue";
import MovieModal from "./MovieModal.vue";
import ImageCard from "./ImageCard.vue";

// Function to filter movies based on selected rating

const props = defineProps<{
  items: MovieItem[];
}>();
const isModalVisible = ref(false);
const selectedMovie = ref<MovieItem>();
console.log(props.items);

// Function to open modal with the selected movie
const openPage = (movie: MovieItem) => {
  console.log(movie.name);
};
// Function to close the modal
const closeModal = () => {
  selectedMovie.value = undefined;
  isModalVisible.value = false;
};
</script>

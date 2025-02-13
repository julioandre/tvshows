<template>
  <div class="movie-list">
    <div v-if="props.items.length < 1"><h1>:( No Results to Display</h1></div>
    <div class="movie-item" v-for="item in props.items" :key="item.id" @click="openPage(item)">
      <ImageCard :image="item.image" :name="item.name" :rating="item.rating" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MovieItem } from "@/types/movieItem";
import ImageCard from "./ImageCard.vue";
import { useRouter } from "vue-router";
const router = useRouter();

// Function to filter movies based on selected rating

const props = defineProps<{
  items: MovieItem[];
}>();

// Function to open modal with the selected movie
const openPage = (movie: MovieItem) => {
  const showString = encodeURIComponent(JSON.stringify(movie));
  router.push({
    name: "about",
    params: { show: showString },
  });
};
</script>

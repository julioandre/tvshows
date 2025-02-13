<template>
  <div class="card-list-container">
    <button class="view-all-button" @click="updateSelectedGenres">All {{ genre }}</button>
    <button class="scroll-button left" @click="scrollLeft">❮</button>
    <div class="card-list" ref="cardList">
      <div class="card-item" v-for="item in items" :key="item.id" @click="openPage(item)">
        <ImageCard :image="item.image" :name="item.name" />
      </div>
    </div>
    <button class="scroll-button right" @click="scrollRight">❯</button>
  </div>
</template>

<script setup lang="ts">
import type { MovieItem } from "@/types/movieItem";
import { defineProps, ref } from "vue";
import ImageCard from "./ImageCard.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
  items: MovieItem[];
  genre: string;
}>();
const emit = defineEmits<{
  (e: "filter", genre: string[]): void;
}>();

const cardList = ref<HTMLElement | null>(null);

// Scroll left function
const scrollLeft = () => {
  if (cardList.value) {
    cardList.value.scrollBy({
      left: -200, // Number of pixels to scroll left
      behavior: "smooth", // Smooth scrolling
    });
  }
};

// Scroll right function
const scrollRight = () => {
  if (cardList.value) {
    cardList.value.scrollBy({
      left: 200, // Number of pixels to scroll right
      behavior: "smooth", // Smooth scrolling
    });
  }
};
const updateSelectedGenres = () => {
  emit("filter", [props.genre]); // Emit the selected genre
};
const openPage = (movie: MovieItem) => {
  const showString = encodeURIComponent(JSON.stringify(movie));
  router.push({
    name: "about",
    params: { show: showString },
  });
};
</script>

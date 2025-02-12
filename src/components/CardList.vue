<template>
  <div class="card-list-container">
    <button class="view-all-button" @click="updateSelectedGenres">View All{{ genre }}</button>
    <button class="scroll-button left" @click="scrollLeft">❮</button>

    <div class="card-list" ref="cardList">
      <div class="card-item" v-for="item in items" :key="item.id">
        <img :src="item.image" alt="Card Image" class="card-image" />
        <div class="card-details">
          <h4 class="card-title">{{ item.name }}</h4>
          <p class="card-summary">{{ item.summary }}</p>
        </div>
      </div>
    </div>

    <button class="scroll-button right" @click="scrollRight">❯</button>
  </div>
</template>

<script setup lang="ts">
import type { MovieItem } from "@/types/movieItem";
import { defineProps, ref } from "vue";

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
</script>

<style scoped>
.card-list-container {
  position: relative; /* Necessary for absolute positioning of buttons */
  overflow: hidden; /* Hide overflow if needed */
}

.card-list {
  display: flex; /* Align items in a row */
  overflow-x: auto; /* Enable horizontal scrolling */
  padding: 10px; /* Padding for the card list */
  scroll-behavior: smooth; /* Smooth scrolling behavior */
}

.card-item {
  display: inline-block; /* Keeps items in a row */
  background: #ffffff; /* Card background */
  border-radius: 8px; /* Rounded corners */
  padding: 10px; /* Padding inside the card */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Shadow for 3D effect */
  width: 200px; /* Fixed width for each card */
}

.scroll-button {
  position: absolute; /* Absolute positioning to overlap the card list */
  top: 50%; /* Center vertically */
  transform: translateY(-50%); /* Adjust to center */
  background: #007bff; /* Blue background for the buttons */
  color: white; /* White text color */
  border: none; /* No border */
  border-radius: 4px; /* Rounded corners */
  padding: 10px; /* Padding for buttons */
  cursor: pointer; /* Pointer cursor */
  z-index: 10; /* Ensure it appears above other elements */
}

.scroll-button.left {
  left: 10px; /* Positioning for the left button */
}

.scroll-button.right {
  right: 10px; /* Positioning for the right button */
}

.scroll-button:hover {
  background: #0056b3; /* Darker background on hover */
}
.view-all-button {
  position: absolute; /* Fixed positioning for the button */
  top: 10px; /* Space from the top */
  right: 10px; /* Space from the right */
  padding: 8px 16px; /* Button padding */
  background-color: #007bff; /* Button color */
  color: white; /* Text color */
  border: none; /* No border */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor */
  z-index: 10; /* Ensure it is on top */
}
</style>

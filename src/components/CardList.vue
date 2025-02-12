<template>
  <div class="card-list-container">
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
import { defineProps, ref } from "vue";

export interface CardItem {
  id: number;
  name: string;
  summary: string;
  image: string;
}

defineProps<{
  items: CardItem[];
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
</script>

<style scoped>
.card-list-container {
  display: flex; /* Use flexbox to arrange scrolling buttons and card list */
  align-items: center; /* Center items vertically */
}

.card-list {
  display: flex; /* Arrange cards in a row */
  overflow-x: auto; /* Allow horizontal scrolling */
  overflow-y: hidden; /* Hide vertical scrollbar */
  scroll-behavior: smooth; /* Enable smooth scrolling */
  gap: 10px; /* Space between cards */
  padding: 10px; /* Optional padding */
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
  background: #007bff; /* Blue background for the buttons */
  color: white; /* White text color */
  border: none; /* No border */
  border-radius: 4px; /* Rounded corners */
  padding: 10px; /* Padding for buttons */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background 0.3s; /* Transition for background */
}

.scroll-button:hover {
  background: #0056b3; /* Darker blue on hover */
}
</style>

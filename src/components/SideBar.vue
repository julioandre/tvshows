<template>
  <aside class="sidebar" :class="{ collapsed: !isExpanded }">
    <div class="sidebar-header">
      <h2 class="sidebar-title">Movie Juke</h2>
      <button v-if="isMobile" class="toggle-button" @click="toggleSidebar">
        <span class="toggle-icon">☰</span>
      </button>
    </div>
    <h3>Genres</h3>
    <ul>
      <li v-for="genre in links" :key="genre.name" class="sidebar-links">
        <label>
          <input
            class="sidebar-link"
            type="checkbox"
            :value="genre.name"
            v-model="selectedGenres"
          />
          {{ genre.name }}
        </label>
      </li>
    </ul>
    <button @click="updateSelectedGenres">Apply Filters</button>
  </aside>
  <div class="sidebar-overlay" v-if="isExpanded" @click="toggleSidebar"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useBreakpoint } from "../composables/useBreakpoints";

const selectedGenres = ref<string[]>([]);

const emit = defineEmits<{
  (e: "filter", genre: string[]): void;
}>();

const updateSelectedGenres = () => {
  if (isMobile) {
    isExpanded.value = false;
  }
  emit("filter", selectedGenres.value); // Emit the selected genre
};

const { isMobile } = useBreakpoint();

interface Link {
  name: string;
  path: string;
  icon: string;
}

// Sample sidebar links
const links: Link[] = [
  { name: "Action", icon: "🏃‍♂️", path: "/about" },
  { name: "Thriller", icon: "😱", path: "/thriller" },
  { name: "Comedy", icon: "😂", path: "/comedy" },
  { name: "Sports", icon: "⚽", path: "/sports" },
  { name: "Science-Fiction", icon: "👽", path: "/sci-fi" },
  { name: "Drama", icon: "🎭", path: "/drama" },
  { name: "Romance", icon: "🌹", path: "/romance" },
  { name: "Horror", icon: "👻", path: "/horror" },
  { name: "War", icon: "🪖", path: "/war" },
  { name: "Adventure", icon: "🗺️", path: "/adventure" },
  { name: "Family", icon: "👨‍👩‍👧‍👦", path: "/family" },
  { name: "Fantasy", icon: "🏰", path: "/fantasy" },
];

const isExpanded = isMobile ? ref<boolean>(false) : ref<boolean>(true);

const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

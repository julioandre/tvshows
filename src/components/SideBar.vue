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
      <li v-for="genre in allGenres" :key="genre.name" class="sidebar-links">
        <input class="sidebar-link" type="checkbox" :value="genre.name" v-model="selectedGenre" />
        <label>
          {{ genre.name }}
        </label>
      </li>
    </ul>
    <button class="sidebar-button" @click="updateSelectedGenres">Apply Filters</button>
  </aside>
  <div class="sidebar-overlay" v-if="isExpanded" @click="toggleSidebar"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useBreakpoint } from "../composables/useBreakpoints";
import type { Link } from "@/types/links";

const selectedGenre = ref<string[]>([]);
const props = defineProps<{
  allGenres: Link[];
  selctedGenres: string[];
}>();
const emit = defineEmits<{
  (e: "filter", genre: string[]): void;
}>();

const updateSelectedGenres = () => {
  if (isMobile) {
    isExpanded.value = false;
  }
  emit("filter", selectedGenre.value); // Emit the selected genre
};

const { isMobile } = useBreakpoint();

// Sample sidebar links

const isExpanded = isMobile ? ref<boolean>(false) : ref<boolean>(true);

const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value;
};
onMounted(() => {
  selectedGenre.value = props.selctedGenres;
  console.log(selectedGenre.value);
});
</script>

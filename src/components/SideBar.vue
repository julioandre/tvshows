<template>
  <aside class="sidebar" :class="{ collapsed: !isExpanded }">
    <div class="sidebar-header">
      <h2 class="sidebar-title">Movie Juke</h2>
      <button v-if="isMobile" class="toggle-button" @click="toggleSidebar">
        <span class="toggle-icon">{{ isExpanded ? "➖" : "➕" }}</span>
      </button>
    </div>
    <nav class="sidebar-links">
      <router-link
        v-for="link in links"
        :key="link.name"
        :to="link.path"
        class="sidebar-link"
        :class="{ active: currentLink === link.name }"
        @click="selectGenre(link.name)"
      >
        {{ link.icon }} {{ link.name }}
      </router-link>
    </nav>
  </aside>
  <div class="sidebar-overlay" v-if="isExpanded" @click="toggleSidebar"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useBreakpoint } from "../composables/useBreakpoints";

const emit = defineEmits<{
  (e: "filter", genre: string): void;
}>();
const selectGenre = (genre: string) => {
  setCurrentLink(genre);
  emit("filter", genre); // Emit the selected genre
};
const { isMobile } = useBreakpoint();
interface Link {
  name: string;
  path: string;
  icon: string;
}

// Sample sidebar links
const links: Link[] = [
  { name: "Home", icon: "🏠", path: "/" },
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

const isExpanded = isMobile ? ref(false) : ref(true);
const currentLink = ref<string>(links[0].name);

const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value;
};

const setCurrentLink = (name: string) => {
  currentLink.value = name;
  // Close sidebar when a link is clicked (optional)
  if (window.innerWidth < 769) {
    isExpanded.value = false;
  }
};
// const getIcon = (genre: string) => {
//   // Return an icon based on genre (you can customize this)
//   switch (genre) {
//     case "Action":
//       return "🏃‍♂️"; // Example emoji for Action
//     case "Drama":
//       return "🎭"; // Example emoji for Drama
//     case "Comedy":
//       return "😂"; // Example emoji for Comedy
//     case "Crime":
//       return "🚓"; // Example emoji for Crime
//     case "Horror":
//       return "👻";
//     case "Family":
//       return "👨‍👩‍👧‍👦";
//     case "Science-Fiction":
//       return "👽";
//     case "Western":
//       return "🤠";
//     case "Sports":
//       return "⚽";
//     case "Music":
//       return "♫";
//     case "History":
//       return "🏛️";
//     case "Adventure":
//       return "🗺️";
//     case "War":
//       return "🪖";
//     case "Fantasy":
//       return "🏰";
//     case "Romance":
//       return "🌹";
//     case "Mystery":
//       return "🕵️‍♂️";
//     case "Thriller":
//       return "😱";

//     // Add more genres and icons as needed
//     default:
//       return "🎬"; // Default icon for unknown genres
//   }
// };

// Sync the current link with Vue Router
const route = useRoute();
currentLink.value = route.name as string;
</script>

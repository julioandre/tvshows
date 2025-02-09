<template>
  <aside class="sidebar" :class="{ collapsed: !!isExpanded }">
    <div class="sidebar-header">
      <h2 class="sidebar-title">My Sidebar</h2>
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
        @click="setCurrentLink(link.name)"
      >
        {{ link.name }}
      </router-link>
    </nav>
  </aside>
  <div class="sidebar-overlay" v-if="isExpanded" @click="toggleSidebar"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useBreakpoint } from "../composables/useBreakpoints";

const { isMobile } = useBreakpoint();
interface Link {
  name: string;
  path: string;
}

// Sample sidebar links
const links: Link[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

const isExpanded = ref(true);
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

// Sync the current link with Vue Router
const route = useRoute();
currentLink.value = route.name as string;
</script>

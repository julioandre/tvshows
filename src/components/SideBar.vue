<template>
  <aside class="sidebar" :class="{ expanded: isExpanded }">
    <div class="sidebar-header">
      <h2 class="sidebar-title">My Sidebar</h2>
      <button class="toggle-button" @click="toggleSidebar">
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

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px; /* Expanded width */
  background: #f8f9fa;
  border-right: 1px solid #dee2e6;
  transition: transform 0.3s ease;
  transform: translateX(-80%); /* Collapsed style */
  z-index: 1000;
}

.sidebar.expanded {
  transform: translateX(0); /* Show the sidebar */
}

.sidebar-header {
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar-title {
  margin: 0;
  font-size: 20px;
}

.toggle-button {
  background: none;
  border: none;
  cursor: pointer;
}

.sidebar-links {
  padding: 0;
  list-style: none;
}

.sidebar-link {
  display: block;
  padding: 12px;
  color: #333;
  text-decoration: none;
}

.sidebar-link:hover,
.sidebar-link.active {
  background: #e9ecef; /* Highlight for active/hover state */
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* Mobile styles */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-80%); /* Initially hide */
  }
  .sidebar.expanded {
    transform: translateX(0); /* Show when expanded */
  }
}
</style>

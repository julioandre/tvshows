<script setup lang="ts">
import { ref } from "vue";
import SearchBar from "./components/SearchBar.vue";
import Sidebar from "./components/Sidebar.vue";

import type { MenuItem } from "./utils/types/sidebar";

const sidebarExpanded = ref(true);

const menuItems: MenuItem[] = [
  {
    id: 1,
    label: "Dashboard",
    icon: "📊",
    route: "/",
  },
  {
    id: 2,
    label: "Users",
    icon: "👥",
    children: [
      {
        id: 21,
        label: "User List",
        route: "/users",
      },
      {
        id: 22,
        label: "Add User",
        route: "/users/add",
      },
    ],
  },
  {
    id: 3,
    label: "Settings",
    icon: "⚙️",
    route: "/settings",
  },
];
const handleSearch = (query: string) => {
  console.log("Searching for:", query);
  // Implement your search logic here
};

const handleClear = () => {
  console.log("Search cleared");
  // Handle clear event
};
</script>

<template>
  <div class="app">
    <Sidebar />
  </div>
</template>

<script setup lang="ts">
import SearchBar from "./components/SearchBar.vue";
import Sidebar from "./components/Sidebar.vue";

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
    <div class="content">
      <SearchBar
        placeholder="Search products..."
        :minLength="3"
        :debounceTime="500"
        @search="handleSearch"
        @clear="handleClear"
      />
      <div>
        <h1>Testing</h1>
      </div>
    </div>
  </div>
</template>

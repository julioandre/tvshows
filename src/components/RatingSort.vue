<template>
  <div class="rating-filter">
    <label for="rating-filter" class="filter-label">Filte by Rating:</label>
    <select
      id="rating-filter"
      v-model="selectedRating"
      @change="emitSortingChange"
      class="filter-select"
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Define emits for communication with parent component
const emit = defineEmits<{
  (e: "update", value: 'asc'|'desc'): void;
}>();

const selectedRating = ref<'asc'|'desc'>('asc');

// Emit the selected rating when it changes
const emitSortingChange = () => {
  console.log("I am here");
  emit("update", selectedRating.value);
};
</script>

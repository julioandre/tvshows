<template>
  <div class="rating-filter">
    <label for="rating-filter" class="filter-label">Filter by Rating:</label>
    <select
      id="rating-filter"
      v-model="selectedRating"
      @change="emitRatingChange"
      class="filter-select"
    >
      <option value="0">All</option>
      <option value="7">7 and above</option>
      <option value="8">8 and above</option>
      <option value="9">9 and above</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Define emits for communication with parent component
const emit = defineEmits<{
  (e: "update", value: number): void;
}>();

const selectedRating = ref(0);

// Emit the selected rating when it changes
const emitRatingChange = () => {
  emit("update", Number(selectedRating.value));
};
</script>

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

<style scoped>
.rating-filter {
  display: flex;
  align-items: center; /* Align items in the center vertically */
  justify-content: flex-start; /* Align items to the left */
  flex-wrap: wrap; /* Allows wrapping in smaller screens */
  margin-bottom: 1rem; /* Space below the filter */
}

.filter-label {
  margin-right: 10px; /* Space between label and select */
  font-size: 1rem; /* Font size for the label */
}

.filter-select {
  display: block;
  padding: 5px; /* Inner padding for the select box */
  font-size: 1rem; /* Ensuring readable font size */
  border: 1px solid #ccc; /* Border for the select element */
  border-radius: 4px; /* Rounded corners */
  max-width: 200px; /* Optional: limit width */
}

/* Optional: Adjust appearance in mobile layout */
@media (max-width: 600px) {
  .rating-filter {
    flex-direction: column; /* Stack label above select on small screens */
    align-items: flex-start; /* Align items to the start */
  }

  .filter-label {
    margin-bottom: 5px; /* Space below label when stacked */
  }

  .filter-select {
    display: block;
    position: relative;
    width: 100%; /* Make select take full width on small screens */
  }
}
</style>

<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Prev</button>

    <span>Page {{ currentPage }} of {{ totalPages }}</span>

    <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}>();

const prevPage = () => {
  if (props.currentPage > 1) {
    emit("pageChange", props.currentPage - 1);
  }
};
const emit = defineEmits<{
  (e: "pageChange", value: number): void;
}>();

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit("pageChange", props.currentPage + 1);
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center; /* Center align the pagination controls */
  position: fixed; /* Fix the position */
  bottom: 0; /* Align to the bottom */
  left: 0; /* Align to the left */
  right: 0; /* Align to the right */
  padding: 10px; /* Inner padding */
  z-index: 900; /* Ensure it’s above other elements */
}

.pagination button {
  padding: 8px 12px; /* Inner padding for buttons */
  margin: 0 5px; /* Space between buttons */
  border: 1px solid #007bff; /* Border color */
  border-radius: 4px; /* Rounded corners */
  background-color: #007bff; /* Button background color */
  color: white; /* Button text color */
  cursor: pointer; /* Pointer cursor for buttons */
}

.pagination button:disabled {
  background-color: #ddd; /* Disabled button background */
  cursor: not-allowed; /* Change cursor for disabled */
}
</style>

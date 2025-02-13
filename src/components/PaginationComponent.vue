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

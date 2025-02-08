<template>
  <button @click="$emit('clear')" class="clear-button" type="button" aria-label="Clear search">
    ×
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  (e: "clear"): void;
}>();
</script>

<style scoped>
.clear-button {
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  font-size: 20px;
  color: #666;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clear-button:hover {
  color: #333;
}
</style>

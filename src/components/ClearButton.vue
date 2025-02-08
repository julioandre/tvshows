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

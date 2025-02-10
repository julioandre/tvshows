<template>
  <p class="error-message">{{ message }}</p>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

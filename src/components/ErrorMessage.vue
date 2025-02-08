<template>
  <p v-if="message" class="error-message">{{ message }}</p>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

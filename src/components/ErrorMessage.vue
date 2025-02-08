<template>
  <p v-if="message" class="error-message">{{ message }}</p>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<style scoped>
.error-message {
  color: #dc3545;
  font-size: 14px;
  margin-top: 4px;
  margin-bottom: 0;
}
</style>

<template>
  <img :src="image" :alt="name" class="movie-thumbnail" />
  <div class="card-details">
    <p class="card-title">
      <strong>{{ name }}</strong>
    </p>
    <strong v-if="rating" class="card-title-rating">{{ rating }}</strong>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  image?: string;
  name: string;
  rating?: number;
}>();
</script>

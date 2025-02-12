<template>
  <img :src="image" :alt="name" class="movie-thumbnail" />
  <div class="card-details">
    <p>
      <strong class="card-title">{{ name }}</strong>
    </p>
    <p>
      <strong v-if="rating" class="card-title">{{ rating }}</strong>
    </p>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  image?: string;
  name: string;
  rating?: number;
}>();
</script>

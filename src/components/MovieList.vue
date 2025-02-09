<template>
  <div class="item-list">
    <div class="item" v-for="item in items" :key="item.id">
      <img v-if="item.image" :src="item.image" :alt="item.name" class="item-image" />
      <div class="item-info">
        <h4 class="item-title">{{ item.name }}</h4>
        <p class="item-description">{{ item.summary }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MovieItem } from "@/utils/types/movieItem";

defineProps<{
  items: MovieItem[];
}>();
</script>

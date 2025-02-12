<template>
  <div class="app"><ShowDetail :movie="shows[15]" /></div>
</template>
<script setup lang="ts">
import { useDataStore } from "@/store/tvshowstore";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import ShowDetail from "@/components/ShowDetail.vue";

const store = useDataStore();
const { shows } = storeToRefs(store);
console.log(shows.value[0]);

onMounted(() => {
  store.fetchShows();
  console.log(shows);
});
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

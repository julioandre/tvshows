<template>
  <div class="app"><ShowDetail v-if="show != undefined" :movie="decodedElement!" /></div>
</template>
<script setup lang="ts">
import ShowDetail from "@/components/ShowDetail.vue";
import { computed, onMounted, ref } from "vue";

const decodedElement = ref(
  computed(() => {
    return JSON.parse(decodeURIComponent(props.show));
  })
);
const props = defineProps<{
  show: string;
}>();

onMounted(() => {
  console.log(decodedElement.value);
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

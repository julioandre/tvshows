<template>
  <div class="app"><ShowDetail v-if="show != undefined" :movie="decodedElement!" /></div>
</template>
<script setup lang="ts">
import ShowDetail from "@/components/ShowDetail.vue";
import { computed, ref } from "vue";

const decodedElement = ref(
  computed(() => {
    return JSON.parse(decodeURIComponent(props.show));
  })
);
const props = defineProps<{
  show: string;
}>();
</script>

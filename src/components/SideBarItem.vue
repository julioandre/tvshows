<template>
  <div class="sidebar-item" :class="{ 'has-children': item.children }">
    <router-link
      v-if="item.route"
      :to="item.route"
      class="sidebar-link"
      :class="{ active: isActive }"
    >
      <span v-if="item.icon" class="item-icon">{{ item.icon }}</span>
      <span class="item-label">{{ item.label }}</span>
    </router-link>

    <div v-else class="sidebar-link" @click="toggleChildren">
      <span v-if="item.icon" class="item-icon">{{ item.icon }}</span>
      <span class="item-label">{{ item.label }}</span>
      <span v-if="item.children" class="expand-icon" :class="{ expanded: isExpanded }"> ▼ </span>
    </div>

    <div v-if="item.children" class="children" :class="{ expanded: isExpanded }">
      <SidebarItem
        v-for="child in item.children"
        :key="child.id"
        :item="child"
        class="child-item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import type { MenuItem } from "../utils/types/sidebar";

const props = defineProps<{
  item: MenuItem;
}>();

const route = useRoute();
const isExpanded = ref(false);

const isActive = computed(() => {
  return props.item.route === route.path;
});

const toggleChildren = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

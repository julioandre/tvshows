<template>
  <div class="search-wrapper">
    <div class="search-container" :class="{ 'is-focused': isFocused }">
      <SearchInput
        v-model="searchQuery"
        :placeholder="placeholder"
        :error-message="errorMessage"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <ClearButton v-if="searchQuery" @clear="clearSearch" />
    </div>
    <ErrorMessage :message="errorMessage" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { SearchProps } from "../utils/types/search";
import { useDebounce } from "@/composables/useDebounce";
import { useValidation } from "@/composables/useValidation";
import SearchInput from "./SearchInput.vue";
import ClearButton from "./ClearButton.vue";
import ErrorMessage from "./ErrorMessage.vue";

const props = withDefaults(defineProps<SearchProps>(), {
  placeholder: "Search...",
  minLength: 0,
  debounceTime: 300,
});

const emit = defineEmits<{
  (e: "search", value: string): void;
  (e: "clear"): void;
}>();

const searchQuery = ref("");
const isFocused = ref(false);
const errorMessage = ref("");

const { debounce } = useDebounce(props.debounceTime);

watch(searchQuery, (newValue) => {
  const { validate } = useValidation(newValue, props.minLength);
  const { isValid, errorMessage: error } = validate();

  errorMessage.value = error;

  if (isValid) {
    debounce(() => emit("search", newValue));
  }
});

const clearSearch = () => {
  searchQuery.value = "";
  errorMessage.value = "";
  emit("clear");
};

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
};
</script>

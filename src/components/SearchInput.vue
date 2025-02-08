<template>
  <input
    :value="modelValue"
    @input="handleInput"
    type="text"
    :placeholder="placeholder"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
    class="search-input"
    :class="{ 'is-error': !!errorMessage }"
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  placeholder?: string;
  errorMessage?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "focus"): void;
  (e: "blur"): void;
}>();

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit("update:modelValue", value);
};
</script>

<style scoped>
.search-input {
  width: 100%;
  padding: 8px 35px 8px 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  line-height: 1.5;
  outline: none;
  transition: all 0.2s ease;
}

.search-input:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.search-input.is-error {
  border-color: #dc3545;
}
</style>

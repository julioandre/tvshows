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

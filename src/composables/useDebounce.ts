import { onUnmounted } from "vue";

export function useDebounce(delay: number = 300) {
  let timeout: ReturnType<typeof setTimeout>;

  const debounce = (callback: () => void) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(callback, delay);
  };

  onUnmounted(() => {
    if (timeout) clearTimeout(timeout);
  });

  return { debounce };
}

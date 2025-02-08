import { ref, onMounted, onUnmounted } from "vue";

export function useBreakpoint() {
  const isMobile = ref(false);
  const isTablet = ref(false);
  const isDesktop = ref(false);

  const checkBreakpoint = () => {
    const width = window.innerWidth;
    isMobile.value = width < 576;
    isTablet.value = width >= 576 && width < 992;
    isDesktop.value = width >= 992;
  };

  onMounted(() => {
    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", checkBreakpoint);
  });

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
}

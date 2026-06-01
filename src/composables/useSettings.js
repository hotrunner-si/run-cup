import { ref, watch } from 'vue'

const darkMode = ref(false)

export function useSettings() {

  watch(
    darkMode,
    (value) => {
      document.documentElement.classList.toggle('dark', value)
    },
    { immediate: true },
  )

  return {
    darkMode
  }
}
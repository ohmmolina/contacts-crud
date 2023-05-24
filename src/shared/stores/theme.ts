//Pinia store
import { defineStore } from 'pinia'
import { useDark, useToggle } from '@vueuse/core'
import { computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  const theme = computed(() => (isDark.value ? 'dark' : 'light'))

  function toggleTheme() {
    toggleDark()
  }

  return {
    theme,
    toggleTheme
  }
})

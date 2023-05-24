<script setup lang="ts">
import { useThemeStore } from '@/shared/stores'
import IconBase from '@/shared/components/IconBase.vue'

const { theme, toggleTheme } = useThemeStore()
</script>
<template>
  <div class="text-right">
    <button @click="toggleTheme()">
      <icon-base :icon="theme === 'light' ? 'light_mode' : 'dark_mode'" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/shared/stores'
import Button from './ButtonBase.vue'

const { toggleTheme } = useThemeStore()
const { theme } = storeToRefs(useThemeStore())
</script>
<template>
  <div class="flex justify-between py-2 px-4 md:py-4 md:px-10">
    <h6 class="text-lg font-semibold">Unosquare</h6>
    <Button
      variant="icon"
      :icon="theme === 'light' ? 'dark_mode' : 'light_mode'"
      @click="toggleTheme()"
    />
  </div>
</template>

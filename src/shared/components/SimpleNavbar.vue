<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import IconBase from '@/shared/components/IconBase.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
<template>
  <div class="text-right">
    <button @click="toggleDark()">
      <icon-base :icon="isDark ? 'light_mode' : 'dark_mode'" />
    </button>
  </div>
</template>

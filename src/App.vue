<script setup lang="ts">
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/shared/stores'
const { theme } = storeToRefs(useThemeStore())
</script>

<template>
  <div :class="theme">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { RouterView } from 'vue-router'
</script>

<template>
  <div :class="useDark() ? 'dark' : ''">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: 'person'
  variant?: 'outlined' | 'round' | 'sharp' | 'two-tone'
  size?: 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'
  color?: string
}>()
</script>
<template>
  <span
    :class="`font-mi${variant ? `-${variant}` : ''} text-${color ?? 'blue-500'} text-${
      size ?? 'md'
    }`"
  >
    {{ icon }}
  </span>
</template>

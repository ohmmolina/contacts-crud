<script setup lang="ts">
import type { MaterialIcon, MaterialIconVariant, Color, Size } from '../types'

defineProps<{
  icon: MaterialIcon
  variant?: MaterialIconVariant
  size?: Size
  color?: Color
}>()
</script>
<template>
  <span :class="`font-mi${variant ? `-${variant}` : ''}`" class="align-top icon">
    {{ icon }}
  </span>
</template>

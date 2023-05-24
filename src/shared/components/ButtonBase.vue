<script setup lang="ts">
import type { MaterialIcon, MaterialIconVariant, Color, Size } from '@/shared/types'
import type { VNode, RendererNode, RendererElement } from 'vue'
import { computed, useSlots } from 'vue'
import Icon from './IconBase.vue'

type Props = {
  text?: string
  icon?: MaterialIcon
  iconVariant?: MaterialIconVariant
  variant?: 'outlined' | 'text' | 'icon'
  color?: Color
  size?: Size
  disabled?: boolean
  loading?: boolean
}

const props = defineProps<Props>()
defineEmits(['click'])

const slots = useSlots()
let defaultSlot: VNode<RendererNode, RendererElement, { [key: string]: unknown }> | undefined =
  undefined
if (slots.default) {
  defaultSlot = slots.default()[0]
  console.log(defaultSlot)
}

if (!props.text && !props.icon && !defaultSlot) {
  throw new Error('Either text prop, icon prop or slot must be provided')
}
if (props.variant === 'icon' && !props.icon) {
  throw new Error('Icon variant requires icon prop')
}

const buttonClasses = computed(() => {
  const classes = []
  if (props.variant === 'icon') {
    classes.push('btn-icon')
    classes.push(`btn-${props.color}`)
  } else {
    if (props.size) classes.push(`btn-${props.size}`)
    else classes.push('btn')
    classes.push(`btn-${props.color}` + (props.variant ? `-${props.variant}` : ''))
  }
  return classes.join(' ')
})

const iconClasses = computed(() => {
  return (props.text || defaultSlot) && props.variant !== 'icon' ? 'mr-1' : '' // If there is text or a default slot, space the icon from the text
})
</script>
<template>
  <button :class="buttonClasses" @click="$emit('click')">
    <Icon
      v-if="icon"
      :class="iconClasses"
      :icon="icon"
      :variant="iconVariant"
      :size="size"
      :color="color ?? 'primary'"
    />
    <span v-if="text && variant !== 'icon'" class="">{{ text }}</span>
    <slot v-else-if="variant !== 'icon'" />
  </button>
</template>
<style>
.btn {
  @apply px-4 h-10 w-fit rounded-full text-center font-medium tracking-wide;
}
.btn-sm {
  @apply px-3 h-8 w-fit rounded-full text-center text-sm font-medium tracking-wide;
}
.btn-lg {
  @apply px-5 h-12 w-fit rounded-full text-center text-lg font-medium tracking-wide;
}
.btn span {
  @apply pr-2;
}
.btn-sm span {
  @apply pr-1;
}
.btn-lg span {
  @apply pr-3;
}
.btn-icon {
  @apply p-3 rounded-full;
}
.btn-primary {
  @apply bg-primary text-primary-on transition-all
  dark:bg-primary-dark dark:text-primary-dark-on
  disabled:bg-surface-on/12 disabled:text-surface-on/38 disabled:pointer-events-none
  dark:disabled:bg-surface-dark-on/12 dark:disabled:text-surface-dark-on/38
  hover:bg-primary/92 hover:text-primary-on/92 hover:shadow-neutral-50 hover:shadow-md
  dark:hover:bg-primary-dark/92 dark:hover:text-primary-dark-on/92
  focus:bg-primary/88 focus:text-primary-on/88 focus:shadow-neutral-50 focus:shadow-md
  dark:focus:bg-primary-dark/88 dark:focus:text-primary-dark-on/88;
}
.btn-primary-outlined {
  @apply bg-transparent border border-outline text-primary transition-all
  dark:border-outline-dark dark:text-primary-dark
  disabled:bg-surface-on/12 disabled:text-surface-on/38 disabled:pointer-events-none
  dark:disabled:bg-surface-dark-on/12 dark:disabled:text-surface-dark-on/38
  hover:bg-primary/8 hover:text-primary
  dark:hover:bg-primary-dark/8 dark:hover:text-primary-dark
  focus:bg-primary/12 focus:text-primary
  dark:focus:bg-primary-dark/12 dark:focus:text-primary-dark;
}
.btn-primary-text {
  @apply bg-transparent text-primary transition-all
  dark:text-primary-dark
  disabled:text-surface-on/38 disabled:pointer-events-none
  dark:disabled:text-surface-dark-on/38
  hover:bg-primary/8 hover:text-primary
  dark:hover:bg-primary-dark/8 dark:hover:text-primary-dark
  focus:bg-primary/12 focus:text-primary
  dark:focus:bg-primary-dark/12 dark:focus:text-primary-dark;
}
.btn-secondary {
  @apply bg-secondary text-secondary-on transition-all
  dark:bg-secondary-dark dark:text-secondary-dark-on
  disabled:bg-surface-on/12 disabled:text-surface-on/38 disabled:pointer-events-none
  dark:disabled:bg-surface-dark-on/12 dark:disabled:text-surface-dark-on/38
  hover:bg-secondary/92 hover:text-secondary-on/92 hover:shadow-neutral-50 hover:shadow-md
  dark:hover:bg-secondary-dark/92 dark:hover:text-secondary-dark-on/92
  focus:bg-secondary/88 focus:text-secondary-on/88 focus:shadow-neutral-50 focus:shadow-md
  dark:focus:bg-secondary-dark/88 dark:focus:text-secondary-dark-on/88;
}
.btn-secondary-outlined {
  @apply bg-transparent border border-outline text-secondary transition-all
  dark:border-outline-dark dark:text-secondary-dark
  disabled:bg-surface-on/12 disabled:text-surface-on/38 disabled:pointer-events-none
  dark:disabled:bg-surface-dark-on/12 dark:disabled:text-surface-dark-on/38
  hover:bg-secondary/8 hover:text-secondary
  dark:hover:bg-secondary-dark/8 dark:hover:text-secondary-dark
  focus:bg-secondary/12 focus:text-secondary
  dark:focus:bg-secondary-dark/12 dark:focus:text-secondary-dark;
}
.btn-secondary-text {
  @apply bg-transparent text-secondary transition-all
  dark:text-secondary-dark
  disabled:text-surface-on/38 disabled:pointer-events-none
  dark:disabled:text-surface-dark-on/38
  hover:bg-secondary/8 hover:text-secondary
  dark:hover:bg-secondary-dark/8 dark:hover:text-secondary-dark
  focus:bg-secondary/12 focus:text-secondary
  dark:focus:bg-secondary-dark/12 dark:focus:text-secondary-dark;
}
.btn-tertiary {
  @apply bg-tertiary text-tertiary-on transition-all
  dark:bg-tertiary-dark dark:text-tertiary-dark-on
  disabled:bg-surface-on/12 disabled:text-surface-on/38 disabled:pointer-events-none
  dark:disabled:bg-surface-dark-on/12 dark:disabled:text-surface-dark-on/38
  hover:bg-tertiary/92 hover:text-tertiary-on/92 hover:shadow-neutral-50 hover:shadow-md
  dark:hover:bg-tertiary-dark/92 dark:hover:text-tertiary-dark-on/92
  focus:bg-tertiary/88 focus:text-tertiary-on/88 focus:shadow-neutral-50 focus:shadow-md
  dark:focus:bg-tertiary-dark/88 dark:focus:text-tertiary-dark-on/88;
}
.btn-tertiary-outlined {
  @apply bg-transparent border border-outline text-tertiary transition-all
  dark:border-outline-dark dark:text-tertiary-dark
  disabled:bg-surface-on/12 disabled:text-surface-on/38 disabled:pointer-events-none
  dark:disabled:bg-surface-dark-on/12 dark:disabled:text-surface-dark-on/38
  hover:bg-tertiary/8 hover:text-tertiary
  dark:hover:bg-tertiary-dark/8 dark:hover:text-tertiary-dark
  focus:bg-tertiary/12 focus:text-tertiary
  dark:focus:bg-tertiary-dark/12 dark:focus:text-tertiary-dark;
}
.btn-tertiary-text {
  @apply bg-transparent text-tertiary transition-all
  dark:text-tertiary-dark
  disabled:text-surface-on/38 disabled:pointer-events-none
  dark:disabled:text-surface-dark-on/38
  hover:bg-tertiary/8 hover:text-tertiary
  dark:hover:bg-tertiary-dark/8 dark:hover:text-tertiary-dark
  focus:bg-tertiary/12 focus:text-tertiary
  dark:focus:bg-tertiary-dark/12 dark:focus:text-tertiary-dark;
}
</style>

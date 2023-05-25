<script setup lang="ts">
import { computed, type Events } from 'vue'
import type { Color, Size, MaterialIcon } from '../types'
import Icon from './IconBase.vue'

const props = defineProps<{
  type?: 'text' | 'number' | 'email' | 'tel' | 'password'
  label: string
  variant: 'outlined'
  color: Color
  size?: Size
  iconLead?: MaterialIcon
  iconTrail?: MaterialIcon
  hint?: string
  max?: number | string
  hasError?: boolean
}>()
defineEmits(['icon-trail-click', 'input'])
const modelValue = defineModel<string | number>()

const inputClasses = computed(() => {
  const classes = []
  if (props.variant) classes.push(`input-${props.variant}`)
  if (props.size) classes.push(`input-${props.size}`)
  if (props.iconLead) classes.push('px-9')
  else classes.push('px-4')
  if (props.hasError) {
    classes.push('input-error')
  } else if (props.color) {
    classes.push(`input-${props.color}`)
  }
  return classes.join(' ')
})
const labelClasses = computed(() => {
  const classes = ['change-sibling']
  if (props.variant) classes.push(`input-label-${props.variant}`)
  if (props.iconLead) classes.push('left-9', 'peer-placeholder-shown:left-9', 'peer-focus:left-9')
  else classes.push('left-3', 'peer-placeholder-shown:left-3', 'peer-focus:left-3')
  return classes.join(' ')
})
const iconTrailComputed = computed(() => (props.hasError ? 'error' : props.iconTrail ?? 'cancel'))
</script>
<template>
  <div class="input-group" :class="variant === 'outlined' ? 'bg-inherit' : 'bg-transparent'">
    <input
      v-model="modelValue"
      :type="type ?? 'text'"
      :maxlength="max"
      class="peer"
      :class="inputClasses"
      placeholder="placeholder necesary for the floating label to work"
      @input="$emit('input', $event.target.value)"
    />
    <label :class="labelClasses">{{ label }}</label>
    <Icon v-if="iconLead" :icon="iconLead" class="input-icon-lead cursor-default" />
    <Icon
      v-if="iconTrail"
      :icon="iconTrailComputed"
      variant="outlined"
      class="input-icon-trail change-sibling cursor-default"
      @click="$emit('icon-trail-click')"
    />
    <label v-if="hint" class="input-supporting-text change-sibling">{{ hint }}</label>
  </div>
</template>
<style>
.input-group {
  @apply flex flex-col relative;
}
.input-icon-lead {
  @apply absolute top-1/2 left-3 -translate-y-1/2
  peer-disabled:text-surface-on/38
  dark:peer-disabled:text-surface-dark-on/38;
}
.input-icon-trail {
  @apply absolute transition-all delay-100 top-1/2 right-3 -translate-y-1/2 opacity-100
  peer-placeholder-shown:opacity-0 peer-focus:opacity-100 peer-disabled:text-surface-on/38
  dark:peer-disabled:text-surface-dark-on/38;
}
.input-supporting-text {
  @apply absolute -bottom-4 left-3 text-xs text-surface-on-variant
  peer-disabled:text-surface-on/38
  dark:text-surface-dark-on-variant
  dark:peer-disabled:text-primary-dark-on/38;
}

.input-outlined {
  @apply bg-inherit border border-outline rounded-md py-2.5 text-surface-on-variant placeholder-transparent
  disabled:border-surface-on/38 disabled:text-surface-on/38
  dark:bg-inherit dark:border-outline-dark dark:text-surface-dark-on
  dark:disabled:border-surface-dark-on/38 dark:disabled:text-surface-dark-on/38;
}
.input-label-outlined {
  @apply absolute -top-1.5 mb-1 px-1 text-surface-on-variant text-xs font-medium transition-all bg-inherit
  peer-placeholder-shown:top-2 peer-placeholder-shown:p-0
  peer-placeholder-shown:text-base peer-focus:-top-1.5 peer-focus:px-1 peer-focus:text-xs
  peer-disabled:text-surface-on/38
  dark:text-surface-dark-on dark:bg-inherit dark:peer-disabled:text-surface-dark-on/38;
}

.input-primary {
  @apply focus:outline-primary [&+.change-sibling]:focus:text-primary
  dark:focus:outline-primary-dark dark:[&+.change-sibling]:focus:text-primary-dark;
}
.input-error {
  @apply focus:outline-error border-error [&+.change-sibling]:text-error
  dark:focus:outline-error-dark dark:border-error-dark dark:[&+.change-sibling]:text-error-dark;
}
</style>

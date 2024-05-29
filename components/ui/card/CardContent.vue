<script setup lang="ts">
import { cn } from "../../../utils"

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div :class="cn('px-6 py-2 pt-0', props.class)">
    <slot />
  </div>
</template>

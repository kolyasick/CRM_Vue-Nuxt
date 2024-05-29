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
  <div :class="cn('flex flex-col space-y-1.5 px-6 pt-5 pb-3', props.class)">
    <slot />
  </div>
</template>

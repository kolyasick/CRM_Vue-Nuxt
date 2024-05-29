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
  <div :class="cn('p-6 pt-0 !text-[14px] opacity-70 italic', props.class)">
    <slot />
  </div>
</template>

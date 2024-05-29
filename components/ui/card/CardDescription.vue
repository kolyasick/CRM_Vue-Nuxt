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
  <p :class="cn('!text-[16px] text-muted-foreground ', props.class)">
    <slot />
  </p>
</template>

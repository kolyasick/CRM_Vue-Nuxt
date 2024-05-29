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
  <div
    :class="
      cn(
        'animation rounded-xl hover:border-[#a252c83d] transition-colors bg-card border bg-card text-card-foreground shadow',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>


<style scoped>
@keyframes show {
  from {
    @apply border-[#a252c83d];
    transform: scale(0.5) translateY(-30px);
    opacity: 0.4;
  }

  90% {
    @apply border-[#a252c83d];
  }

  to {
    @apply border-transparent;
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.animation {
  animation: show 0.3s ease-in-out;
}
</style>


<template>
  <div class="mb-3">
    <label v-if="label" class="opacity-75 mb-0.5 block text-xs">
      {{ label }}</label>
    <div class="text-base"><slot /></div>
  </div>
</template>


<script setup>
defineProps({
  label: String
})
</script>


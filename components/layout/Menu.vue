<template>
  <div>
    <NuxtLink
        v-for="item in MENU_DATA"
        class="flex items-center py-1 px-3 rounded-lg w-full cursor-pointer hover:bg-gray-700 transition-all mb-2"
        :to="item.url"
    >
      <Icon :name="item.icon" class="mr-3" />
      <span class="text-white">{{item.name }}</span>
    </NuxtLink>
  </div>
</template>

<script setup>

import {MENU_DATA} from "../../components/layout/menu.data";
</script>

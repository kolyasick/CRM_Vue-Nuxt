<template>
    <div class="cursor-pointer">
          <span
              v-for="({ code, name }) in locales"
              class="npd-locale-switcher__item"
              :key="code"
              :class="{ active: code === locale }"
              @click="code !== locale && setLocale(code)"
          >
              {{ name }}
          </span>
    </div>
</template>

<script lang="ts" setup>
const { locale, locales, setLocale } = useI18n();
</script>

<template>
  <section class="p-10 min-h-screen">
    <h1 class="font-bold text-2xl mb-10">
      Статистика заказов по компаниям
    </h1>
  <div style="height: 800px;" class="">
    <Doughnut class="w-auto" :data="data" :options="options" />
  </div>
  </section>
  
  
</template>

<script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import * as chartConfig from '@/chartConfig.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'App',
  components: {
    Doughnut
  },
  data() {
    return chartConfig
  }
}
</script>

import { defineNuxtPlugin } from '#app'
import { Bar } from 'vue-chartjs'
import { defineComponent } from 'vue'

const BarChart = defineComponent({
  extends: Bar,
  props: {
    data: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: false,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
      }),
    },
  },
  watch: {
    data() {
      this.renderChart(this.data, this.options)
    },
  },
  mounted() {
    this.renderChart(this.data, this.options)
  },
})

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('BarChart', BarChart)
})

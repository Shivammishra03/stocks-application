<script setup>
import { Pie } from "vue-chartjs";
import { ref, watch } from "vue";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const chartData = ref(props.data);

watch(() => props.data, (newData) => {
  chartData.value = newData;
});

const options = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
});
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <Pie :data="chartData" :options="options" />
  </div>
</template>

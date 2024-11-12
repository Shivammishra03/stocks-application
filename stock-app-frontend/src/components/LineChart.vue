<script setup>
import { Line } from "vue-chartjs";
import { defineProps, ref, watch } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

// Register chart components from chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

// Define the props for the component (to receive data from the parent)
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

// Initialize chartData as a reactive reference
const chartData = ref(props.data);

// Watch for changes in data and update the chartData accordingly
watch(() => props.data, (newData) => {
  chartData.value = newData;  // Update chart data when prop changes
});

// Set chart options
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
    <Line :data="chartData" :options="options" />
  </div>
</template>

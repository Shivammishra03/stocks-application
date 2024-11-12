<template>
    <div class="p-6 bg-white rounded-lg shadow-md">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-bold text-gray-800">Stock Chart</h3>
        <div class="flex items-center space-x-4">
          <DateRangePicker @change="updateDateRange" />
          <select v-if="role === 'User 1'" class="rounded-md border-gray-300" v-model="chartType">
            <option value="line">Line Chart</option>
          </select>
          <select v-if="role === 'User 2'" class="rounded-md border-gray-300" v-model="chartType">
            <option value="bar">Bar Chart</option>
          </select>
          <select v-if="role === 'User 3'" class="rounded-md border-gray-300" v-model="chartType">
            <option value="pie">Pie Chart</option>
          </select>
        </div>
      </div>
      <canvas id="chart" class="w-full h-64"></canvas>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import Chart from 'chart.js/auto';
  
  export default {
    props: ['role'],
    data() {
      return {
        chart: null,
        chartType: 'line',  // Set based on role
        data: [],
      };
    },
    watch: {
      chartType: 'updateChart',
    },
    methods: {
      updateDateRange(newRange) {
        // Fetch new data based on date range and update chart
      },
      updateChart() {
        if (this.chart) this.chart.destroy();
        // Initialize chart.js based on chartType
      },
    },
  };
  </script>
  
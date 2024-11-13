<template>
  <div class="p-8">
    <Navbar :username="username" />

    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <DateRangePicker @change="updateDateRange"/>
        <TopNStocks @update="updateTopN" />
      </div>
      <div v-if="userRole">
        <ChartDropdown :options="filteredChartOptions" v-model="selectedChart" />
        <LineChart v-if="selectedChart === 'line' && userRole === 'User1'" :data="chartData" />
        <BarChart v-if="selectedChart === 'bar' && userRole === 'User2'" :data="chartData" />
        <PieChart v-if="selectedChart === 'pie' && userRole === 'User3'" :data="chartData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue';
import DateRangePicker from '../components/DateRangePicker.vue';
import TopNStocks from '../components/TopNStocks.vue';
import ChartDropdown from '@/components/ChartDropdown.vue';
import LineChart from '@/components/LineChart.vue';
import BarChart from '@/components/BarChart.vue';
import PieChart from '@/components/PieChart.vue';

import {decodeJwt} from '../utils/jwtDecode'
import {getChartData} from '@/api/chartData';
import {getTopNStocks} from '@/api/topNStocksData';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedChart = ref('line');
const chartOptions = {
  User1: ['line'],
  User2: ['bar'],
  User3: ['pie'],
};

const filteredChartOptions = ref([]);
const dateRange = ref();
const startDate = '2024-01-01';
const endDate = '2024-12-31';

const username = ref('User1');

let userRole = ref('');


const chartData = ref({
  labels: [],
  datasets: [],
});


watch(selectedChart, (newChartType) => {
  console.log("Selected chart type:", newChartType);
});
const updateDateRange = (range) => {
  dateRange.value = range;
  fetchChartData();
};
const updateTopN = async(n) => {
  const topNdata = Number(n);
    const apiResponse = await getTopNStocks(startDate, endDate, topNdata);
    chartData.value = {
      labels: apiResponse.map(item => new Date(item.date).toISOString().slice(0, 10)),
      datasets: [{
        label: 'Stock Prices',
        data: apiResponse.map(item => item.close_price),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }],
    };
};
const fetchChartData = async () => {
  const apiResponse = await getChartData(startDate, endDate);
  chartData.value = {
      labels: apiResponse.map(item => new Date(item.date).toISOString().slice(0, 10)),
      datasets: [{
        label: 'Stock Prices',
        data: apiResponse.map(item => item.close_price),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }],
    };
};
onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = decodeJwt(token);
    userRole.value = decoded.role;
    username.value = userRole.value;


    filteredChartOptions.value = chartOptions[userRole.value] || [];
    selectedChart.value = filteredChartOptions.value[0] || '';

  } else {
    router.push('/login'); 
  }
  fetchChartData()
});
</script>

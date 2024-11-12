<template>
  <div class="p-8">
    <Navbar :username="username" />

    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <DateRangePicker @change="updateDateRange" />
        <TopNStocks @update="updateTopN" />
      </div>
      <div v-if="userRole === 'User1'">
        <ChartDropdown :options="chartOptions" v-model="selectedChart" />
        <LineChart v-if="selectedChart === 'line'" :data="chartData" />
      </div>

      <div v-if="userRole === 'User2'">
        <ChartDropdown :options="chartOptions" v-model="selectedChart" />
        <BarChart v-if="selectedChart === 'bar'" :data="chartData" />
      </div>

      <div v-if="userRole === 'User3'">
        <ChartDropdown :options="chartOptions" v-model="selectedChart" />
        <PieChart v-if="selectedChart === 'pie'" :data="chartData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue';
import DateRangePicker from '../components/DateRangePicker.vue';
import TopNStocks from '../components/TopNStocks.vue';
import Chart from '../components/Chart.vue';
import ChartDropdown from '@/components/ChartDropdown.vue';
import LineChart from '@/components/LineChart.vue';
import BarChart from '@/components/BarChart.vue';
import PieChart from '@/components/PieChart.vue';

import {decodeJwt} from '../utils/jwtDecode'
import {getChartData} from '@/api/chartData';

// const chartOptions = ref(['line Chart', 'Bar Chart', 'Pie Chart']);
// const selectedChart = ref('line Chart');
// const username = 'User1'
const userChartType = 'line'
const chartLabels = []

const chartOptions = ['line', 'bar', 'pie'];
const selectedChart = ref('line');
// const chartData = ref({}); 

const username = 'User1';

let userRole = ref('');


const chartData = ref({
  labels: [],
  datasets: [],
});


watch(selectedChart, (newChartType) => {
  console.log("Selected chart type:", newChartType);
});
const updateDateRange = (range) => {
  
};
const updateTopN = (n) => {
  
};
const fetchChartData = async () => {
  const apiResponse = await getChartData();
  console.log("apiResponse", apiResponse)

  chartData.value = {
      labels: apiResponse.map(item => item.date),
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
  } else {
    const router = useRouter();
    router.push('/login'); 
  }
  fetchChartData()
});
</script>

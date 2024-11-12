<!-- <template>
  <div>
    <h2>Dashboard</h2>
    <button @click="handleLogout">Logout</button>
    <select v-if="isUser1" @change="setChartType">
      <option value="line">Line Chart</option>
    </select>
    <select v-if="isUser2" @change="setChartType">
      <option value="bar">Bar Chart</option>
    </select>
    <select v-if="isUser3" @change="setChartType">
      <option value="pie">Pie Chart</option>
    </select>

    <component :is="chartType" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import LineChart from '../components/LineChart.vue';
import BarChart from '../components/BarChart.vue';
import PieChart from '../components/PieChart.vue';
import { logout } from '../services/authService';
import {decodeJwt} from '../utils/jwtDecode'


// State
const chartType = ref(null);
const role = ref(null);

// Decode token and get the role on component mount
onMounted(() => {
  const token = localStorage.getItem('token');
  
  if (token) {
    try {
      const decoded = decodeJwt(token); // Decode the token to get the role
      role.value = decoded.role;
    } catch (error) {
      console.error('Error decoding token:', error);
      // Handle case when the token is invalid or expired
    }
  } else {
    console.log('No token found');
    // Redirect to login if no token
    const router = useRouter();
    router.push('/login');
  }
});

// Computed properties based on the role
const isUser1 = computed(() => role.value === 'User1');
const isUser2 = computed(() => role.value === 'User2');
const isUser3 = computed(() => role.value === 'User3');

// Set chart type based on the selected option
const setChartType = (event) => {
  if (event.target.value === 'line') chartType.value = LineChart;
  if (event.target.value === 'bar') chartType.value = BarChart;
  if (event.target.value === 'pie') chartType.value = PieChart;
};

// Handle logout and redirect
const handleLogout = () => {
  logout();
  const router = useRouter();
  router.push('/login');
};
</script> -->
<template>
  <div class="p-8">
    <Navbar :username="username" />

    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <!-- <ChartDropdown :options="chartOptions" v-model="selectedChart" /> -->
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
// const chartData = ref({});  // Fetch chart data here

const username = 'User1'; // This can be dynamically set after login

let userRole = ref('');


const chartData = ref({
  labels: [],
  datasets: [],
});


watch(selectedChart, (newChartType) => {
  console.log("Selected chart type:", newChartType);
});
const updateDateRange = (range) => {
  // Fetch and update data based on selected date range
};
const updateTopN = (n) => {
  // Update top N stock data
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
    router.push('/login'); // Redirect to login if no token found
  }
  fetchChartData()
});
</script>

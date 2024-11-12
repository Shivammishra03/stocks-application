<template>
    <div>
      <label for="date-range">Select Date Range:</label>
      <input type="date" v-model="startDate" />
      <input type="date" v-model="endDate" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const startDate = ref('');
  const endDate = ref('');
  </script>
  
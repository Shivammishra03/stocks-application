<template>
  <div class="flex space-x-2">
    <input type="date" v-model="startDate" class="border border-gray-300 rounded p-2" @change="updateDateRange" />
    <input type="date" v-model="endDate" class="border border-gray-300 rounded p-2" @change="updateDateRange" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: '',
      endDate: ''
    };
  },
  methods: {
    updateDateRange() {
      this.$emit('change', { start: this.startDate, end: this.endDate });
    }
  }
};
</script>

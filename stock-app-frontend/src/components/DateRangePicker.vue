<script setup>
import { ref, watch } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const range = ref([new Date(), new Date()]);
const emit = defineEmits(['change']);

watch(range, (newRange) => {
  emit('change', newRange);
});

const formatDate = (date) => {
    if (date.length === 2) {
        return format(new Date(date[0]), 'dd-MM-yyyy') + ' - ' + format(new Date(date[1]), 'dd-MM-yyyy'); // this is for we get the warning about vueDateRangePicker's prop name as inputValue
        // return [format(new Date(date[0]), 'dd-MM-yyyy') + ' - ' + format(new Date(date[1]), 'dd-MM-yyyy')]; // Due to this we get above warning
    } else {
        return;
    }
};
</script>

<template>
  <div class=" space-x-2">
    <VueDatePicker v-model="range" range auto-apply />
  </div>
</template>
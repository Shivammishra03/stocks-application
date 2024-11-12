<script setup>
    import { ref, watch } from 'vue';

    const props = defineProps({
        options: {
            type: Array,
            required: true,
        },
        modelValue: {
            type: String,
            required: true,
        }
    });
  
    const selectedChart = ref(props.modelValue);
    const emit = defineEmits(['update:modelValue']);
  
    watch(selectedChart, (newVal) => {
        emit('update:modelValue', newVal);
    });
  
    const updateSelection = () => {
        emit('update:modelValue', selectedChart.value);
    };
</script>

<template>
    <select v-model="selectedChart" @change="updateSelection" class="p-2 border border-gray-300 rounded-md">
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
</template>
  
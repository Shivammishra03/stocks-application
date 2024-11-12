<template>
    <div class="flex flex-col">
        <label for="top-n" class="text-sm font-medium text-gray-700">Top N Stocks</label>
        <input id="top-n" type="number" min="1" v-model.number="n" class="border border-gray-300 rounded p-2 mt-1"
            @change="updateTopN" placeholder="Enter a number" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            n: 5  // Default value
        };
    },
    methods: {
        updateTopN() {
            this.$emit('update', this.n);
        }
    }
};
</script>
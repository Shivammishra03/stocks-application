<template>
    <nav class="bg-yellow-500 p-4 flex justify-between items-center rounded-md">
        <div class="text-white font-bold text-lg">Stock Dashboard</div>
        <div class="space-x-4">
            <span class="text-white font-medium">{{ username }}</span>
            <button @click="logout" class="text-white bg-red-500 px-4 py-2 rounded">Logout</button>
        </div>
    </nav>
</template>

<script>
export default {
    props: ['username'],
    methods: {
        logout() {
            // Add logout logic, e.g., clearing tokens
            this.$router.push('/login');
        }
    }
}
</script>
<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-400 to-pink-500">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-800">Welcome Back</h2>
      <p class="text-center text-gray-500">Please log in to your account</p>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" id="username" v-model="username" :class="{ 'border-red-500': usernameError }"
            class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-500"
            required />
          <span v-if="usernameError" class="text-sm text-red-500">{{ usernameError }}</span>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" v-model="password" :class="{ 'border-red-500': passwordError }"
            class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-500"
            required />
          <span v-if="passwordError" class="text-sm text-red-500">{{ passwordError }}</span>
        </div>
        <button type="submit"
          class="w-full py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2">
          Log In
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/authService';

const username = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    await login(username.value, password.value);
    router.push('/dashboard');
  } catch (error) {
    alert("Login failed");
  }
};
</script>
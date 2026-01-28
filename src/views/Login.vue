<script setup>
import { ref } from 'vue'

// State สำหรับเก็บข้อมูลในฟอร์ม
const email = ref('')
const password = ref('')
const rememberMe = ref(false)

// State สำหรับลูกเล่น UI
const showPassword = ref(false)


</script>

<template>
  <div class="h-screen w-full flex overflow-hidden bg-[#f6f8f6] font-main">
    
    <div class="hidden lg:flex w-1/2 h-full items-center justify-center relative p-8">
      <div class="brand-green-dark w-full max-w-[550px] h-[95%] oval-shape flex flex-col justify-center px-12 relative shadow-xl">
        <div class="space-y-6">
          <div class="flex items-center gap-4">
            <div class="bg-[#32D63B] p-2 rounded-lg text-[#17291F]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 class="text-4xl font-bold brand-green-text tracking-wide">กิจเกษตร</h1>
          </div>

          <h2 class="text-[40px] leading-tight font-bold brand-green-text mt-8">
            มั่นใจในทุกการสั่งซื้อ<br>
            กับผลิตภัณฑ์ที่คัดสรรมา<br>
            เพื่อเกษตรกรไทยโดย<br>
            เฉพาะ
          </h2>
        </div>
      </div>
    </div>

    <div class="w-full lg:w-1/2 h-full flex flex-col justify-center items-center px-6 py-8 overflow-y-auto">
      <div class="w-full max-w-md">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Login to your account</h2>
        <p class="text-gray-500 text-sm mb-8 leading-relaxed">
          Welcome back! Please enter your details to access your farm insights.
        </p>

        <form @submit.prevent="handleLogin" class="space-y-5">
          
          <div>
            <label class="block text-sm font-bold text-gray-900 mb-2">Email or Phone Number</label>
            <input 
              v-model="email"
              type="text" 
              placeholder="66xxxxxxxxx"
              class="w-full px-4 py-3 bg-white border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm placeholder-gray-400 text-sm"
            >
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-900 mb-2">Password</label>
            <div class="relative">
              <input 
                v-model="password"
                :type="showPassword ? 'text' : 'password'" 
                placeholder="••••••••"
                class="w-full px-4 py-3 bg-white border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm placeholder-gray-400 text-sm tracking-widest"
              >
              <button 
                type="button" 
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-green-600 hover:text-green-800 focus:outline-none"
              >
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center">
              <input 
                id="remember-me" 
                type="checkbox" 
                v-model="rememberMe"
                class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              >
              <label for="remember-me" class="ml-2 block text-gray-500">Remember me</label>
            </div>
            <a href="#" class="font-medium text-gray-600 hover:text-gray-900">Forgot password?</a>
          </div>

        
           <RouterLink to="/" class="block w-full py-3 rounded-lg bg-green-500 text-black text-lg font-semibold hover:bg-green-600 transition mt-2 text-center">
                        Login 
        </RouterLink>
        </form>

        <div class="mt-20 pt-6">
          <div class="flex justify-between items-center text-sm">
            <span class="text-gray-500">New user?</span>
            <a href="#" class="font-bold text-green-600 hover:underline">Create an account </a>
          </div>

          <div class="mt-8 flex justify-between text-[10px] text-gray-500 uppercase tracking-wide font-medium">
            <a href="#" class="hover:text-gray-900">Privacy<br>Policy</a>
            <a href="#" class="hover:text-gray-900">Terms of<br>Service</a>
            <a href="#" class="hover:text-gray-900">Help<br>Center</a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Import Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sarabun:wght@400;500;700;800&display=swap');

.font-main {
  font-family: 'Inter', 'Sarabun', sans-serif;
}

/* Custom Colors */
.brand-green-dark {
  background-color: #17291F;
}

.brand-green-text {
  color: #32D63B;
}

.btn-green {
  background-color: #1ED730;
}

.btn-green:hover {
  background-color: #18b528;
}

/* Custom shape */
.oval-shape {
  border-radius: 48%;
}
</style>
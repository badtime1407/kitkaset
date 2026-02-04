<script setup>
import { ref } from 'vue';

const newPassword = ref('');
const confirmPassword = ref('');
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const isSubmitted = ref(false);

const handleSubmit = () => {
  if (newPassword.value && newPassword.value === confirmPassword.value) {
    isSubmitted.value = true;
  } else if (newPassword.value !== confirmPassword.value) {
    alert("Passwords do not match!");
  } else {
    alert("Please enter a password.");
  }
};
</script>

<template>
  <div class="min-h-screen bg-[#f9f9f9] font-main text-[#0d1b0f] flex flex-col">
    
    <header class="shrink-0 flex items-center justify-between py-3 px-6 w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div class="flex items-center gap-3 shrink-0 cursor-pointer">
        <div class="text-[#000000] size-8">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
             <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 class="text-xl font-extrabold leading-tight tracking-tight hidden sm:block text-black">กิจเกษตร</h2>
      </div>
    </header>

    <main class="flex-1 flex items-center justify-center p-4">
      <div class="w-full max-w-[480px] bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 md:p-10 transition-all">
        
        <div class="text-center mb-10">
          <h1 class="text-[32px] font-bold text-black leading-tight mb-3">Create New Password</h1>
          <p class="text-[#6B7280] text-base font-normal">
            Ensure your account is secure by choosing a strong password.
          </p>
        </div>

        <form v-if="!isSubmitted" @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-5">
            <div class="space-y-2">
              <label class="block text-sm font-bold text-black">Email or Phone Number</label>
              <div class="relative">
                <input 
                  v-model="newPassword"
                  :type="showNewPassword ? 'text' : 'password'"
                  class="w-full h-[56px] bg-[#F9FBF9] border border-[#E2E8E2] rounded-lg px-4 focus:outline-none focus:border-[#22C55E] transition-colors"
                  placeholder="XXXXX"
                />
                <button type="button" @click="showNewPassword = !showNewPassword" class="absolute right-4 top-4 text-[#9CA3AF] hover:text-[#22C55E]">
                  <span class="material-symbols-outlined text-[22px]">{{ showNewPassword ? 'visibility' : 'visibility_off' }}</span>
                </button>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-bold text-black">Confirm New Password</label>
              <div class="relative">
                <input 
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="w-full h-[56px] bg-[#F9FBF9] border border-[#E2E8E2] rounded-lg px-4 focus:outline-none focus:border-[#22C55E] transition-colors"
                  placeholder="••••••••"
                />
                <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute right-4 top-4 text-[#9CA3AF] hover:text-[#22C55E]">
                  <span class="material-symbols-outlined text-[22px]">{{ showConfirmPassword ? 'visibility' : 'visibility_off' }}</span>
                </button>
              </div>
            </div>
          </div>

          <RouterLink 
           to="/Login" 
            class="w-full h-[60px] bg-[#1AFE30] hover:bg-[#16e52b] text-black font-bold text-lg rounded-xl transition-all shadow-sm flex items-center justify-center leading-tight active:scale-[0.98]"
          >
            Update<br>Password
        </RouterLink >
        </form>
      </div>
    </main>

    
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Material+Symbols+Outlined');

body {
  font-family: 'Inter', sans-serif;
  margin: 0;
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
}
</style>
<script setup>
import { ref } from 'vue';

// --- State ---
const newPassword = ref('StrongPass123!');
const confirmPassword = ref('');
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const isSubmitted = ref(false);

// --- Logic ---
const toggleNewPasswordVisibility = () => {
  showNewPassword.value = !showNewPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const handleSubmit = () => {
  // ตรวจสอบว่ารหัสตรงกันหรือไม่
  if (newPassword.value && newPassword.value === confirmPassword.value) {
    // จำลองการส่ง API
    setTimeout(() => {
      isSubmitted.value = true;
    }, 500);
  } else if (newPassword.value !== confirmPassword.value) {
    alert("Passwords do not match!");
  } else {
    alert("Please enter a password.");
  }
};
</script>

<template>
  <div class="layout-container flex h-full grow flex-col min-h-screen font-display bg-[#f6f8f6] dark:bg-[#102212] text-[#0d1b0f] dark:text-white transition-colors duration-200">
    
    <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e7f3e8] dark:border-[#1a3a1d] px-4 md:px-10 py-3 bg-white dark:bg-[#102212]">
      <div class="flex items-center gap-4 text-[#0d1b0f] dark:text-[#13ec25]">
        <div class="size-8">
          <svg class="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_6_543)">
              <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
            </g>
            <defs>
              <clippath id="clip0_6_543">
                <rect fill="white" height="48" width="48"></rect>
              </clippath>
            </defs>
          </svg>
        </div>
        <h2 class="text-lg font-bold leading-tight tracking-[-0.015em] dark:text-white">AgroConsult</h2>
      </div>
      <div class="flex flex-1 justify-end gap-8">
        <div class="hidden md:flex items-center gap-9">
          <a class="text-sm font-medium leading-normal hover:text-[#13ec25] transition-colors" href="#">Shop</a>
          <a class="text-sm font-medium leading-normal hover:text-[#13ec25] transition-colors" href="#">Consultation</a>
          <a class="text-sm font-medium leading-normal hover:text-[#13ec25] transition-colors" href="#">Support</a>
        </div>
        <button class="flex items-center justify-center rounded-lg h-10 bg-[#e7f3e8] dark:bg-[#1a3a1d] text-[#0d1b0f] dark:text-white px-3 hover:bg-[#13ec25]/20 transition-all">
          <span class="material-symbols-outlined text-xl">account_circle</span>
        </button>
      </div>
    </header>

    <main class="flex flex-1 items-center justify-center p-6">
      <div class="w-full max-w-[500px] bg-white dark:bg-[#152b17] p-8 rounded-xl shadow-sm border border-[#e7f3e8] dark:border-[#1a3a1d]">
        
        <div class="mb-8">
          <h1 class="text-[#0d1b0f] dark:text-white tracking-tight text-[32px] font-bold leading-tight text-center">
            Create New Password
          </h1>
          <p class="text-[#4c6a4e] dark:text-[#a0c0a2] text-base font-normal leading-normal mt-2 text-center">
            Ensure your account is secure by choosing a strong password.
          </p>
        </div>

        <form v-if="!isSubmitted" class="flex flex-col gap-6" @submit.prevent="handleSubmit">
          
          <div class="flex flex-col gap-2">
            <label class="flex flex-col">
              <p class="text-[#0d1b0f] dark:text-white text-base font-medium leading-normal pb-2">New Password</p>
              <div class="flex w-full items-stretch rounded-lg shadow-sm">
                <input
                  v-model="newPassword"
                  :type="showNewPassword ? 'text' : 'password'"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg rounded-r-none border border-[#cfe7d1] dark:border-[#2a4d2d] bg-[#f8fcf8] dark:bg-[#0d1b0f] text-[#0d1b0f] dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#13ec25] focus:border-[#13ec25] h-14 placeholder:text-[#4c9a52]/60 p-[15px] border-r-0 pr-2 text-base font-normal leading-normal transition-all"
                  placeholder="••••••••"
                />
                <div
                  @click="toggleNewPasswordVisibility"
                  class="text-[#4c9a52] flex border border-[#cfe7d1] dark:border-[#2a4d2d] bg-[#f8fcf8] dark:bg-[#0d1b0f] items-center justify-center pr-[15px] rounded-r-lg border-l-0 cursor-pointer select-none hover:bg-gray-50 dark:hover:bg-[#1a3a1d] transition-colors"
                >
                  <span class="material-symbols-outlined">
                    {{ showNewPassword ? 'visibility_off' : 'visibility' }}
                  </span>
                </div>
              </div>
            </label>

            <label class="flex flex-col">
              <p class="text-[#0d1b0f] dark:text-white text-base font-medium leading-normal pb-2">Confirm New Password</p>
              <div class="flex w-full items-stretch rounded-lg shadow-sm">
                <input
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg rounded-r-none border border-[#cfe7d1] dark:border-[#2a4d2d] bg-[#f8fcf8] dark:bg-[#0d1b0f] text-[#0d1b0f] dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#13ec25] focus:border-[#13ec25] h-14 placeholder:text-[#4c9a52]/60 p-[15px] border-r-0 pr-2 text-base font-normal leading-normal transition-all"
                  placeholder="••••••••"
                />
                <div
                  @click="toggleConfirmPasswordVisibility"
                  class="text-[#4c9a52] flex border border-[#cfe7d1] dark:border-[#2a4d2d] bg-[#f8fcf8] dark:bg-[#0d1b0f] items-center justify-center pr-[15px] rounded-r-lg border-l-0 cursor-pointer select-none hover:bg-gray-50 dark:hover:bg-[#1a3a1d] transition-colors"
                >
                  <span class="material-symbols-outlined">
                    {{ showConfirmPassword ? 'visibility_off' : 'visibility' }}
                  </span>
                </div>
              </div>
            </label>
          </div>

          <button
            type="submit"
            class="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 bg-[#13ec25] text-[#0d1b0f] gap-2 text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-[#13ec25]/20 hover:scale-[1.01] active:scale-95 transition-all"
          >
            Update Password
          </button>
        </form>

        <div v-else class="mt-8 p-4 bg-[#13ec25]/10 border border-[#13ec25]/30 rounded-lg flex items-start gap-3 animate-fade-in">
          <span class="material-symbols-outlined text-[#13ec25] mt-0.5">verified_user</span>
          <div>
            <p class="text-[#0d1b0f] dark:text-white text-sm font-bold">Password Updated Successfully</p>
            <p class="text-[#4c6a4e] dark:text-[#a0c0a2] text-xs mt-1">You can now use your new credentials to log in to your account.</p>
            <a class="inline-block mt-3 text-xs font-bold text-[#13ec25] hover:underline" href="#">Back to Login</a>
          </div>
        </div>

      </div>
    </main>

    <footer class="p-10 text-center">
      <p class="text-[#4c6a4e] dark:text-[#a0c0a2] text-sm">© 2024 AgroConsult. All rights reserved for sustainable farming.</p>
    </footer>
  </div>
</template>

<style>
/* Import Fonts: Manrope และ Material Icons */
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

/* ตั้งค่า Font Family */
.font-display {
  font-family: 'Manrope', sans-serif;
}

/* ตั้งค่า Material Symbols */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* Animation สำหรับตอนแสดงผลสำเร็จ */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
</style>
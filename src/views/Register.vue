<script setup>
import { reactive, ref } from 'vue';

// --- State Management ---
const form = reactive({
  fullName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreed: false
});

// Eye Toggle State
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// --- Logic ---
const handleRegister = () => {
  if (!form.agreed) {
    alert('กรุณายอมรับเงื่อนไขการใช้งาน (Please agree to Terms & Privacy Policy)');
    return;
  }
  if (form.password !== form.confirmPassword) {
    alert('รหัสผ่านไม่ตรงกัน (Passwords do not match)');
    return;
  }
  console.log('Registering:', form);
  alert(`ลงทะเบียนสำเร็จ! ยินดีต้อนรับคุณ ${form.fullName}`);
};
</script>

<template>
  <div class="h-screen w-full flex bg-[#F9FAF9] font-sans overflow-hidden">
    
    <div class="hidden lg:flex w-[45%] h-full items-center justify-center relative p-6">
      <div class="bg-[#17291F] w-full h-full custom-oval flex flex-col items-center justify-center px-12 relative shadow-2xl overflow-hidden">
        
        <div class="z-10 text-center flex flex-col items-center gap-8 mt-10">
          <div class="flex flex-col items-center gap-4">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-[#1ED730] p-2 rounded-lg">
                <span class="material-symbols-outlined text-[#17291F] text-3xl">agriculture</span>
              </div>
              <span class="text-3xl font-bold text-[#32D63B] font-thai tracking-wide">กิจเกษตร</span>
            </div>
            
            <div class="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 mb-4">
              <span class="text-white/50 text-sm">Logo Illustration Here</span>
            </div>
          </div>

          <h2 class="text-3xl md:text-4xl leading-tight font-bold text-[#32D63B] font-thai text-center drop-shadow-md">
            มั่นใจในทุกการสั่งซื้อ<br>
            กับผลิตภัณฑ์ที่คัดสรรมา<br>
            เพื่อเกษตรกรไทยโดย<br>
            เฉพาะ
          </h2>
        </div>
      </div>
    </div>

    <div class="w-full lg:w-[55%] h-full flex flex-col justify-center items-center px-6 py-8 overflow-y-auto no-scrollbar">
      
      <div class="w-full max-w-[500px]">
        
        <div class="lg:hidden flex items-center gap-2 mb-8">
          <div class="bg-[#1ED730] p-1.5 rounded text-[#17291F]">
            <span class="material-symbols-outlined text-xl">agriculture</span>
          </div>
          <span class="text-xl font-bold text-[#17291F] font-thai">กิจเกษตร</span>
        </div>

        <div class="mb-8">
          <h2 class="text-3xl font-bold text-gray-900">Create Your Account</h2>
          <p class="text-gray-500 text-sm mt-2">Fill in the details below to start your journey with us.</p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label class="text-gray-900 text-xs font-bold mb-2 ml-1">Full Name</label>
              <input 
                v-model="form.fullName"
                required
                class="input-field" 
                placeholder="John Doe" 
                type="text"
              />
            </div>
            <div class="flex flex-col">
              <label class="text-gray-900 text-xs font-bold mb-2 ml-1">Phone Number</label>
              <input 
                v-model="form.phone"
                required
                class="input-field" 
                placeholder="08x-xxx-xxxx" 
                type="tel"
              />
            </div>
          </div>

          <div class="flex flex-col">
            <div class="flex justify-between items-center mb-2 ml-1">
              <label class="text-gray-900 text-xs font-bold">Email Address</label>
              <span class="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Optional</span>
            </div>
            <input 
              v-model="form.email"
              class="input-field" 
              placeholder="email@example.com" 
              type="email"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col relative">
              <label class="text-gray-900 text-xs font-bold mb-2 ml-1">Password</label>
              <div class="relative">
                <input 
                  v-model="form.password"
                  required
                  :type="showPassword ? 'text' : 'password'"
                  class="input-field pr-10" 
                  placeholder="••••••••" 
                />
                <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  <span class="material-symbols-outlined text-[20px] select-none">
                    {{ showPassword ? 'visibility' : 'visibility_off' }}
                  </span>
                </button>
              </div>
            </div>
            <div class="flex flex-col relative">
              <label class="text-gray-900 text-xs font-bold mb-2 ml-1">Confirm Password</label>
              <div class="relative">
                <input 
                  v-model="form.confirmPassword"
                  required
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="input-field pr-10" 
                  placeholder="••••••••" 
                />
                <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  <span class="material-symbols-outlined text-[20px] select-none">
                    {{ showConfirmPassword ? 'visibility' : 'visibility_off' }}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div class="flex items-start gap-3 py-2">
            <input 
              v-model="form.agreed"
              id="terms" 
              type="checkbox" 
              class="mt-1 h-4 w-4 rounded border-gray-300 text-[#1ED730] focus:ring-[#1ED730] cursor-pointer accent-[#1ED730]"
            />
            <label class="text-xs text-gray-500 cursor-pointer leading-relaxed" for="terms">
              I agree to the <a href="#" class="text-[#1ED730] font-bold hover:underline">Terms of Service</a> and <a href="#" class="text-[#1ED730] font-bold hover:underline">Privacy Policy</a>.
            </label>
          </div>

          <button type="submit" class="w-full bg-[#1ED730] hover:bg-[#18c229] text-black font-bold py-4 rounded-lg shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2 group">
            <span>Create Account</span>
            <span class="material-symbols-outlined text-lg font-bold group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>

          <div class="text-center pt-4">
            <p class="text-sm font-medium text-gray-500">
              Already have an account? 
              <a href="#" class="text-[#1ED730] font-bold hover:underline ml-1">Login</a>
            </p>
          </div>
        </form>

        <div class="mt-12 flex justify-center gap-6 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
          <a href="#" class="hover:text-[#1ED730] transition-colors">Privacy</a>
          <a href="#" class="hover:text-[#1ED730] transition-colors">Terms</a>
          <a href="#" class="hover:text-[#1ED730] transition-colors">Cookies</a>
          <a href="#" class="hover:text-[#1ED730] transition-colors">Help</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* 1. Import Fonts & Icons directly here 
     (Allows single-file usage without touching index.html)
*/
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sarabun:wght@400;500;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');

/* 2. Define Font Families */
.font-sans {
  font-family: 'Inter', sans-serif;
}
.font-thai {
  font-family: 'Sarabun', sans-serif;
}
</style>

<style scoped>
/* 3. Helper Classes & Custom Shapes */

/* Reusable Input Style to keep HTML clean */
.input-field {
  @apply w-full rounded-lg border border-gray-200 bg-[#F5F5F5] p-3.5 text-sm outline-none transition-all placeholder:text-gray-400 text-gray-800;
}
.input-field:focus {
  /* Using arbitrary values for focus ring */
  @apply border-[#1ED730] ring-1 ring-[#1ED730];
}

/* Custom Shape */
.custom-oval {
  border-radius: 45%; 
}

/* Hide Scrollbar */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
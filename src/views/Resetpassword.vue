<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// steps: 'verify' → 'reset' → 'success'
const step = ref('verify')

const identifier = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const errorMsg = ref('')
const foundUser = ref(null)

// Step 1: ตรวจสอบอีเมล หรือ เบอร์โทร
const handleVerify = () => {
  errorMsg.value = ''
  if (!identifier.value.trim()) {
    errorMsg.value = 'กรุณากรอกอีเมล หรือ เบอร์โทรศัพท์'
    return
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const user = users.find(u =>
    u.email === identifier.value.trim() || u.phone === identifier.value.trim()
  )

  if (!user) {
    errorMsg.value = 'ไม่พบบัญชีที่ตรงกับข้อมูลนี้'
    return
  }

  foundUser.value = user
  step.value = 'reset'
}

// Step 2: เปลี่ยนรหัสผ่าน
const handleReset = () => {
  errorMsg.value = ''
  if (!newPassword.value) {
    errorMsg.value = 'กรุณากรอกรหัสผ่านใหม่'
    return
  }
  if (newPassword.value.length < 6) {
    errorMsg.value = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    errorMsg.value = 'รหัสผ่านไม่ตรงกัน'
    return
  }

  // อัปเดต password ใน users array
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const updatedUsers = users.map(u => {
    if (u.email === foundUser.value.email) {
      return { ...u, password: newPassword.value }
    }
    return u
  })
  localStorage.setItem('users', JSON.stringify(updatedUsers))

  // ถ้า currentUser เป็นคนเดียวกัน ให้อัปเดตด้วย
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
  if (currentUser.email === foundUser.value.email) {
    localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, password: newPassword.value }))
  }

  step.value = 'success'
}
</script>

<template>
  <div class="h-screen w-full flex overflow-hidden bg-[#f8faf8] font-main">

    <div class="hidden lg:flex w-1/2 h-full items-center justify-center relative p-6">
      <div class="brand-green-dark w-full max-w-[600px] h-[95%] oval-shape flex flex-col justify-center items-center relative shadow-2xl overflow-hidden px-10 text-center space-y-8">
        <div class="flex items-center gap-4">
          <div class="bg-[#32D63B] p-3 rounded-xl text-[#17291F]">
            <span class="material-symbols-outlined text-4xl">agriculture</span>
          </div>
          <h1 class="text-4xl font-bold brand-green-text tracking-wide">กิจเกษตร</h1>
        </div>
        <div class="flex items-center justify-center w-full">
          <img src="/Logo.png" alt="โลโก้กิจเกษตร" class="object-contain max-h-[400px] w-auto drop-shadow-lg" />
        </div>
        <h2 class="text-3xl leading-snug font-bold brand-green-text">
          มั่นใจในทุกการสั่งซื้อ<br>
          ด้วยผลิตภัณฑ์ที่คัดสรรมา<br>
          เพื่อเกษตรกรไทยโดยเฉพาะ
        </h2>
      </div>
    </div>

    <!-- Right Panel -->
    <div class="w-full lg:w-1/2 h-full flex flex-col justify-between items-center px-10 py-12 overflow-y-auto">
      <div class="hidden lg:block"></div>

      <div class="w-full max-w-[620px]">

        <!-- Step Indicator -->
        <div class="flex items-center gap-3 mb-10">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
              :class="step === 'verify' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-600'">
              1
            </div>
            <span class="text-sm font-semibold" :class="step === 'verify' ? 'text-gray-900' : 'text-gray-400'">ยืนยันตัวตน</span>
          </div>
          <div class="flex-1 h-px" :class="step !== 'verify' ? 'bg-green-400' : 'bg-gray-200'"></div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
              :class="step === 'reset' ? 'bg-green-500 text-white' : step === 'success' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'">
              2
            </div>
            <span class="text-sm font-semibold" :class="step === 'reset' ? 'text-gray-900' : 'text-gray-400'">ตั้งรหัสใหม่</span>
          </div>
          <div class="flex-1 h-px" :class="step === 'success' ? 'bg-green-400' : 'bg-gray-200'"></div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
              :class="step === 'success' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'">
              3
            </div>
            <span class="text-sm font-semibold" :class="step === 'success' ? 'text-gray-900' : 'text-gray-400'">เสร็จสิ้น</span>
          </div>
        </div>

        <!-- ─── STEP 1: Verify ─── -->
        <div v-if="step === 'verify'">
          <h2 class="text-4xl font-bold text-gray-900 mb-3">รีเซ็ตรหัสผ่าน</h2>
          <p class="text-gray-600 text-base mb-12 leading-relaxed font-medium">
            กรอกอีเมล หรือ เบอร์โทรที่ใช้สมัครสมาชิก เพื่อยืนยันตัวตน
          </p>

          <!-- Error -->
          <div v-if="errorMsg" class="mb-6 px-5 py-4 bg-red-50 border border-red-200 rounded-xl text-red-600 font-medium text-base flex items-center gap-3">
            <span class="material-symbols-outlined text-xl">error</span>
            {{ errorMsg }}
          </div>

          <form @submit.prevent="handleVerify" class="space-y-8">
            <div>
              <label class="block text-lg font-bold text-gray-900 mb-3">อีเมล หรือ เบอร์โทรศัพท์</label>
              <input
                v-model="identifier"
                type="text"
                placeholder="email@example.com หรือ 08x-xxx-xxxx"
                class="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm placeholder-gray-400 text-lg transition-all"
                :class="{ 'border-red-300': errorMsg }"
              >
            </div>
            <button type="submit"
              class="w-full py-4 rounded-xl bg-green-500 text-black text-xl font-bold hover:bg-green-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              ยืนยันตัวตน
            </button>
          </form>
        </div>

        <!-- ─── STEP 2: Reset Password ─── -->
        <div v-else-if="step === 'reset'">
          <h2 class="text-4xl font-bold text-gray-900 mb-3">ตั้งรหัสผ่านใหม่</h2>
          <p class="text-gray-600 text-base mb-12 leading-relaxed font-medium">
            ตั้งรหัสผ่านใหม่สำหรับบัญชี
            <span class="font-bold text-green-600">{{ foundUser?.email || foundUser?.phone }}</span>
          </p>

          <!-- Error -->
          <div v-if="errorMsg" class="mb-6 px-5 py-4 bg-red-50 border border-red-200 rounded-xl text-red-600 font-medium text-base flex items-center gap-3">
            <span class="material-symbols-outlined text-xl">error</span>
            {{ errorMsg }}
          </div>

          <form @submit.prevent="handleReset" class="space-y-8">
            <div>
              <label class="block text-lg font-bold text-gray-900 mb-3">รหัสผ่านใหม่</label>
              <div class="relative">
                <input
                  v-model="newPassword"
                  :type="showNewPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm placeholder-gray-400 text-lg tracking-widest transition-all"
                  :class="{ 'border-red-300': errorMsg }"
                >
                <button type="button" @click="showNewPassword = !showNewPassword"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center text-green-600 hover:text-green-800 transition-colors">
                  <svg v-if="!showNewPassword" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <label class="block text-lg font-bold text-gray-900 mb-3">ยืนยันรหัสผ่านใหม่</label>
              <div class="relative">
                <input
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm placeholder-gray-400 text-lg tracking-widest transition-all"
                  :class="{ 'border-red-300': errorMsg }"
                >
                <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center text-green-600 hover:text-green-800 transition-colors">
                  <svg v-if="!showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
            </div>

            <button type="submit"
              class="w-full py-4 rounded-xl bg-green-500 text-black text-xl font-bold hover:bg-green-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              อัปเดตรหัสผ่าน
            </button>
          </form>
        </div>

        <!-- ─── STEP 3: Success ─── -->
        <div v-else-if="step === 'success'" class="text-center">
          <div class="flex justify-center mb-8">
            <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <span class="material-symbols-outlined text-green-500 text-5xl">check_circle</span>
            </div>
          </div>
          <h2 class="text-4xl font-bold text-gray-900 mb-4">เปลี่ยนรหัสผ่านสำเร็จ!</h2>
          <p class="text-gray-500 text-lg font-medium mb-12">
            รหัสผ่านของคุณได้รับการอัปเดตเรียบร้อยแล้ว<br>กรุณาเข้าสู่ระบบด้วยรหัสผ่านใหม่
          </p>
          <RouterLink to="/login"
            class="inline-block w-full py-4 rounded-xl bg-green-500 text-black text-xl font-bold hover:bg-green-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-center">
            กลับไปเข้าสู่ระบบ
          </RouterLink>
        </div>

      </div>

      <!-- Footer -->
      <div class="w-full max-w-[620px] mt-16 pb-4">
        <div class="flex justify-between items-center text-base border-t border-gray-200 pt-8">
          <span class="text-gray-500 font-medium">จำรหัสผ่านได้แล้ว?</span>
          <RouterLink to="/login" class="font-bold text-green-600 hover:text-green-700 hover:underline text-lg">
            เข้าสู่ระบบ
          </RouterLink>
        </div>
        <div class="mt-10 flex justify-between text-xs text-gray-400 uppercase tracking-wider font-bold">
          <a href="#" class="hover:text-gray-900 transition-colors">นโยบายความเป็นส่วนตัว</a>
          <a href="#" class="hover:text-gray-900 transition-colors">เงื่อนไขการใช้งาน</a>
          <a href="#" class="hover:text-gray-900 transition-colors">ศูนย์ช่วยเหลือ</a>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sarabun:wght@400;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');

.font-main { font-family: 'Inter', 'Sarabun', sans-serif; }
.brand-green-dark { background-color: #17291F; }
.brand-green-text { color: #32D63B; }
.oval-shape { border-radius: 50% / 45%; }
::-webkit-scrollbar { width: 0px; background: transparent; }
</style>
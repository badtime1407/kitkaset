<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loginInput = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const errorMsg = ref('')

const handleLogin = () => {
  errorMsg.value = ''

  if (!loginInput.value.trim()) {
    errorMsg.value = 'กรุณากรอกอีเมล หรือ เบอร์โทรศัพท์'
    return
  }
  if (!password.value) {
    errorMsg.value = 'กรุณากรอกรหัสผ่าน'
    return
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]")

  // หา user จากอีเมล หรือ เบอร์โทร
  const user = users.find(u =>
    (u.email === loginInput.value.trim() || u.phone === loginInput.value.trim()) &&
    u.password === password.value
  )

  if (!user) {
    errorMsg.value = 'อีเมล/เบอร์โทร หรือ รหัสผ่านไม่ถูกต้อง'
    return
  }

  // บันทึก session ว่า login แล้ว
  localStorage.setItem("currentUser", JSON.stringify(user))

  // ถ้าติ๊ก "จดจำการเข้าสู่ระบบ" ให้เก็บ loginInput ไว้
  if (rememberMe.value) {
    localStorage.setItem("rememberedLogin", loginInput.value)
  } else {
    localStorage.removeItem("rememberedLogin")
  }

  router.push("/Home")
}

// โหลด remembered login ถ้ามี
const remembered = localStorage.getItem("rememberedLogin")
if (remembered) {
  loginInput.value = remembered
  rememberMe.value = true
}
</script>

<template>
  <div class="h-screen w-full flex overflow-hidden bg-[#f8faf8] font-main">

    <!-- Left Panel -->
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
        <h2 class="text-4xl font-bold text-gray-900 mb-3">เข้าสู่ระบบบัญชีของคุณ</h2>
        <p class="text-gray-600 text-base mb-12 leading-relaxed font-medium">
          ยินดีต้อนรับกลับมา! กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบและจัดการการเกษตรของคุณ
        </p>

        <!-- Error Message -->
        <div v-if="errorMsg" class="mb-6 px-5 py-4 bg-red-50 border border-red-200 rounded-xl text-red-600 font-medium text-base flex items-center gap-3">
          <span class="material-symbols-outlined text-xl">error</span>
          {{ errorMsg }}
        </div>

        <form @submit.prevent="handleLogin" class="space-y-8">

          <div>
            <label class="block text-lg font-bold text-gray-900 mb-3">อีเมล หรือ เบอร์โทรศัพท์</label>
            <input
              v-model="loginInput"
              type="text"
              placeholder="email@example.com หรือ 08x-xxx-xxxx"
              class="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm placeholder-gray-400 text-lg transition-all"
              :class="{ 'border-red-300 focus:ring-red-400': errorMsg }"
            >
          </div>

          <div>
            <label class="block text-lg font-bold text-gray-900 mb-3">รหัสผ่าน</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm placeholder-gray-400 text-lg tracking-widest transition-all"
                :class="{ 'border-red-300 focus:ring-red-400': errorMsg }"
              >
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-green-600 hover:text-green-800 focus:outline-none transition-colors"
              >
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between text-base mt-2 font-medium">
            <div class="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                v-model="rememberMe"
                class="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
              >
              <label for="remember-me" class="ml-3 block text-gray-600 cursor-pointer select-none">จดจำการเข้าสู่ระบบ</label>
            </div>
            <RouterLink to="/Resetpassword" class="font-bold text-gray-400 hover:text-green-600 transition-colors">
              ลืมรหัสผ่าน?
            </RouterLink>
          </div>

          <!-- เปลี่ยนจาก RouterLink เป็น button type submit -->
          <button
            type="submit"
            class="w-full py-4 rounded-xl bg-green-500 text-black text-xl font-bold hover:bg-green-600 transition-all mt-8 text-center shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            เข้าสู่ระบบ
          </button>

        </form>
      </div>

      <div class="w-full max-w-[620px] mt-16 pb-4">
        <div class="flex justify-between items-center text-base border-t border-gray-200 pt-8">
          <span class="text-gray-500 font-medium">ยังไม่มีบัญชีใช่ไหม?</span>
          <RouterLink to="/register" class="font-bold text-green-600 hover:text-green-700 hover:underline text-lg">
            สมัครสมาชิก
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
.font-main { font-family: 'Inter', 'Sarabun', sans-serif; }
.brand-green-dark { background-color: #17291F; }
.brand-green-text { color: #32D63B; }
.oval-shape { border-radius: 50% / 45%; }
::-webkit-scrollbar { width: 0px; background: transparent; }
</style>
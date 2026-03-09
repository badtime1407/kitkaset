<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router"

const router = useRouter()

const form = ref({
  fullName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false
})

const handleRegister = () => {
  if (!form.value.fullName.trim()) {
    alert("กรุณากรอกชื่อ-นามสกุล")
    return
  }
  if (!form.value.phone.trim()) {
    alert("กรุณากรอกเบอร์โทรศัพท์")
    return
  }
  if (!/^0[0-9]{9}$/.test(form.value.phone)) {
    alert("เบอร์โทรศัพท์ต้องมี 10 หลัก และขึ้นต้นด้วย 0")
    return
  }
  if (!form.value.email.trim()) {
    alert("กรุณากรอกอีเมล")
    return
  }
  if (!form.value.password) {
    alert("กรุณากรอกรหัสผ่าน")
    return
  }
  if (form.value.password.length < 6) {
    alert("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร")
    return
  }
  if (form.value.password !== form.value.confirmPassword) {
    alert("รหัสผ่านไม่ตรงกัน!")
    return
  }
  if (!form.value.agreeToTerms) {
    alert("กรุณายอมรับเงื่อนไขการใช้งาน")
    return
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]")

  // เช็คอีเมลซ้ำ
  const emailExists = users.find(u => u.email === form.value.email)
  if (emailExists) {
    alert("อีเมลนี้ถูกใช้งานแล้ว กรุณาใช้อีเมลอื่น")
    return
  }

  // เช็คเบอร์โทรซ้ำ
  const phoneExists = users.find(u => u.phone === form.value.phone)
  if (phoneExists) {
    alert("เบอร์โทรศัพท์นี้ถูกใช้งานแล้ว")
    return
  }

  users.push({
    fullName: form.value.fullName,
    phone: form.value.phone,
    email: form.value.email,
    password: form.value.password
  })

  localStorage.setItem("users", JSON.stringify(users))

  alert("สมัครสมาชิกสำเร็จ!")
  router.push("/login")
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
          <img src="/Logo.png" alt="Agri Chem Graphic" class="object-contain max-h-[400px] w-auto drop-shadow-lg" />
        </div>
        <h2 class="text-3xl leading-snug font-bold brand-green-text">
          มั่นใจในทุกการสั่งซื้อ<br>
          กับผลิตภัณฑ์ที่คัดสรรมา<br>
          เพื่อเกษตรกรไทยโดยเฉพาะ
        </h2>
      </div>
    </div>

    <!-- Right Panel -->
    <div class="w-full lg:w-1/2 h-full flex flex-col justify-center items-center px-8 py-8 overflow-y-auto">
      <div class="w-full max-w-[620px] py-4">
        <h2 class="text-4xl font-bold text-gray-900 mb-3">สร้างบัญชีของคุณ</h2>
        <p class="text-gray-500 text-base mb-8 leading-relaxed font-medium">
          กรอกข้อมูลด้านล่างเพื่อเริ่มต้นใช้งานกับเรา
        </p>

        <form @submit.prevent="handleRegister" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-bold text-gray-900 mb-2">ชื่อ-นามสกุล</label>
              <input
                v-model="form.fullName"
                type="text"
                placeholder="สมชาย ใจดี"
                class="w-full px-6 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm placeholder-gray-400 text-base transition-all"
              >
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-900 mb-2">เบอร์โทรศัพท์</label>
              <input
                v-model="form.phone"
                type="tel"
                placeholder="08x-xxx-xxxx"
                class="w-full px-6 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm placeholder-gray-400 text-base transition-all"
              >
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="block text-sm font-bold text-gray-900">อีเมล</label>
              <span class="text-xs text-gray-400 font-medium">จำเป็น</span>
            </div>
            <input
              v-model="form.email"
              type="email"
              placeholder="email@example.com"
              class="w-full px-6 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm placeholder-gray-400 text-base transition-all"
            >
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-bold text-gray-900 mb-2">รหัสผ่าน</label>
              <input
                v-model="form.password"
                type="password"
                placeholder="••••••••"
                class="w-full px-6 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm placeholder-gray-400 text-base tracking-widest transition-all"
              >
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-900 mb-2">ยืนยันรหัสผ่าน</label>
              <input
                v-model="form.confirmPassword"
                type="password"
                placeholder="••••••••"
                class="w-full px-6 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm placeholder-gray-400 text-base tracking-widest transition-all"
              >
            </div>
          </div>

          <div class="flex items-start mt-2">
            <div class="flex items-center h-5">
              <input
                id="terms"
                v-model="form.agreeToTerms"
                type="checkbox"
                class="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
              >
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="font-medium text-gray-600 select-none">
                ฉันยอมรับ <a href="#" class="text-green-600 hover:underline font-bold">เงื่อนไขการใช้งาน</a> และ <a href="#" class="text-green-600 hover:underline font-bold">นโยบายความเป็นส่วนตัว</a>.
              </label>
            </div>
          </div>

          <button
            type="submit"
            class="w-full py-4 rounded-xl bg-[#14E532] text-black text-lg font-bold hover:bg-green-500 transition-all mt-4 text-center shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            สมัครสมาชิก
          </button>
        </form>

        <div class="mt-12 text-center">
          <p class="text-gray-500 font-medium">
            มีบัญชีอยู่แล้ว?
            <RouterLink to="/login" class="text-green-600 font-bold hover:underline ml-1">เข้าสู่ระบบ</RouterLink>
          </p>
        </div>

        <div class="mt-16 flex justify-center gap-8 text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider font-bold">
          <a href="#" class="hover:text-gray-900 transition-colors">นโยบาย</a>
          <a href="#" class="hover:text-gray-900 transition-colors">นโยบาย</a>
          <a href="#" class="hover:text-gray-900 transition-colors">คุกกี้</a>
          <a href="#" class="hover:text-gray-900 transition-colors">ช่วยเหลือ</a>
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
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'

const route = useRoute()

/* Password */
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const passwordError = ref('')
const passwordSuccess = ref('')

/* Show/Hide password */
const showCurrent = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)

/* 2FA */
const twoFA = ref(false)

/* Notification */
const orderUpdate = ref(true)
const expertAdvice = ref(true)
const marketAlert = ref(true)
const newsletter = ref(true)

/* เปลี่ยนรหัสผ่าน */
const updatePassword = () => {
  passwordError.value = ''
  passwordSuccess.value = ''

  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    passwordError.value = 'กรุณากรอกข้อมูลให้ครบทุกช่อง'
    return
  }

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')

  if (currentPassword.value !== currentUser.password) {
    passwordError.value = 'รหัสผ่านปัจจุบันไม่ถูกต้อง'
    return
  }

  if (newPassword.value.length < 6) {
    passwordError.value = 'รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร'
    return
  }

  if (newPassword.value === currentPassword.value) {
    passwordError.value = 'รหัสผ่านใหม่ต้องไม่ซ้ำกับรหัสผ่านเดิม'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    passwordError.value = 'รหัสผ่านใหม่ไม่ตรงกัน'
    return
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const updatedUsers = users.map(u =>
    u.email === currentUser.email ? { ...u, password: newPassword.value } : u
  )
  localStorage.setItem('users', JSON.stringify(updatedUsers))

  const updatedUser = { ...currentUser, password: newPassword.value }
  localStorage.setItem('currentUser', JSON.stringify(updatedUser))

  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  showCurrent.value = false
  showNew.value = false
  showConfirm.value = false

  passwordSuccess.value = 'เปลี่ยนรหัสผ่านสำเร็จแล้ว!'
}

/* บันทึก notification */
const saveAll = () => {
  const settings = {
    orderUpdate: orderUpdate.value,
    expertAdvice: expertAdvice.value,
    marketAlert: marketAlert.value,
    newsletter: newsletter.value
  }
  localStorage.setItem('notificationSettings', JSON.stringify(settings))
  alert('บันทึกการตั้งค่าเรียบร้อย')
}

const discard = () => {
  const saved = JSON.parse(localStorage.getItem('notificationSettings') || 'null')
  if (saved) {
    orderUpdate.value = saved.orderUpdate
    expertAdvice.value = saved.expertAdvice
    marketAlert.value = saved.marketAlert
    newsletter.value = saved.newsletter
  } else {
    orderUpdate.value = true
    expertAdvice.value = true
    marketAlert.value = true
    newsletter.value = true
  }
}

const savedSettings = JSON.parse(localStorage.getItem('notificationSettings') || 'null')
if (savedSettings) {
  orderUpdate.value = savedSettings.orderUpdate
  expertAdvice.value = savedSettings.expertAdvice
  marketAlert.value = savedSettings.marketAlert
  newsletter.value = savedSettings.newsletter
}
</script>

<template>
  <div class="flex min-h-screen w-full bg-[#F8F9F8] font-sans">

    <Sidebar />

    <main class="flex-1 p-8 lg:p-14 xl:p-20 overflow-y-auto">
      <div class="max-w-[1200px] mx-auto">

        <!-- Header -->
        <div class="mb-14">
          <h2 class="text-[#1A3128] text-5xl font-extrabold mb-4">ความปลอดภัยและการเข้าสู่ระบบ</h2>
          <div class="flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-[#00D632]"></span>
            <p class="text-gray-400 text-lg font-medium">จัดการรหัสผ่านและการแจ้งเตือนของคุณ</p>
          </div>
        </div>

        <div class="bg-white rounded-[48px] shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-gray-100/50 overflow-hidden">
          <div class="p-12 lg:p-20 space-y-20">

            <!-- Password Section -->
            <div>
              <h3 class="section-title">เปลี่ยนรหัสผ่าน</h3>

              <!-- Error -->
              <div v-if="passwordError" class="mt-6 px-5 py-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 font-medium flex items-center gap-3">
                <span class="material-symbols-outlined text-xl">error</span>
                {{ passwordError }}
              </div>

              <!-- Success -->
              <div v-if="passwordSuccess" class="mt-6 px-5 py-4 bg-[#EBF9F1] border border-[#00D632]/30 rounded-2xl text-[#1A3128] font-medium flex items-center gap-3">
                <span class="material-symbols-outlined text-xl text-[#00D632]">check_circle</span>
                {{ passwordSuccess }}
              </div>

              <div class="grid md:grid-cols-2 gap-8 mt-8">

                <!-- รหัสผ่านปัจจุบัน -->
                <div class="col-span-2">
                  <label class="label">รหัสผ่านปัจจุบัน</label>
                  <div class="relative mt-3">
                    <input
                      :type="showCurrent ? 'text' : 'password'"
                      v-model="currentPassword"
                      class="input pr-14"
                      placeholder="••••••••"
                    />
                    <button type="button" @click="showCurrent = !showCurrent"
                      class="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-[#00D632] transition-colors">
                      <svg v-if="!showCurrent" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- รหัสผ่านใหม่ -->
                <div>
                  <label class="label">รหัสผ่านใหม่</label>
                  <div class="relative mt-3">
                    <input
                      :type="showNew ? 'text' : 'password'"
                      v-model="newPassword"
                      class="input pr-14"
                      placeholder="••••••••"
                    />
                    <button type="button" @click="showNew = !showNew"
                      class="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-[#00D632] transition-colors">
                      <svg v-if="!showNew" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- ยืนยันรหัสผ่านใหม่ -->
                <div>
                  <label class="label">ยืนยันรหัสผ่านใหม่</label>
                  <div class="relative mt-3">
                    <input
                      :type="showConfirm ? 'text' : 'password'"
                      v-model="confirmPassword"
                      class="input pr-14"
                      placeholder="••••••••"
                    />
                    <button type="button" @click="showConfirm = !showConfirm"
                      class="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-[#00D632] transition-colors">
                      <svg v-if="!showConfirm" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    </button>
                  </div>
                </div>

              </div>

              <div class="text-right mt-8">
                <button @click="updatePassword" class="btn-main">อัปเดตรหัสผ่าน</button>
              </div>
            </div>

            <!-- 2FA -->
            <div class="flex justify-between items-center bg-[#F4F7F5] p-8 rounded-3xl">
              <div class="flex gap-5 items-center">
                <div class="bg-[#EBF9F1] p-4 rounded-2xl text-[#00D632]">
                  <span class="material-symbols-outlined">verified_user</span>
                </div>
                <div>
                  <p class="font-black text-lg">การยืนยันตัวตนสองขั้นตอน (2FA)</p>
                  <p class="text-gray-400">เพิ่มความปลอดภัยให้กับบัญชีของคุณ</p>
                </div>
              </div>
              <button @click="twoFA = !twoFA" class="btn-outline">
                {{ twoFA ? 'ปิดใช้งาน' : 'เปิดใช้งาน' }}
              </button>
            </div>

            <!-- Notification -->
            <div>
              <h3 class="section-title mb-8">การแจ้งเตือน</h3>
              <div class="grid md:grid-cols-2 gap-8">
                <div class="notify">
                  <div>
                    <p class="font-bold">การอัปเดตคำสั่งซื้อ</p>
                    <p class="desc">แจ้งเตือนสถานะคำสั่งซื้อ</p>
                  </div>
                  <input type="checkbox" v-model="orderUpdate" class="toggle">
                </div>
                <div class="notify">
                  <div>
                    <p class="font-bold">คำแนะนำจากผู้เชี่ยวชาญ</p>
                    <p class="desc">รับคำแนะนำเกี่ยวกับการเกษตร</p>
                  </div>
                  <input type="checkbox" v-model="expertAdvice" class="toggle">
                </div>
                <div class="notify">
                  <div>
                    <p class="font-bold">แจ้งเตือนราคาตลาด</p>
                    <p class="desc">รับข้อมูลราคาตลาดล่าสุด</p>
                  </div>
                  <input type="checkbox" v-model="marketAlert" class="toggle">
                </div>
                <div class="notify">
                  <div>
                    <p class="font-bold">จดหมายข่าว</p>
                    <p class="desc">ข่าวสารและบทความด้านเกษตร</p>
                  </div>
                  <input type="checkbox" v-model="newsletter" class="toggle">
                </div>
              </div>
            </div>

            <!-- Action -->
            <div class="flex flex-col sm:flex-row justify-end items-center gap-10 pt-12 border-t border-gray-100">
              <button @click="discard" class="text-lg font-bold text-gray-400 hover:text-gray-600 transition-colors">ยกเลิก</button>
              <button @click="saveAll" class="btn-main px-20 py-5 text-lg">บันทึกการเปลี่ยนแปลง</button>
            </div>

          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.label { font-weight: 800; letter-spacing: 0.05em; color: #1A3128; }

.input {
  width: 100%;
  height: 60px;
  border-radius: 20px;
  background: #F4F7F5;
  padding: 0 24px;
  font-weight: 600;
  outline: none;
  border: 2px solid transparent;
  transition: all 0.2s;
}
.input:focus { background: white; border-color: rgba(0, 214, 50, 0.3); }

.section-title { font-size: 26px; font-weight: 900; color: #1A3128; }

.btn-main {
  background: #00D632;
  color: white;
  font-weight: 800;
  border-radius: 24px;
  padding: 14px 40px;
  box-shadow: 0 10px 25px rgba(0,214,50,0.25);
  transition: all 0.2s;
}
.btn-main:hover { transform: translateY(-2px); filter: brightness(1.05); }

.btn-outline {
  border: 2px solid #00D632;
  color: #00D632;
  font-weight: 700;
  border-radius: 20px;
  padding: 10px 28px;
  transition: all 0.2s;
}
.btn-outline:hover { background: #EBF9F1; }

.notify {
  background: #F4F7F5;
  padding: 24px;
  border-radius: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.desc { font-size: 14px; color: #9ca3af; }
</style>
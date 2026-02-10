<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

/* Menu */
const navigationItems = [
  { name: 'My Profile', icon: 'person', path: '/profile' },
  { name: 'Address Book', icon: 'location_on', path: '/Address' },
  { name: 'Order History', icon: 'inventory_2', path: '/Order' },
  { name: 'Account Settings', icon: 'settings', path: '/Setting' },
]

const isActive = (path) => route.path === path

/* Password */
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

/* 2FA */
const twoFA = ref(false)

/* Notification */
const orderUpdate = ref(true)
const expertAdvice = ref(true)
const marketAlert = ref(true)
const newsletter = ref(true)

/* Functions */
const updatePassword = () => {
  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    alert('กรุณากรอกข้อมูลให้ครบ')
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    alert('รหัสผ่านไม่ตรงกัน')
    return
  }

  alert('เปลี่ยนรหัสผ่านสำเร็จ (demo)')
}

const saveAll = () => {
  alert('บันทึกเรียบร้อย (demo)')
}

const discard = () => {
  orderUpdate.value = true
  expertAdvice.value = true
  marketAlert.value = true
  newsletter.value = true

  alert('ยกเลิกการเปลี่ยนแปลง')
}
</script>

<template>
  <div class="flex min-h-screen w-full bg-[#F8F9F8] font-sans">

    <!-- Sidebar -->
    <aside class="w-64 bg-white hidden lg:flex flex-col border-r border-gray-100 sticky top-0 h-screen">

      <div class="p-6 flex flex-col h-full">

        <!-- Logo -->
        <router-link
          to="/"
          class="flex items-center gap-3 mb-10 px-2 no-underline"
        >
          <div class="bg-[#00D632] p-2 rounded-xl">
            <span class="material-symbols-outlined text-white">
              agriculture
            </span>
          </div>

          <div>
            <h1 class="text-[#1A3128] font-extrabold">
              กิจเกษตร
            </h1>
            <p class="text-[#00D632] text-[9px] font-black uppercase">
              Consultant
            </p>
          </div>
        </router-link>

        <!-- Menu -->
        <nav class="flex flex-col gap-1.5 grow">

          <router-link
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.path"
            :class="[
              'flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm no-underline transition-all',
              isActive(item.path)
                ? 'bg-[#EBF9F1] text-[#00D632]'
                : 'text-gray-400 hover:bg-gray-50'
            ]"
          >
            <span class="material-symbols-outlined">
              {{ item.icon }}
            </span>

            {{ item.name }}

          </router-link>

        </nav>

        <!-- Logout -->
        <router-link
          to="/Login"
          class="flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-50 rounded-2xl font-bold text-sm no-underline"
        >
          <span class="material-symbols-outlined">logout</span>
          Logout
        </router-link>

      </div>

    </aside>


    <!-- Main -->
    <main class="flex-1 p-8 lg:p-14 xl:p-20 overflow-y-auto">

      <div class="max-w-[1200px] mx-auto">

        <!-- Header -->
        <div class="mb-14">

          <h2 class="text-[#1A3128] text-5xl font-extrabold mb-4">
            ความปลอดภัยและการเข้าสู่ระบบ
          </h2>

          <div class="flex items-center gap-3">

            <span class="w-2 h-2 rounded-full bg-[#00D632]"></span>

            <p class="text-gray-400 text-lg font-medium">
              จัดการรหัสผ่านและการแจ้งเตือนของคุณ
            </p>

          </div>

        </div>


        <!-- Card -->
        <div
          class="bg-white rounded-[48px] shadow-[0_20px_60px_rgba(0,0,0,0.03)]
                 border border-gray-100/50 overflow-hidden"
        >

          <div class="p-12 lg:p-20 space-y-20">


            <!-- Password -->
            <div>

              <h3 class="section-title">
                Change Password
              </h3>

              <div class="grid md:grid-cols-2 gap-8 mt-8">

                <div class="col-span-2">
                  <label class="label">
                    Current Password
                  </label>

                  <input
                    type="password"
                    v-model="currentPassword"
                    class="input"
                  >
                </div>

                <div>
                  <label class="label">
                    New Password
                  </label>

                  <input
                    type="password"
                    v-model="newPassword"
                    class="input"
                  >
                </div>

                <div>
                  <label class="label">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    v-model="confirmPassword"
                    class="input"
                  >
                </div>

              </div>


              <div class="text-right mt-8">

                <button
                  @click="updatePassword"
                  class="btn-main"
                >
                  Update Password
                </button>

              </div>

            </div>


            <!-- 2FA -->
            <div class="flex justify-between items-center bg-[#F4F7F5] p-8 rounded-3xl">

              <div class="flex gap-5 items-center">

                <div class="bg-[#EBF9F1] p-4 rounded-2xl text-[#00D632]">
                  <span class="material-symbols-outlined">
                    verified_user
                  </span>
                </div>

                <div>

                  <p class="font-black text-lg">
                    Two-Factor Authentication
                  </p>

                  <p class="text-gray-400">
                    ยืนยันตัวตน 2 ขั้นตอน
                  </p>

                </div>

              </div>


              <button
                @click="twoFA = !twoFA"
                class="btn-outline"
              >
                {{ twoFA ? 'Disable' : 'Enable' }}
              </button>

            </div>


            <!-- Notification -->
            <div>

              <h3 class="section-title mb-8">
                การแจ้งเตือน
              </h3>


              <div class="grid md:grid-cols-2 gap-8">


                <div class="notify">

                  <div>
                    <p class="font-bold">
                      Order Updates
                    </p>

                    <p class="desc">
                      แจ้งสถานะคำสั่งซื้อ
                    </p>
                  </div>

                  <input type="checkbox" v-model="orderUpdate" class="toggle">

                </div>


                <div class="notify">

                  <div>
                    <p class="font-bold">
                      Expert Advice
                    </p>

                    <p class="desc">
                      คำแนะนำจากผู้เชี่ยวชาญ
                    </p>
                  </div>

                  <input type="checkbox" v-model="expertAdvice" class="toggle">

                </div>


                <div class="notify">

                  <div>
                    <p class="font-bold">
                      Market Alert
                    </p>

                    <p class="desc">
                      เตือนราคาตลาด
                    </p>
                  </div>

                  <input type="checkbox" v-model="marketAlert" class="toggle">

                </div>


                <div class="notify">

                  <div>
                    <p class="font-bold">
                      Newsletter
                    </p>

                    <p class="desc">
                      ข่าวสารเกษตร
                    </p>
                  </div>

                  <input type="checkbox" v-model="newsletter" class="toggle">

                </div>


              </div>

            </div>


            <!-- Action -->
            <div
              class="flex flex-col sm:flex-row justify-end items-center gap-10
                     pt-12 border-t border-gray-100"
            >

              <button
                @click="discard"
                class="text-lg font-bold text-gray-400 hover:text-gray-600"
              >
                Cancel
              </button>


              <button
                @click="saveAll"
                class="btn-main px-20 py-5 text-lg"
              >
                Save Changes
              </button>

            </div>


          </div>

        </div>

      </div>

    </main>

  </div>
</template>

<style scoped>
.label {
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #1A3128;
}

.input {
  width: 100%;
  height: 60px;
  border-radius: 20px;
  background: #F4F7F5;
  padding: 0 24px;
  font-weight: 600;
  outline: none;
  border: 2px solid transparent;
}

.input:focus {
  background: white;
  border-color: rgba(0, 214, 50, 0.3);
}

.section-title {
  font-size: 26px;
  font-weight: 900;
  color: #1A3128;
}

.btn-main {
  background: #00D632;
  color: white;
  font-weight: 800;
  border-radius: 24px;
  padding: 14px 40px;
  box-shadow: 0 10px 25px rgba(0,214,50,0.25);
  transition: all 0.2s;
}

.btn-main:hover {
  transform: translateY(-2px);
  filter: brightness(1.05);
}

.btn-outline {
  border: 2px solid #00D632;
  color: #00D632;
  font-weight: 700;
  border-radius: 20px;
  padding: 10px 28px;
}

.notify {
  background: #F4F7F5;
  padding: 24px;
  border-radius: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.desc {
  font-size: 14px;
  color: #9ca3af;
}
</style>

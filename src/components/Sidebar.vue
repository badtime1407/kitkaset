<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const navigationItems = [
  { name: 'โปรไฟล์', icon: 'person', path: '/profile' },
  { name: 'ที่อยู่จัดส่ง', icon: 'location_on', path: '/Address' },
  { name: 'ประวัติการสั่งซื้อ', icon: 'inventory_2', path: '/Order' },
  { name: 'ตั้งค่า', icon: 'settings', path: '/Setting' },
]

const isActive = (path) => route.path === path
</script>

<template>
  <aside class="w-64 bg-white hidden lg:flex flex-col border-r border-gray-100 sticky top-0 h-screen">
    <div class="p-6 flex flex-col h-full">
      
      <router-link to="/" class="flex items-center gap-3 shrink-0 cursor-pointer group mb-6">
            <div class="text-[#010101] size-9 transition-transform group-hover:rotate-12">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876
                    26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522
                    C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002
                    C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261
                    L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467
                    28.1133 40.548C30.3042 39.2016 32.6927 37.3073
                    35 35C37.3073 32.6927 39.2016 30.3042
                    40.548 28.1133C42.7467 24.5355
                    43.4845 21.4845 42.1739 20.1739Z"
                    fill="currentColor"
                />
                </svg>
            </div>

        <h2 class="text-xl font-black text-black">กิจเกษตร</h2>
        </router-link>

      <nav class="flex flex-col gap-1.5 grow">
        <router-link 
          v-for="item in navigationItems" 
          :key="item.name" 
          :to="item.path"
          :class="[
            'flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm no-underline',
            isActive(item.path)
              ? 'bg-[#EBF9F1] text-[#00D632]'
              : 'text-gray-400 hover:bg-gray-50'
          ]"
        >
          <span class="material-symbols-outlined text-[22px]">{{ item.icon }}</span>
          <span>{{ item.name }}</span>
        </router-link>
      </nav>

      <div class="pt-4 border-t border-gray-50">
        <router-link 
          to="/Login" 
          class="flex items-center gap-3.5 px-4 py-3.5 text-rose-500 hover:bg-rose-50 rounded-2xl transition-all font-bold text-sm no-underline"
        >
          <span class="material-symbols-outlined text-[22px]">logout</span>
          <span>ออกจากระบบ</span>
        </router-link>
      </div>
    </div>
  </aside>
</template>

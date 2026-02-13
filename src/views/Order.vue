<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'

const route = useRoute()

// ข้อมูลเมนูนำทาง
const navigationItems = [
  { name: 'My Profile', icon: 'person', path: '/profile' },
  { name: 'Address Book', icon: '', path: '/Address' }, 
  { name: 'Order History', icon: 'inventory_2', path: '/Order' },
  { name: 'Account Settings', icon: '', path: '/Setting' },
]

// เช็ก Active Menu จาก route path จริง
const isActive = (path) => route.path === path 

// ข้อมูลประวัติการสั่งซื้อ
const orders = ref([
  {
    id: '#AG-90210',
    date: 'Oct 24, 2023',
    items: 'NPK Fertilizer (x10), Urea (x5)',
    price: '฿1,240.00',
    status: 'Completed',
    statusClass: 'bg-[#EBF9F1] text-[#00D632]'
  },
  {
    id: '#AG-88432',
    date: 'Oct 18, 2023',
    items: 'Roundup Herbicide (x2)',
    price: '฿450.00',
    status: 'Shipped',
    statusClass: 'bg-[#E8F2FF] text-[#4285F4]'
  }
])
</script>

<template>
  <div class="flex min-h-screen w-full bg-[#F8F9F8] font-sans">
    
    <Sidebar />

    <main class="flex-1 p-10 lg:p-16 overflow-y-auto">
      <div class="max-w-[1100px] mx-auto">
        
        <h2 class="text-[#1A3128] text-4xl font-extrabold mb-12">ประวัติการสั่งซื้อ</h2>

        <div class="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden mb-10">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="text-gray-400 text-[11px] uppercase tracking-wider border-b border-gray-50">
                <th class="px-8 py-6 font-bold">รหัสสั่งซื้อ</th>
                <th class="px-6 py-6 font-bold">วันที่</th>
                <th class="px-6 py-6 font-bold">สินค้า</th>
                <th class="px-6 py-6 font-bold">ราคาสินค้า</th>
                <th class="px-6 py-6 font-bold">สถานะ</th>
                <th class="px-8 py-6 font-bold text-right">การดำเนินการ</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50/50 transition-colors">
                <td class="px-8 py-7 font-extrabold text-[#1A3128] text-sm">{{ order.id }}</td>
                <td class="px-6 py-7 text-gray-500 text-sm font-medium">{{ order.date }}</td>
                <td class="px-6 py-7 text-gray-500 text-sm font-medium">{{ order.items }}</td>
                <td class="px-6 py-7 font-black text-[#1A3128] text-sm">{{ order.price }}</td>
                <td class="px-6 py-7">
                  <span :class="['px-4 py-1.5 rounded-full text-[10px] font-black flex items-center w-fit gap-1.5', order.statusClass]">
                    <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-8 py-7 text-right">
                  <div class="flex items-center justify-end gap-6">
                    <button v-if="order.status === 'Shipped'" class="text-xs font-bold text-gray-500 hover:text-[#1A3128] bg-transparent border-none cursor-pointer">Track Order</button>
                    <button class="text-xs font-bold text-gray-500 hover:text-[#1A3128] bg-transparent border-none cursor-pointer">
                      {{ order.status === 'Completed' ? 'View Details' : 'Details' }}
                    </button>
                    <button v-if="order.status === 'Completed'" class="bg-[#00D632] text-white px-5 py-2 rounded-xl text-xs font-black hover:shadow-lg transition-all border-none cursor-pointer">
                      Re-order
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-[#EBF9F1] rounded-3xl p-6 flex items-center gap-5 border border-[#00D632]/10">
          <div class="bg-[#00D632] w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-200">
            <span class="material-symbols-outlined text-2xl">help</span>
          </div>
          <div>
            <h4 class="text-[#1A3128] font-bold text-sm">ต้องการคำแนะนำจากผู้เชี่ยวชาญสำหรับการปลูกข้าวของคุณหรือไม่?</h4>
            <p class="text-gray-500 text-xs mt-0.5">นัดหมายคุยกับที่ปรึกษาฟรี 15 นาที เพื่อประสิทธิภาพในการเกษตรที่ดีกว่า</p>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');

/* ลบเส้นใต้จากลิงก์ */
.no-underline {
  text-decoration: none !important;
}

:deep(body) {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>
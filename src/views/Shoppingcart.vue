<template>
  <div class="min-h-screen bg-white font-display text-[#0d1b0f]">
    <Navbar2 />

    <main class="max-w-6xl mx-auto px-4 py-8">
      <div class="mb-10">
        <h1 class="text-4xl font-bold mb-2">ตะกร้าสินค้าของคุณ</h1>
        <p class="text-[#4c9a52]">คุณมีสินค้า {{ cart.items.length }} รายการในตะกร้าพร้อมจัดส่งถึงฟาร์มแล้ว</p>
      </div>

      <div v-if="cart.items.length === 0" class="bg-gray-50 rounded-[2rem] p-20 text-center border border-[#cfe7d1]">
         <span class="material-symbols-outlined text-5xl text-gray-200 mb-4">inventory_2</span>
         <p class="text-gray-400 text-lg font-medium">ไม่มีสินค้าในตะกร้าแล้ว</p>
         <button @click="$router.push('/Productall')" class="mt-4 text-[#13ec25] font-bold hover:underline">กลับไปเลือกซื้อสินค้า</button>
      </div>

      <div v-else class="flex flex-col lg:flex-row gap-8 items-start">
        <div class="flex-[2.5] w-full">
          <div class="bg-white rounded-[2rem] shadow-sm border border-[#cfe7d1] overflow-hidden">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="text-xs font-bold text-gray-800 uppercase bg-[#f0f7f0]">
                  <th class="px-8 py-6">Product</th>
                  <th class="px-4 py-6 text-center">Price</th>
                  <th class="px-4 py-6 text-center">Quantity</th>
                  <th class="px-8 py-6 text-right">Total</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#cfe7d1]">
                <tr v-for="item in cart.items" :key="item.id">
                  <td class="px-8 py-6">
                    <div class="flex items-center gap-4">
                      <div class="size-16 bg-gray-100 rounded-full overflow-hidden border border-[#cfe7d1]">
                        <img :src="item.image" class="w-full h-full object-cover" />
                      </div>
                      <div class="font-bold">{{ item.name }}</div>
                    </div>
                  </td>
                  <td class="px-4 py-6 text-center font-bold text-gray-700">฿{{ item.price }}</td>
                  <td class="px-4 py-6 text-center">
                    <div class="flex items-center justify-center bg-[#f3f5f3] border border-[#cfe7d1] rounded-lg w-24 mx-auto py-1">
                      <button @click="cart.decrease(item.id)" class="px-2 text-gray-400 hover:text-[#13ec25]">-</button>
                      <span class="font-bold text-sm">{{ item.qty }}</span>
                      <button @click="cart.increase(item.id)" class="px-2 text-gray-400 hover:text-[#13ec25]">+</button>
                    </div>
                  </td>
                  <td class="px-8 py-6 text-right font-bold text-[#13ec25]">฿{{ item.price * item.qty }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="mt-8 flex items-center justify-between px-2">
            <button @click="$router.push('/Productall')" class="flex items-center gap-2 text-gray-500 font-bold text-sm hover:text-[#13ec25] transition-colors">
              <span class="material-symbols-outlined text-sm">arrow_back</span>
              ย้อนกลับ
            </button>
            <button @click="cart.clear()" class="flex items-center gap-2 text-red-500 font-bold text-sm hover:text-red-600 transition-colors">
              <span class="material-symbols-outlined text-sm">delete_sweep</span>
              ล้างตะกร้าสินค้า
            </button>
          </div>
        </div>

        <div class="flex-1 w-full lg:max-w-md">
          <div class="bg-white rounded-[2rem] p-8 shadow-lg shadow-green-50/50 border border-[#cfe7d1]">
            <h2 class="text-xl font-bold mb-6 border-b border-[#cfe7d1] pb-4">Order Summary</h2>
            <div class="space-y-4 mb-6 text-sm">
              <div class="flex justify-between text-gray-400 font-medium">
                <span>Subtotal</span>
                <span class="font-bold text-gray-700">฿{{ cart.totalPrice }}</span>
              </div>
              <div class="flex justify-between text-gray-400 font-medium">
                <span>Shipping</span>
                <span class="font-bold text-gray-700">฿150</span>
              </div>
              <div class="flex justify-between text-[#13ec25] font-medium">
                <span>Seasonal Discount</span>
                <span class="font-bold">-฿100</span>
              </div>
              <div class="flex justify-between items-baseline pt-4 border-t border-[#cfe7d1]">
                <span class="text-lg font-bold text-gray-900">Total</span>
                <span class="text-2xl font-bold text-[#13ec25]">฿{{ cart.totalPrice + 50 }}</span>
              </div>
            </div>

            <div class="mb-8 pt-4 border-t border-[#f0f7f0]">
              <label class="block text-xs font-bold text-gray-800 mb-2 uppercase tracking-wide">Discount Code</label>
              <div class="flex gap-2">
                <input type="text" placeholder="AGRO2024" class="flex-1 bg-[#f3f5f3] border border-[#cfe7d1] rounded-xl px-4 py-2 text-sm outline-none" />
                <button class="bg-[#13ec25] text-[#0d1b0f] px-5 py-2 rounded-xl font-bold text-sm hover:opacity-90">Apply</button>
              </div>
            </div>

            <button class="w-full bg-[#13ec25] text-[#0d1b0f] py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 shadow-md uppercase tracking-wider">
              ดำเนินการชำระเงิน
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";
import Navbar2 from "../components/Navbar2.vue";
const cart = useCartStore();
</script>
<template>
  <header
    class="sticky top-0 z-50 flex items-center justify-between py-3 px-6 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
  >
    <!-- Logo -->
    <RouterLink to="/" class="flex items-center gap-3 shrink-0 cursor-pointer">
      <div class="text-[#1ED730] size-8">
        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <h2
        class="text-xl font-extrabold leading-tight tracking-tight hidden sm:block text-black"
      >
        กิจเกษตร
      </h2>
    </RouterLink>

    <!-- Search -->
    <div class="flex-1 max-w-xl mx-4 lg:mx-8">
      <div
        class="flex w-full h-10 items-stretch rounded-lg overflow-hidden bg-[#eff7f0]"
      >
        <div class="text-[#4c9a52] flex items-center justify-center pl-4">
          <span class="material-symbols-outlined">search</span>
        </div>
        <input
          v-model="search"
          class="w-full border-none bg-transparent text-gray-700 focus:ring-0 px-3 text-sm placeholder:text-[#8abf90]"
          placeholder="ค้นหายาฆ่าแมลง ปุ๋ย หรืออุปกรณ์..."
        />
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-3 shrink-0">
      <!-- Cart -->
      <RouterLink to="/Shoppingcart" class="relative">
        <button
          class="flex items-center justify-center rounded-lg h-10 w-10 bg-[#eff7f0] text-black hover:bg-[#dcefe0] transition"
        >
          <span class="material-symbols-outlined">shopping_cart</span>
        </button>

        <span
          v-if="cart.totalQty > 0"
          class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1ED730] text-[10px] font-bold text-white border-2 border-white"
        >
          {{ cart.totalQty }}
        </span>
      </RouterLink>

      <!-- Profile -->
      <RouterLink to="/Profile" class="relative">
        <button
          class="flex items-center justify-center rounded-lg h-10 w-10 bg-[#eff7f0] text-black hover:bg-[#dcefe0] transition"
        >
          <span class="material-symbols-outlined">person</span>
        </button>
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'

// Cart Store
const cart = useCartStore()

// Search State
const search = ref('')

// ส่งค่าการค้นหาออกไปให้ parent ใช้ (optional)
const emit = defineEmits(['search'])

watch(search, (newVal) => {
  emit('search', newVal)
})
</script>

<style scoped>
/* Custom style เพิ่มได้ตามต้องการ */
</style>

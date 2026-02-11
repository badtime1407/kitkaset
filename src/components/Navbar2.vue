<script setup>
import { useCartStore } from "@/stores/cart";

const cart = useCartStore();

const navItems = [
  { name: 'สารเคมีเกษตร', link: '/Productall', active: false },
  { name: 'การให้คำปรึกษา', link: '/chat', active: false },
  { name: 'ประวัติการสั่งซื้อสินค้า', link: '/Order', active: false}
];
</script>

<template>
  <header class="sticky top-0 z-50 flex items-center justify-between py-3 px-4 md:px-10 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">

    <div class="flex items-center gap-8">
        <router-link to="/" class="flex items-center gap-3 shrink-0 cursor-pointer group">
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

        <!-- Menu -->
        <nav class="hidden md:flex gap-8 mr-4 text-sm font-bold text-black">
        <router-link v-for="item in navItems"
            :key="item.name"
            :to="item.link"
            class="hover:text-gray-600 transition-colors"
            :class="{
            'text-black border-b-2 border-[#13ec25]': item.active
            }"
        >
            {{ item.name }}
        </router-link>
        </nav>
    </div>
    <!-- Logo -->
    

    <!-- Right Icons -->
    <div class="flex items-center gap-4">

      <!-- Cart -->
      <router-link to="/Shoppingcart" class="relative p-2">
        <span class="material-symbols-outlined">
          shopping_cart
        </span>

        <span
          v-if="cart.totalQty > 0"
          class="absolute -top-1 -right-1 bg-red-500 text-white
                 text-[10px] w-5 h-5 rounded-full flex items-center justify-center"
        >
          {{ cart.totalQty }}
        </span>
      </router-link>

      <!-- Profile -->
      <router-link
        to="/Profile"
        class="p-2 text-gray-600 hover:text-[#13ec25]"
      >
        <span class="material-symbols-outlined">person</span>
      </router-link>

    </div>

  </header>
</template>

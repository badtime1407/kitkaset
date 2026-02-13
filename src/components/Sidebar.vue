<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const navigationItems = [
  { name: 'My Profile', icon: 'person', path: '/profile' },
  { name: 'Address Book', icon: 'location_on', path: '/Address' },
  { name: 'Order History', icon: 'inventory_2', path: '/Order' },
  { name: 'Account Settings', icon: 'settings', path: '/Setting' },
]

const isActive = (path) => route.path === path
</script>

<template>
  <aside class="w-64 bg-white hidden lg:flex flex-col border-r border-gray-100 sticky top-0 h-screen">
    <div class="p-6 flex flex-col h-full">
      
      <router-link to="/" class="flex items-center gap-3 mb-10 px-2 group hover:opacity-80 transition-all no-underline">
        <div class="bg-[#00D632] p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
          <span class="material-symbols-outlined text-white text-xl">agriculture</span>
        </div>
        <div>
          <h1 class="text-[#1A3128] text-lg font-extrabold leading-tight">กิจเกษตร</h1>
          <p class="text-[#00D632] text-[9px] font-black uppercase tracking-widest">Consultant</p>
        </div>
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
          <span>Logout</span>
        </router-link>
      </div>
    </div>
  </aside>
</template>

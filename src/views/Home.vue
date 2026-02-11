<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import navbar from '../components/navbar.vue'

const cart = useCartStore()

// --- State ทั่วไป ---
const searchInput = ref('')

// --- State หมวดหมู่ (Categories) ---
const categories = ref([
  { name: 'ทั้งหมด', icon: 'potted_plant', link: '/Productall' },
  { name: 'สารกำจัดวัชพืช', icon: 'eco', link: '/Product1' },
  { name: 'สารกำจัดแมลง', icon: 'bug_report', link: '/Product2' },
  { name: 'สารป้องกันโรค', icon: 'health_and_safety', link: '/Product3' }
])

// --- State สินค้า (Featured Products) ---
const products = ref([
  {
    id: 1,
    name: 'คิวแม็กซ์ พินาโซล',
    price: 550,
    rating: 4.8,
    reviews: 120,
    image: 'https://www.qmaxagrotech.com/images/content/original-1685436057325.png',
    badge: { type: 'discount', text: '-15%' },
    link: '/Productdetails'
  },
  {
    id: 2,
    name: 'ฟีโนบูคาร์บ',
    price: 320,
    rating: 4.5,
    reviews: 85,
    image: 'https://www.qmaxagrotech.com/images/content/original-1727402473253.png',
    badge: null,
    link: '/Productdetails'
  },
  {
    id: 3,
    name: 'อะบาเมกติน',
    price: 260,
    rating: 4.9,
    reviews: 52,
    image: 'https://max-ag.com/wp-content/uploads/2022/02/%E0%B8%AD%E0%B8%B0%E0%B8%9A%E0%B8%B2%E0%B9%80%E0%B8%A1%E0%B8%81%E0%B8%95%E0%B8%B4%E0%B8%99.png',
    badge: { type: 'new', text: 'New' },
    link: '/Productdetails'
  },
  {
    id: 4,
    name: 'เอราเบส',
    price: 260,
    rating: 4.7,
    reviews: 41,
    image: 'https://erawanagri.com/wp-content/uploads/2022/04/erabas-640-240x300.png',
    badge: null,
    link: '/Productdetails'
  }
])

const features = ref([
  { icon: 'local_shipping', title: 'Safe & Fast Delivery', sub: 'Directly to your farm gate' },
  { icon: 'verified_user', title: 'Certified Quality', sub: '100% Genuine agrochemicals' },
  { icon: 'payments', title: 'Flexible Payments', sub: 'Pay on delivery or installments' }
])

const addToCart = (product) => {
  cart.addToCart(product)
}
</script>

<template>
  <navbar />
  <div class="min-h-screen bg-[#f9f9f9] font-main text-[#0d1b0f]">

    <main class="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-40 py-8 space-y-12">
      
      <section>
        <div class="relative overflow-hidden rounded-2xl shadow-md group cursor-pointer h-[300px] md:h-[400px]">
          <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
               style="background-image: linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%), url('/Background.png');">
          </div>
          <div class="relative h-full flex flex-col justify-end p-8">
             <h1 class="text-3xl md:text-5xl font-black text-white mb-2">ยกระดับผลผลิตเกษตรไทย</h1>
             <p class="text-white/90 text-sm md:text-base max-w-lg">รวมสินค้าคุณภาพเยี่ยมจากผู้เชี่ยวชาญ ส่งตรงถึงมือคุณ</p>
          </div>
        </div>
      </section>

      <section>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold tracking-tight text-gray-900">ค้นหาตามหมวดหมู่</h2>
          <router-link to="/Productall" class="text-sm font-bold text-[#1ED730] hover:underline">ดูทั้งหมด</router-link>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <router-link v-for="(cat, index) in categories" :key="index" :to="cat.link"
             class="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-6 items-center text-center hover:shadow-lg hover:border-[#cfe7d1] transition-all group">
            <div class="bg-[#e7f3e8] p-4 rounded-full text-[#1ED730] group-hover:scale-110 group-hover:bg-[#1ED730] group-hover:text-white transition-all duration-300">
              <span class="material-symbols-outlined !text-3xl">{{ cat.icon }}</span>
            </div>
            <h3 class="font-bold text-sm text-gray-700 group-hover:text-black">{{ cat.name }}</h3>
          </router-link>
        </div>
      </section>

      <section>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold tracking-tight text-gray-900">สินค้าแนะนำ</h2>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <router-link v-for="product in products" :key="product.id" :to="product.link"
             class="group flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-[#1ED730] transition-all duration-300">
            
            <div class="relative aspect-[4/5] w-full overflow-hidden bg-[#f9f9f9] p-4">
              <img class="h-full w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                   :src="product.image" :alt="product.name" />
              
              <span v-if="product.badge" 
                    :class="[
                      'absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded shadow-sm',
                      product.badge.type === 'discount' ? 'bg-red-500 text-white' : 'bg-[#1ED730] text-black'
                    ]">
                {{ product.badge.text }}
              </span>
            </div>

            <div class="p-4 flex flex-col flex-1">
              <h3 class="font-bold text-sm mt-1 mb-2 text-gray-800 line-clamp-2 group-hover:text-[#1ED730] transition-colors">{{ product.name }}</h3>
              
              <div class="flex items-center gap-1 mb-3">
                <span class="material-symbols-outlined !text-sm text-yellow-400 fill-1" style="font-variation-settings: 'FILL' 1;">star</span>
                <span class="text-xs font-bold">{{ product.rating }}</span>
                <span class="text-xs text-gray-400">({{ product.reviews }})</span>
              </div>
              
              <div class="mt-auto flex items-center justify-between">
                <span class="text-lg font-black text-gray-900">฿{{ product.price }}</span>
                <button 
                  class="size-10 flex items-center justify-center bg-[#1ED730] text-black rounded-lg hover:bg-[#18b528] hover:shadow-lg active:scale-95 transition-all z-10" 
                  @click.prevent="addToCart(product)">
                  <span class="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
            </div>
          </router-link>
        </div>
      </section>

      <section class="bg-[#1a2e1c] rounded-2xl overflow-hidden relative shadow-lg mt-12">
        <div class="flex flex-col md:flex-row items-stretch min-h-[320px]">
          <div class="flex-1 p-8 md:p-12 z-10 relative flex flex-col justify-center">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">ต้องการคำแนะนำไหม?</h2>
            <p class="text-white/80 mb-8 max-w-md leading-relaxed">
              ผู้เชี่ยวชาญเกษตรของเราพร้อมวินิจฉัยโรคพืชและแนะนำผลิตภัณฑ์ที่แม่นยำให้คุณฟรี
            </p>
            <div>
              <router-link to="/Chat">
                <button class="flex items-center gap-2 bg-[#1ED730] text-[#0d1b0f] font-bold px-6 py-3 rounded-lg hover:bg-[#18b528] transition-all shadow-md active:scale-95">
                  <span class="material-symbols-outlined">support_agent</span>
                  คุยกับผู้เชี่ยวชาญ
                </button>
              </router-link>
            </div>
          </div>
          <div class="w-full md:w-1/2 relative min-h-[320px] md:min-h-full">
            <div class="absolute inset-0 bg-gradient-to-r from-[#1a2e1c] via-[#1a2e1c]/60 to-transparent z-10"></div>
            <img class="w-full h-full object-cover object-center" src="/ER1.png" alt="Agronomist" />
          </div>
        </div>
      </section>

      <section class="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 border-b border-gray-100">
        <div v-for="(feature, index) in features" :key="index" class="flex items-start gap-4 p-4 rounded-xl hover:bg-white transition-colors">
          <div class="text-[#1ED730]">
            <span class="material-symbols-outlined !text-4xl">{{ feature.icon }}</span>
          </div>
          <div>
            <h4 class="font-bold text-base text-gray-900 mb-1">{{ feature.title }}</h4>
            <p class="text-sm text-gray-500">{{ feature.sub }}</p>
          </div>
        </div>
      </section>
    </main>

    <footer class="bg-white border-t border-gray-100 py-12 px-6 md:px-10 lg:px-40 mt-12">
      <div class="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <div class="text-[#1ED730] size-6">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 class="text-lg font-bold text-gray-900">กิจเกษตร</h2>
          </div>
          <p class="text-xs text-gray-500 leading-relaxed">ผู้นำด้านเทคโนโลยีการเกษตรสมัยใหม่ ที่ได้รับความไว้วางใจจากเกษตรกรไทย</p>
        </div>
        <div>
          <h4 class="font-bold text-sm mb-4 text-gray-900">หมวดหมู่สินค้า</h4>
          <ul class="text-xs space-y-3 text-gray-500">
            <li><router-link to="/Product1" class="hover:text-[#1ED730]">สารกำจัดวัชพืช</router-link></li>
            <li><router-link to="/Product2" class="hover:text-[#1ED730]">สารกำจัดแมลง</router-link></li>
            <li><router-link to="/Product3" class="hover:text-[#1ED730]">สารป้องกันโรคพืช</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-sm mb-4 text-gray-900">การบริการ</h4>
          <ul class="text-xs space-y-3 text-gray-500">
            <li><router-link to="/consultation" class="hover:text-[#1ED730]">ปรึกษาผู้เชี่ยวชาญ</router-link></li>
            <li><a href="#" class="hover:text-[#1ED730]">ติดตามสถานะการส่ง</a></li>
            <li><a href="#" class="hover:text-[#1ED730]">นโยบายการคืนเงิน</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-sm mb-4 text-gray-900">รับข่าวสารและส่วนลด</h4>
          <div class="flex gap-2">
            <input class="flex-1 rounded-lg border border-gray-200 bg-gray-50 text-xs px-3 py-2 focus:ring-2 focus:ring-[#1ED730] outline-none" placeholder="อีเมลของคุณ" type="email" />
            <button class="bg-[#1ED730] text-[#0d1b0f] px-4 py-2 rounded-lg font-bold text-xs hover:bg-[#18b528]">ส่ง</button>
          </div>
        </div>
      </div>
      <div class="max-w-[1280px] mx-auto mt-12 pt-8 border-t border-gray-100 text-center text-[10px] text-gray-400">
        © 2026 Kij Kaset Co., Ltd. All rights reserved.
      </div>
    </footer>
  </div>
</template>
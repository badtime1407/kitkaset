<script setup>
import { ref } from 'vue'

// --- State ทั่วไป ---
const cartCount = ref(3)

// --- State หมวดหมู่ (Categories) ---
const categories = ref([
  { name: 'ทั้งหมด', icon: 'potted_plant', link: '#' },
  { name: 'สารกำจัดวัชพืช', icon: 'eco', link: '#' },
  { name: 'สารกำจัดแมลง', icon: 'bug_report', link: '#' },
  { name: 'สารป้องกันโรค', icon: 'construction', link: '#' }
])

// --- State สินค้า (Products) ---
// ใช้ข้อมูลและรูปภาพตามที่คุณระบุมา
const products = ref([
  {
    id: 1,
    name: 'คิวแม็กซ์ พินาโซล',
    price: 550,
    rating: 4.8,
    reviews: 120,
    image: 'https://www.qmaxagrotech.com/images/content/original-1685436057325.png',
    badge: { type: 'discount', text: '-15%' },
    link: '#'
  },
  {
    id: 2,
    name: 'ฟีโนบูคาร์บ',
    price: 320,
    rating: 4.5,
    reviews: 85,
    image: 'https://www.qmaxagrotech.com/images/content/original-1727402473253.png',
    badge: null,
    link: '#'
  },
  {
    id: 3,
    name: 'อะบาเมกติน',
    price: 260,
    rating: 4.9,
    reviews: 52,
    image: 'https://max-ag.com/wp-content/uploads/2022/02/%E0%B8%AD%E0%B8%B0%E0%B8%9A%E0%B8%B2%E0%B9%80%E0%B8%A1%E0%B8%81%E0%B8%95%E0%B8%B4%E0%B8%99.png',
    badge: { type: 'new', text: 'New' },
    link: '#'
  },
  {
    id: 4,
    name: 'เอราเบส',
    price: 260,
    rating: 4.7,
    reviews: 41,
    image: 'https://erawanagri.com/wp-content/uploads/2022/04/erabas-640-240x300.png',
    badge: null,
    link: '#'
  }
])

// --- State จุดเด่นบริการ (Features) - ส่วนล่าง ---
const features = ref([
  { 
    icon: 'local_shipping', 
    title: 'Safe & Fast Delivery', 
    sub: 'Directly to your farm gate' 
  },
  { 
    icon: 'verified_user', 
    title: 'Certified Quality', 
    sub: '100% Genuine agrochemicals' 
  },
  { 
    icon: 'payments', 
    title: 'Flexible Payments', 
    sub: 'Pay on delivery or installments' 
  }
])

// ฟังก์ชัน
const addToCart = (product) => {
  cartCount.value++
  alert(`เพิ่ม ${product.name} ลงตะกร้าแล้ว!`)
}
</script>

<template>
  <div class="min-h-screen bg-[#f9f9f9] font-main text-[#0d1b0f]">
    
    <header class="sticky top-0 z-50 flex items-center justify-between py-3 px-6 w-full bg-white shadow-sm border-b border-gray-100">
      <div class="flex items-center gap-3 shrink-0 cursor-pointer">
        <div class="text-[#1ED730] size-8">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
             <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 class="text-xl font-extrabold leading-tight tracking-tight hidden sm:block text-black">กิจเกษตร</h2>
      </div>

      <div class="flex-1 max-w-xl mx-4 lg:mx-8">
        <label class="flex flex-col min-w-40 h-10 w-full">
          <div class="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden bg-[#eff7f0]"> 
            <div class="text-[#4c9a52] flex items-center justify-center pl-4">
              <span class="material-symbols-outlined">search</span>
            </div>
            <input class="w-full border-none bg-transparent text-gray-700 focus:ring-0 px-3 text-sm placeholder:text-[#8abf90]" placeholder="Search for pesticides, fertilizers, or tools..." />
          </div>
        </label>
      </div>

      <div class="flex items-center gap-3 shrink-0">
        <button class="flex items-center justify-center rounded-lg h-10 w-10 bg-[#eff7f0] text-black hover:bg-[#dcefe0] transition">
          <span class="material-symbols-outlined">person</span>
        </button>
        <div class="relative">
          <button class="flex items-center justify-center rounded-lg h-10 w-10 bg-[#eff7f0] text-black hover:bg-[#dcefe0] transition">
            <span class="material-symbols-outlined">shopping_cart</span>
          </button>
          <span class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1ED730] text-[10px] font-bold text-white border-2 border-white">{{ cartCount }}</span>
        </div>
      </div>
    </header>

    <main class="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-40 py-8 space-y-12">
      
      <section class="@container">
        <div class="relative overflow-hidden rounded-2xl shadow-md group cursor-pointer">
          <div class="flex min-h-[300px] md:min-h-[400px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-end px-6 pb-12 transition-transform duration-700 group-hover:scale-105"
               style="background-image: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%), url('https://images.unsplash.com/photo-1530263503766-32faeb211d0d?q=80&w=2670&auto=format&fit=crop');"> 
          </div>
        </div>
      </section>

      <section>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold tracking-tight text-gray-900">Browse by Category</h2>
          <a class="text-sm font-bold text-[#1ED730] hover:underline" href="#">View All</a>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a v-for="(cat, index) in categories" :key="index" :href="cat.link"
             class="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-6 items-center text-center hover:shadow-lg hover:border-[#cfe7d1] transition-all cursor-pointer group">
            <div class="bg-[#e7f3e8] p-4 rounded-full text-[#1ED730] group-hover:scale-110 group-hover:bg-[#1ED730] group-hover:text-white transition-all duration-300">
              <span class="material-symbols-outlined !text-3xl">{{ cat.icon }}</span>
            </div>
            <h3 class="font-bold text-sm text-gray-700 group-hover:text-black">{{ cat.name }}</h3>
          </a>
        </div>
      </section>

      <section>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold tracking-tight text-gray-900">Featured Products</h2>
          <div class="flex gap-2">
            <button class="size-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition">
              <span class="material-symbols-outlined !text-lg">chevron_left</span>
            </button>
            <button class="size-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition">
              <span class="material-symbols-outlined !text-lg">chevron_right</span>
            </button>
          </div>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <a v-for="product in products" :key="product.id" :href="product.link"
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
                <span class="text-lg font-black text-gray-900">฿{{ product.price }} บาท</span>
                <button 
                  class="size-10 flex items-center justify-center bg-[#1ED730] text-black rounded-lg hover:bg-[#18b528] hover:shadow-lg active:scale-95 transition-all z-10" 
                  @click.prevent="addToCart(product)">
                  <span class="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
            </div>
          </a>
        </div>
      </section>

      <section class="bg-[#1a2e1c] rounded-2xl overflow-hidden relative shadow-lg mt-12">
        <div class="flex flex-col md:flex-row items-center min-h-[320px]">
          
          <div class="flex-1 p-8 md:p-12 z-10 relative">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Need Expert Advice?</h2>
            <p class="text-white/80 mb-8 max-w-md leading-relaxed">
              Our certified agronomists are available 24/7 to help you diagnose plant diseases and recommend the right products for your soil type.
            </p>
            <button class="flex items-center gap-2 bg-[#1ED730] text-[#0d1b0f] font-bold px-6 py-3 rounded-lg hover:bg-[#18b528] transition-all shadow-md active:scale-95">
              <span class="material-symbols-outlined">support_agent</span>
              Book Consultation
            </button>
          </div>

          <div class="w-full md:w-1/2 h-64 md:h-full absolute md:relative right-0 top-0 bottom-0">
            <div class="absolute inset-0 bg-gradient-to-r from-[#1a2e1c] via-[#1a2e1c]/80 to-transparent md:bg-none z-0"></div>
            <img 
              class="w-full h-full object-cover object-center" 
              src="https://images.unsplash.com/photo-1595244569302-3c372558509e?q=80&w=2670&auto=format&fit=crop" 
              alt="Agronomist with tablet" 
            />
          </div>
        </div>
      </section>

      <section class="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 px-4">
        <div v-for="(feature, index) in features" :key="index" class="flex items-start gap-4">
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

    <footer class="bg-white border-t border-gray-100 py-12 px-4 md:px-10 lg:px-40 mt-12">
      <div class="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
         
         <div class="space-y-4">
             <div class="flex items-center gap-2">
                 <div class="text-[#1ED730] size-6">
                     <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                         <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                     </svg>
                 </div>
                 <h2 class="text-lg font-bold text-gray-900">AgroConsult</h2>
             </div>
             <p class="text-xs text-gray-500 leading-relaxed">Leading the way in modern agriculture with technology and trust.</p>
         </div>

         <div>
            <h4 class="font-bold text-sm mb-4 text-gray-900">Shop</h4>
            <ul class="text-xs space-y-3 text-gray-500">
                <li><a class="hover:text-[#1ED730] transition-colors" href="#">Pesticides</a></li>
                <li><a class="hover:text-[#1ED730] transition-colors" href="#">Fertilizers</a></li>
                <li><a class="hover:text-[#1ED730] transition-colors" href="#">Seeds</a></li>
                <li><a class="hover:text-[#1ED730] transition-colors" href="#">Farm Tools</a></li>
            </ul>
         </div>

         <div>
            <h4 class="font-bold text-sm mb-4 text-gray-900">Services</h4>
            <ul class="text-xs space-y-3 text-gray-500">
                <li><a class="hover:text-[#1ED730] transition-colors" href="#">Expert Consultation</a></li>
                <li><a class="hover:text-[#1ED730] transition-colors" href="#">Soil Testing</a></li>
                <li><a class="hover:text-[#1ED730] transition-colors" href="#">Bulk Ordering</a></li>
                <li><a class="hover:text-[#1ED730] transition-colors" href="#">Weather Reports</a></li>
            </ul>
         </div>

         <div>
             <h4 class="font-bold text-sm mb-4 text-gray-900">Newsletter</h4>
             <p class="text-xs text-gray-500 mb-4">Get seasonal tips and exclusive discounts.</p>
             <div class="flex gap-2">
                 <input class="flex-1 rounded-lg border border-gray-200 bg-gray-50 text-xs px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1ED730]" placeholder="Email address" type="email" />
                 <button class="bg-[#1ED730] text-[#0d1b0f] px-4 py-2 rounded-lg font-bold text-xs hover:bg-[#18b528] transition-colors">Join</button>
             </div>
         </div>
      </div>

      <div class="max-w-[1280px] mx-auto mt-12 pt-8 border-t border-gray-100 text-center">
          <p class="text-[10px] text-gray-400">© 2024 AgroConsult E-Commerce. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* นำเข้า Font ไทยและอังกฤษ */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sarabun:wght@400;500;700;800&display=swap');
/* นำเข้า Material Symbols (ไอคอน) */
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

.font-main {
  font-family: 'Inter', 'Sarabun', sans-serif;
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
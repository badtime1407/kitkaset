<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/product'
import navbar from '../components/navbar.vue'
import Footer from '../components/Footer.vue'

const cart = useCartStore()
const productStore = useProductStore()

/* ================= STATE ================= */
const searchInput = ref('')

/* ================= CATEGORY ================= */
const categories = ref([
  { name: 'ทั้งหมด', icon: 'potted_plant', link: '/Productall' },
  { name: 'สารกำจัดวัชพืช', icon: 'eco', link: '/products/herbicide' },
  { name: 'สารกำจัดแมลง', icon: 'bug_report', link: '/products/insecticide' },
  { name: 'สารป้องกันโรค', icon: 'health_and_safety', link: '/products/fungicide' }
])

/* ================= ใช้ข้อมูลจาก Store ================= */
/* ดึง 4 ตัวแรกไปแสดงเหมือนเดิม */
const products = computed(() => {
  return productStore.products.slice(0, 4)
})

const features = ref([
  { icon: 'local_shipping', title: 'Safe & Fast Delivery', sub: 'Directly to your farm gate' },
  { icon: 'verified_user', title: 'Certified Quality', sub: '100% Genuine agrochemicals' },
  { icon: 'payments', title: 'Flexible Payments', sub: 'Pay on delivery or installments' }
])

const addToCart = (product) => {
  cart.addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image
  })
}

/* ===== Popup ===== */
const showConfirm = ref(false)
const selectedProduct = ref(null)

function openConfirm(p) {
  selectedProduct.value = p
  showConfirm.value = true
}

function closeConfirm() {
  showConfirm.value = false
  selectedProduct.value = null
}

function confirmAddToCart() {
  if (!selectedProduct.value) return
  addToCart(selectedProduct.value)
  closeConfirm()
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
          
          <router-link 
            v-for="product in products" 
            :key="product.id" 
            :to="`/product/${product.id}`"
            class="group flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-[#1ED730] transition-all duration-300"
          >
            
            <div class="relative aspect-[4/5] w-full overflow-hidden bg-[#f9f9f9] p-4">
              <img
                class="h-full w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                :src="product.image"
                :alt="product.name"
              />
            </div>

            <div class="p-4 flex flex-col flex-1">
              <h3 class="font-bold text-sm mt-1 mb-2 text-gray-800 line-clamp-2 group-hover:text-[#1ED730] transition-colors">
                {{ product.name }}
              </h3>
              
              <div class="mt-auto flex items-center justify-between">
                <span class="text-lg font-black text-gray-900">
                  ฿{{ product.price.toLocaleString() }}
                </span>

                <button 
                  class="size-10 flex items-center justify-center bg-[#1ED730] text-black rounded-lg hover:bg-[#18b528] hover:shadow-lg active:scale-95 transition-all z-10" 
                  @click.prevent="openConfirm(product)">
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
              <router-link to="/Advicecenter">
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

        <!-- Confirm Popup -->
      <div
        v-if="showConfirm"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-xl p-6 w-90 text-center">
          <h3 class="font-bold text-lg mb-3">
            ยืนยันการเพิ่มสินค้า
          </h3>

          <p class="text-gray-600 mb-5">
            ต้องการเพิ่มสินค้า
            <span class="font-bold">
              {{ selectedProduct?.name }}
            </span>
            ลงตะกร้าหรือไม่?
          </p>

          <div class="flex gap-3 justify-center">
            <button
              @click="closeConfirm"
              class="px-4 py-2 rounded border"
            >
              ยกเลิก
            </button>

            <button
              @click="confirmAddToCart"
              class="px-4 py-2 rounded bg-[#13ec25] text-black font-bold"
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </div>

    <Footer />
  </div>
</template>
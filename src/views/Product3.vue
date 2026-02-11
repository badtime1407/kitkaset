<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from "@/stores/cart";
import Footer from '../components/Footer.vue';
import Navbar2 from '../components/Navbar2.vue';

const cart = useCartStore();

function addToCart(p) {
  cart.addToCart({
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.image,
  });

  console.log("Added to cart", p.name);
}

// --- State ---
const searchQuery = ref('');
const selectedCategory = ref('ทั้งหมด');
const selectedBrands = ref(['Bayer Crop Science', 'Syngenta', 'BASF Agricultural', 'Corteva Agriscience']);

// --- Data ---
const products = ref([
    { 
      id: 1, name: 'บลูชิลด์',
      price: 530,
      image: 'https://www.pitsulin.com/wp-content/uploads/2021/04/unnamed-file-2.png',
      tag: 'Top Rated',
      tagColor: 'bg-[#13ec25] text-black',
      brand: 'Bayer Crop Science',
      link: '/Productdetails'
    },
    { 
      id: 2, name: 'คิวโทมอร์ฟ',
      price: 950, 
      image: 'https://www.qmaxagrotech.com/images/ready-template/crop-1685349655467.png',
      tag: 'Best Value', 
      tagColor: 'bg-blue-600 text-white', 
      brand: 'Syngenta',
      link: '/Productdetails'
    },
    { 
      id: 3, name: 'คิวแม็กพินาโซล', 
      price: 550, 
      image: 'https://www.qmaxagrotech.com/images/content/original-1685436057325.png', 
      tag: null, 
      brand: 'BASF Agricultural',
      link: '/Productdetails'
    },
    { 
      id: 4, name: 'พรีมิส เอสซี 200', 
      price: 60, 
      image: 'https://www.cheminpestcontrol.com/cdn/shop/products/Premise-SC200_1024x1024.png?v=1579663268',
      tag: null,
      brand: 'Bayer Crop Science',
      link: '/Productdetails'
    },
    { 
      id: 5, name: 'บลูโล', 
      price: 120,  
      image: 'https://www.mobil-ag.com/wp-content/uploads/2021/08/%E0%B8%9A%E0%B8%A5%E0%B8%B9%E0%B9%82%E0%B8%A5-1024x1024.png', 
      tag: null,
      brand: 'Corteva Agriscience',
      link: '/Productdetails'
    },
    { 
      id: 6, name: 'อะบาเมกติน',
      price: 260, 
      image: 'https://max-ag.com/wp-content/uploads/2022/02/%E0%B8%AD%E0%B8%B0%E0%B8%9A%E0%B8%B2%E0%B9%80%E0%B8%A1%E0%B8%81%E0%B8%95%E0%B8%B4%E0%B8%99.png', 
      tag: null,
      brand: 'Syngenta',
      link: '/Productdetails'
    }
]);

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesBrand = selectedBrands.value.length === 0 || selectedBrands.value.includes(product.brand);
    return matchesSearch && matchesBrand;
  });
});

const categories = ref([
  { name: 'ทั้งหมด', icon: 'potted_plant', link: '/Productall' },
  { name: 'สารกำจัดวัชพืช', icon: 'eco', link: '/Product1' },
  { name: 'สารกำจัดแมลง', icon: 'pest_control', link: '/Product2' },
  { name: 'สารป้องกันโรค', icon: 'health_and_safety', link: '/Product3' }
])

const brands = ['Bayer Crop Science', 'Syngenta', 'BASF Agricultural', 'Corteva Agriscience'];

/* ===== Popup Confirm ===== */

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

  cart.addToCart({
    id: selectedProduct.value.id,
    name: selectedProduct.value.name,
    price: selectedProduct.value.price,
    image: selectedProduct.value.image,
  })

  closeConfirm()
}


</script>

<template>
  <div class="min-h-screen bg-[#f9f9f9] font-main text-[#0d1b0f]">
    <navbar2 />

    <main class="max-w-full w-full px-4 md:px-10 py-10 flex flex-col lg:flex-row gap-10">
      <aside class="w-full lg:w-64 flex-shrink-0 space-y-8">
        <div>
          <h2 class="text-lg font-bold mb-1">Filters</h2>
          <p class="text-xs text-[#4c9a52] font-semibold uppercase tracking-wider">ปรับแต่งการค้นหา</p>
        </div>

        <div class="space-y-3">
          <h3 class="text-sm font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-[#13ec25] scale-75">category</span>
            ประเภทสินค้า
          </h3>
          <div class="flex flex-col gap-1">
            <router-link 
              v-for="cat in categories" 
              :key="cat.name"
              :to="cat.link"
              @click="selectedCategory = cat.name"
              :class="selectedCategory === cat.name ? 'bg-[#13ec25] text-white shadow-md' : 'hover:bg-[#E7F3E8] text-gray-600'"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
            >
              <span class="material-symbols-outlined text-[18px]">{{ cat.icon }}</span>
              {{ cat.name }}
            </router-link>
          </div>
        </div>

        <div class="space-y-3">
          <h3 class="text-sm font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-[#13ec25] scale-75">verified</span>
            แบรนด์สินค้า
          </h3>
          <div class="flex flex-col gap-2.5">
            <label v-for="brand in brands" :key="brand" class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" v-model="selectedBrands" :value="brand" class="rounded border-gray-300 text-[#13ec25] focus:ring-[#13ec25]" />
              <span class="text-xs font-medium text-gray-500 group-hover:text-[#13ec25] transition-colors">{{ brand }}</span>
            </label>
          </div>
        </div>
      </aside>

      <section class="flex-1">
        <div class="flex justify-between items-end mb-8">
          <div>
            <nav class="text-[10px] font-bold uppercase tracking-widest text-[#4c9a52] mb-1">Home / Shop</nav>
            <h2 class="text-3xl font-black">Agrochemicals</h2>
          </div>
          <div class="text-sm font-bold text-gray-400">แสดง {{ filteredProducts.length }} รายการ</div>
        </div>

        <div v-if="filteredProducts.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <router-link 
            v-for="p in filteredProducts" 
            :key="p.id" 
            :to="p.link"
            class="group bg-white rounded-[2rem] border border-[#E7F0E8] p-4 transition-all hover:shadow-2xl hover:shadow-[#13ec25]/10 hover:-translate-y-1 block cursor-pointer"
          >
            <div class="relative aspect-square bg-[#F8FAF8] rounded-[1.5rem] mb-4 overflow-hidden flex items-center justify-center">
              <img :src="p.image" class="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-500" />
              <div v-if="p.tag" :class="p.tagColor" class="absolute top-4 left-4 text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-tighter">{{ p.tag }}</div>
            </div>
            <div class="px-2 space-y-1">
              <p class="text-[10px] font-bold text-[#4c9a52] uppercase">{{ p.brand }}</p>
              <h3 class="font-bold text-lg group-hover:text-[#13ec25] transition-colors text-black">{{ p.name }}</h3>
              <div class="flex items-center justify-between pt-3">
                <span class="text-xl font-black text-black">{{ p.price }} บาท</span>
                <button @click.stop.prevent="openConfirm(p)" class="bg-[#F0F4F0] hover:bg-[#13ec25] text-[#13ec25] hover:text-white size-10 rounded-xl flex items-center justify-center transition-all shadow-sm">
                  <span class="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                </button>
              </div>
            </div>
          </router-link>
        </div>

        <div class="flex items-center justify-center gap-2 mt-12">
            <button class="flex items-center justify-center h-10 w-10 rounded-lg border border-[#e7f3e8] hover:bg-[#13ec25]/10 transition-colors">
                <span class="material-symbols-outlined">chevron_left</span>
            </button>
            <button class="flex items-center justify-center h-10 w-10 rounded-lg bg-[#13ec25] text-black font-bold shadow-sm">1</button>
            <button class="flex items-center justify-center h-10 w-10 rounded-lg border border-[#e7f3e8] hover:bg-[#13ec25]/10 transition-colors">2</button>
            <button class="flex items-center justify-center h-10 w-10 rounded-lg border border-[#e7f3e8] hover:bg-[#13ec25]/10 transition-colors">3</button>
            <span class="px-2 text-gray-400">...</span>
            <button class="flex items-center justify-center h-10 w-10 rounded-lg border border-[#e7f3e8] hover:bg-[#13ec25]/10 transition-colors">7</button>
            <button class="flex items-center justify-center h-10 w-10 rounded-lg border border-[#e7f3e8] hover:bg-[#13ec25]/10 transition-colors">
                <span class="material-symbols-outlined">chevron_right</span>
            </button>
        </div>
      </section>
    </main>

    <!-- Confirm Popup -->
      <div v-if="showConfirm" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-6 w-90 text-center">
          <h3 class="font-bold text-lg mb-3">ยืนยันการเพิ่มสินค้า</h3>
          <p class="text-gray-600 mb-5">
            ต้องการเพิ่มสินค้า 
            <span class="font-bold">
              {{ selectedProduct?.name }}
            </span>
            ลงตะกร้าหรือไม่?
          </p>

          <div class="flex gap-3 justify-center">
            <button @click="closeConfirm" class="px-4 py-2 rounded border">
              ยกเลิก
            </button>

            <button @click="confirmAddToCart"
              class="px-4 py-2 rounded bg-[#13ec25] text-black font-bold">
              ยืนยัน
            </button>

          </div>

        </div>
      </div>

  <Footer />
  </div>
</template>
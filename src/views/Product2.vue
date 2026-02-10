<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from "@/stores/cart";
import Footer from '../components/Footer.vue';

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
      id: 1, name: 'ควิกไบท์',
      price: 1425,
      image: 'https://www.cheminpestcontrol.com/cdn/shop/products/quick-bayt-1_1024x1024.png?v=1543376716',
      tag: 'Top Rated',
      tagColor: 'bg-[#13ec25] text-black',
      brand: 'Bayer Crop Science',
      link: '/Shoppingcart'
    },
    { 
      id: 2, name: 'วีวีฟอส',
      price: 200, 
      image: 'https://i0.wp.com/tkagrogroup.com/wp-content/uploads/2021/08/%E0%B8%A7%E0%B8%B5%E0%B8%A7%E0%B8%B5%E0%B8%9F%E0%B8%AD%E0%B8%AA.png?fit=1108%2C1477&ssl=1',
      tag: 'Best Value', 
      tagColor: 'bg-blue-600 text-white', 
      brand: 'Syngenta',
      link: '/Shoppingcart'
    },
    { 
      id: 3, name: 'โซเซียน่า ', 
      price: 380, 
      image: 'https://www.qmaxagrotech.com/images/content/original-1685331075682.png', 
      tag: null, 
      brand: 'BASF Agricultural',
      link: '/Shoppingcart' 
    },
    { 
      id: 4, name: 'ดอสซ์', 
      price: 1200, 
      image: 'https://www.pitsulin.com/wp-content/uploads/2025/01/unnamed-file-1.png',
      tag: null,
      brand: 'Bayer Crop Science',
      link: '/Shoppingcart' 
    },
    { 
      id: 5, name: 'โซเพอร์การ์ด 10 อีซี', 
      price: 150,  
      image: 'https://www.cheminpestcontrol.com/cdn/shop/products/10---1_grande.png?v=1543376829', 
      tag: null,
      brand: 'Corteva Agriscience',
      link: '/Shoppingcart' 
    },
    { 
      id: 6, name: 'ฟิพ-การ์ด เอสซี ',
      price: 400, 
      image: 'https://www.pitsulin.com/wp-content/uploads/2021/04/unnamed-file-12.png', 
      tag: null,
      brand: 'Syngenta',
      link: '/Shoppingcart' 
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

const navItems = [
  { name: 'สารเคมีเกษตร', link: '/', active: true },
  { name: 'การปรึกษา', link: '/', active: false },
  { name: 'อุปกรณ์เกษตร', link: '/', active: false },
  { name: 'เกี่ยวกับเรา', link: '/', active: false }
];
</script>

<template>
  <div class="min-h-screen bg-[#f9f9f9] font-main text-[#0d1b0f]">
    <header class="sticky top-0 z-50 flex items-center justify-between py-3 px-4 md:px-10 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <router-link to="/" class="flex items-center gap-3 shrink-0 cursor-pointer group">
        <div class="text-[#010101] size-9 transition-transform group-hover:rotate-12">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 class="text-xl font-black text-black">กิจเกษตร</h2>
      </router-link>
        
      <nav class="hidden md:flex gap-8 ml-6 text-sm font-bold text-gray-500">
        <router-link v-for="item in navItems" :key="item.name" :to="item.link" class="hover:text-black transition-colors" :class="{'text-black border-b-2 border-[#13ec25]': item.active}">
          {{ item.name }}
        </router-link>
      </nav>

      <div class="flex items-center gap-4 flex-1 max-w-md justify-end">
        <div class="flex gap-2">
          <router-link to="/Shoppingcart" class="relative p-2">
            <span class="material-symbols-outlined">
              shopping_cart
            </span>
            <span v-if="cart.totalQty > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
              {{ cart.totalQty }}
            </span>
          </router-link>
          <router-link to="/Profile" class="p-2 text-gray-600 hover:text-[#13ec25] transition-colors"><span class="material-symbols-outlined">person</span></router-link>
        </div>
      </div>
    </header>

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
                <button @click.stop.prevent="addToCart(p)" class="bg-[#F0F4F0] hover:bg-[#13ec25] text-[#13ec25] hover:text-white size-10 rounded-xl flex items-center justify-center transition-all shadow-sm">
                  <span class="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                </button>
              </div>
            </div>
          </router-link>
        </div>

        <div class="flex items-center justify-center gap-2 mt-12 pb-12">
          <button class="flex items-center justify-center h-10 w-10 rounded-lg border border-[#e7f3e8] hover:bg-primary/10 transition-colors">
            <span class="material-symbols-outlined">chevron_left</span>
          </button>
          <button class="flex items-center justify-center h-10 w-10 rounded-lg bg-[#13ec25] text-black font-bold">1</button>
          <button class="flex items-center justify-center h-10 w-10 rounded-lg border border-[#e7f3e8] hover:bg-primary/10 transition-colors">2</button>
          <button class="flex items-center justify-center h-10 w-10 rounded-lg border border-[#e7f3e8] hover:bg-primary/10 transition-colors">3</button>
          <span class="px-2 text-gray-400">...</span>
          <button class="flex items-center justify-center h-10 w-10 rounded-lg border border-[#e7f3e8] hover:bg-primary/10 transition-colors">7</button>
          <button class="flex items-center justify-center h-10 w-10 rounded-lg border border-[#e7f3e8] hover:bg-primary/10 transition-colors">
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';

// --- State ---
const searchQuery = ref('');
const selectedCategory = ref('ทั้งหมด');
const selectedBrands = ref(['Bayer Crop Science', 'Syngenta', 'BASF Agricultural', 'Corteva Agriscience']); // Default check all

// --- Data (ข้อมูลสินค้า) ---
const products = ref([
  {
    id: 1,
    name: 'อะบาเมกติน',
    price: 260,
    image: 'https://max-ag.com/wp-content/uploads/2022/02/%E0%B8%AD%E0%B8%B0%E0%B8%9A%E0%B8%B2%E0%B9%80%E0%B8%A1%E0%B8%81%E0%B8%95%E0%B8%B4%E0%B8%99.png',
    tag: 'Top Rated',
    tagColor: 'bg-[#13ec25] text-black',
    brand: 'Bayer Crop Science' // สมมติแบรนด์เพื่อการ filter
  },
  {
    id: 2,
    name: 'ฟีโนบูคาร์บ',
    price: 320,
    image: 'https://www.qmaxagrotech.com/images/content/original-1727402473253.png',
    tag: 'Best Value',
    tagColor: 'bg-blue-500 text-white',
    brand: 'Syngenta'
  },
  {
    id: 3,
    name: 'คิวแม็กพินาโซล',
    price: 550,
    image: 'https://www.qmaxagrotech.com/images/content/original-1685436057325.png',
    tag: null,
    brand: 'BASF Agricultural'
  },
  {
    id: 4,
    name: 'พรีมิส เอสซี 200',
    price: 60,
    image: 'https://www.cheminpestcontrol.com/cdn/shop/products/Premise-SC200_1024x1024.png?v=1579663268',
    tag: null,
    brand: 'Bayer Crop Science'
  },
  {
    id: 5,
    name: 'โซเพอร์การ์ด 10 อีซี',
    price: 150,
    image: 'https://www.cheminpestcontrol.com/cdn/shop/products/10---1_grande.png?v=1543376829',
    tag: null,
    brand: 'Corteva Agriscience'
  },
  {
    id: 6,
    name: 'เอราบาส',
    price: 260,
    image: 'https://erawanagri.com/wp-content/uploads/2022/04/erabas-640-240x300.png',
    tag: null,
    brand: 'Syngenta'
  }
]);

// --- Logic ---

// Computed Property สำหรับกรองสินค้า
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    // 1. กรองตามชื่อ (Search)
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    // 2. กรองตามแบรนด์ (Checkbox)
    // หมายเหตุ: ในข้อมูลจำลองผมใส่ brand ไว้ ถ้าสินค้าไหนไม่มี brand ก็ให้ผ่านไปก่อน หรือคุณต้องไปเติม data ให้ครบ
    const matchesBrand = selectedBrands.value.length === 0 || selectedBrands.value.includes(product.brand) || !product.brand;
    
    return matchesSearch && matchesBrand;
  });
});

const categories = [
  { name: 'ทั้งหมด', icon: 'check_circle' },
  { name: 'สารกำจัดวัชพืช', icon: 'spa' },
  { name: 'สารกำจัดแมลง', icon: 'bug_report' },
  { name: 'สารป้องกันโรค', icon: 'eco' }
];

const brands = [
  'Bayer Crop Science',
  'Syngenta',
  'BASF Agricultural',
  'Corteva Agriscience'
];

// ฟังก์ชันเพิ่มลงตะกร้า (จำลอง)
const addToCart = (product) => {
  alert(`Added "${product.name}" to cart!`);
};

const setCategory = (catName) => {
  selectedCategory.value = catName;
};
</script>

<template>
  <div class="layout-container flex h-full grow flex-col min-h-screen font-display bg-[#f6f8f6] dark:bg-[#102212] text-[#0d1b0f] dark:text-white transition-colors duration-200">
    
    <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e7f3e8] dark:border-[#2a4d2e] px-4 md:px-10 py-3 bg-white dark:bg-[#162a18]">
      <div class="flex items-center gap-8">
        <div class="flex items-center gap-4 text-[#0d1b0f] dark:text-[#13ec25]">
          <div class="size-8">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
            </svg>
          </div>
          <a href="#">
            <h2 class="text-[#0d1b0f] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">กิจเกษตร</h2>
          </a>
        </div>
        <nav class="hidden lg:flex items-center gap-9">
          <a class="text-[#0d1b0f] dark:text-gray-300 text-sm font-medium leading-normal hover:text-[#13ec25] transition-colors" href="#">Agrochemicals</a>
          <a class="text-[#0d1b0f] dark:text-gray-300 text-sm font-medium leading-normal hover:text-[#13ec25] transition-colors" href="#">Consultation</a>
          <a class="text-[#0d1b0f] dark:text-gray-300 text-sm font-medium leading-normal hover:text-[#13ec25] transition-colors" href="#">Equipment</a>
          <a class="text-[#0d1b0f] dark:text-gray-300 text-sm font-medium leading-normal hover:text-[#13ec25] transition-colors" href="#">About</a>
        </nav>
      </div>
      <div class="flex flex-1 justify-end gap-4 max-w-md ml-4">
        <label class="flex flex-col min-w-40 !h-10 w-full max-w-64">
          <div class="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden">
            <div class="text-[#4c9a52] flex border-none bg-[#e7f3e8] dark:bg-[#203a22] items-center justify-center pl-4">
              <span class="material-symbols-outlined text-xl">search</span>
            </div>
            <input
              v-model="searchQuery"
              class="form-input flex w-full min-w-0 flex-1 border-none bg-[#e7f3e8] dark:bg-[#203a22] text-[#0d1b0f] dark:text-white focus:ring-0 h-full placeholder:text-[#4c9a52] px-4 text-base font-normal"
              placeholder="Search products..."
            />
          </div>
        </label>
        <div class="flex gap-2">
          <button class="flex items-center justify-center rounded-lg h-10 w-10 bg-[#e7f3e8] dark:bg-[#203a22] text-[#0d1b0f] dark:text-white hover:bg-[#13ec25]/20 transition-colors">
            <span class="material-symbols-outlined">shopping_cart</span>
          </button>
          <button class="flex items-center justify-center rounded-lg h-10 w-10 bg-[#e7f3e8] dark:bg-[#203a22] text-[#0d1b0f] dark:text-white hover:bg-[#13ec25]/20 transition-colors">
            <span class="material-symbols-outlined">person</span>
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 flex flex-col lg:flex-row max-w-[1440px] mx-auto w-full px-6 py-8 gap-8">
      
      <aside class="w-full lg:w-64 shrink-0 lg:block sticky top-8 h-fit">
        <div class="flex flex-col gap-6 bg-white dark:bg-[#162a18] p-5 rounded-xl border border-[#e7f3e8] dark:border-[#2a4d2e] shadow-sm">
          <div class="flex flex-col">
            <h1 class="text-[#0d1b0f] dark:text-white text-lg font-bold">Filters</h1>
            <p class="text-[#4c9a52] text-xs font-medium">Refine your search</p>
          </div>
          
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2 text-[#0d1b0f] dark:text-white">
              <span class="material-symbols-outlined text-[#13ec25] text-xl">potted_plant</span>
              <p class="text-sm font-bold">ผลิตภัณฑ์</p>
            </div>
            <div class="flex flex-col gap-1">
              <label
                v-for="cat in categories"
                :key="cat.name"
                @click="setCategory(cat.name)"
                :class="selectedCategory === cat.name ? 'bg-[#e7f3e8] dark:bg-[#13ec25]/20' : 'hover:bg-gray-50 dark:hover:bg-white/5'"
                class="flex items-center gap-3 px-2 py-1.5 rounded-lg cursor-pointer transition-colors"
              >
                <span 
                  :class="selectedCategory === cat.name ? 'text-[#13ec25]' : 'text-gray-400'"
                  class="material-symbols-outlined text-lg">
                  {{ selectedCategory === cat.name ? 'check_circle' : cat.icon }}
                </span>
                <p 
                  :class="selectedCategory === cat.name ? 'font-semibold text-[#0d1b0f] dark:text-white' : 'font-medium text-gray-700 dark:text-gray-300'"
                  class="text-xs">
                  {{ cat.name }}
                </p>
              </label>
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2 text-[#0d1b0f] dark:text-white">
              <span class="material-symbols-outlined text-[#13ec25] text-xl">payments</span>
              <p class="text-sm font-bold">Price Range</p>
            </div>
            <div class="px-2 pt-2 pb-6">
              <div class="relative flex w-full h-1 rounded-full bg-[#cfe7d1] dark:bg-[#2a4d2e]">
                <div class="absolute left-[15%] right-[30%] h-full bg-[#13ec25]"></div>
                <div class="absolute left-[15%] -top-1.5 size-4 rounded-full bg-[#13ec25] border-2 border-white dark:border-[#162a18] shadow-md cursor-pointer"></div>
                <div class="absolute right-[30%] -top-1.5 size-4 rounded-full bg-[#13ec25] border-2 border-white dark:border-[#162a18] shadow-md cursor-pointer"></div>
              </div>
              <div class="flex justify-between mt-3 text-[10px] font-bold text-gray-500 dark:text-gray-400">
                <span>$10</span>
                <span>$500+</span>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2 text-[#0d1b0f] dark:text-white">
              <span class="material-symbols-outlined text-[#13ec25] text-xl">label</span>
              <p class="text-sm font-bold">Brand</p>
            </div>
            <div class="flex flex-col gap-2">
              <label v-for="brand in brands" :key="brand" class="flex items-center gap-3 cursor-pointer group">
                <input
                  v-model="selectedBrands"
                  :value="brand"
                  class="checkbox-custom h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-[#13ec25] focus:ring-[#13ec25]/50 transition-all"
                  type="checkbox"
                />
                <span class="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#13ec25]">
                  {{ brand }}
                </span>
              </label>
            </div>
          </div>
          
          <button class="w-full bg-[#13ec25] text-black font-bold text-sm py-2 rounded-lg hover:opacity-90 transition-opacity mt-2">
            Apply Filters
          </button>
        </div>
      </aside>

      <div class="flex-1">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div class="flex flex-wrap items-center gap-2">
            <a class="text-[#4c9a52] dark:text-[#13ec25]/70 text-sm font-medium hover:underline" href="#">Home</a>
            <span class="text-[#4c9a52] dark:text-[#13ec25]/70 text-sm font-medium">/</span>
            <span class="text-[#0d1b0f] dark:text-white text-sm font-bold">Agrochemicals</span>
          </div>
          <div class="flex items-center gap-4">
            <p class="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
              Showing {{ filteredProducts.length }} products
            </p>
            <div class="relative group">
              <button class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#162a18] border border-[#e7f3e8] dark:border-[#2a4d2e] rounded-lg text-sm font-semibold shadow-sm">
                Sort: Most Popular
                <span class="material-symbols-outlined text-lg">expand_more</span>
              </button>
            </div>
          </div>
        </div>

        <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="group relative flex flex-col bg-white dark:bg-[#162a18] rounded-xl border border-[#e7f3e8] dark:border-[#2a4d2e] overflow-hidden shadow-sm hover:shadow-md hover:border-[#13ec25]/30 transition-all"
          >
            <div class="relative aspect-square overflow-hidden bg-gray-100 dark:bg-[#203a22] cursor-pointer">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
              
              <span
                v-if="product.tag"
                :class="product.tagColor"
                class="absolute top-3 left-3 px-2 py-1 text-[10px] font-extrabold rounded-md uppercase"
              >
                {{ product.tag }}
              </span>

              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 </div>
            </div>

            <div class="p-4 flex flex-col gap-1 flex-1">
              <h3 class="text-[#0d1b0f] dark:text-white font-bold text-base leading-tight">
                {{ product.name }}
              </h3>
              <div class="flex items-center justify-between mt-auto pt-4">
                <span class="text-xl font-extrabold text-[#0d1b0f] dark:text-white">
                  {{ product.price }} บาท
                </span>
                <button
                  @click.prevent="addToCart(product)"
                  class="p-2 rounded-full bg-[#e7f3e8] dark:bg-[#203a22] text-[#13ec25] hover:bg-[#13ec25] hover:text-black transition-colors"
                >
                  <span class="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="flex flex-col items-center justify-center py-20 text-gray-500">
           <span class="material-symbols-outlined text-5xl mb-2">search_off</span>
           <p>No products found matching your search.</p>
        </div>

        <div class="flex items-center justify-center gap-2 mt-12 pb-12">
          <button class="flex items-center justify-center h-10 w-10 rounded-lg border border-[#e7f3e8] dark:border-[#2a4d2e] hover:bg-[#13ec25]/10">
            <span class="material-symbols-outlined">chevron_left</span>
          </button>
          <button class="flex items-center justify-center h-10 w-10 rounded-lg bg-[#13ec25] text-black font-bold">1</button>
          <button class="flex items-center justify-center h-10 w-10 rounded-lg border border-[#e7f3e8] dark:border-[#2a4d2e] hover:bg-[#13ec25]/10">2</button>
          <button class="flex items-center justify-center h-10 w-10 rounded-lg border border-[#e7f3e8] dark:border-[#2a4d2e] hover:bg-[#13ec25]/10">3</button>
          <span class="px-2 text-gray-400">...</span>
          <button class="flex items-center justify-center h-10 w-10 rounded-lg border border-[#e7f3e8] dark:border-[#2a4d2e] hover:bg-[#13ec25]/10">
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </main>

    <footer class="bg-white dark:bg-[#162a18] border-t border-[#e7f3e8] dark:border-[#2a4d2e] py-12 px-10">
      <div class="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h4 class="text-xl font-bold mb-2">Grow smarter with our expert tips</h4>
          <p class="text-gray-500 dark:text-gray-400">Join our newsletter for weekly agrochemical guides and market trends.</p>
        </div>
        <div class="flex w-full max-w-md gap-3">
          <input
            class="flex-1 rounded-lg border-gray-300 dark:border-gray-600 bg-transparent focus:ring-[#13ec25] focus:border-[#13ec25]"
            placeholder="Your farm email"
            type="email"
          />
          <button class="px-6 py-2 bg-[#13ec25] text-black font-bold rounded-lg hover:opacity-90 transition-opacity">
            Subscribe
          </button>
        </div>
      </div>
      <div class="max-w-[1440px] mx-auto mt-12 pt-8 border-t border-[#e7f3e8] dark:border-[#2a4d2e] flex flex-col md:flex-row justify-between text-xs text-gray-400 gap-4">
        <p>© 2024 AgroConsult. All rights reserved for global farmers.</p>
        <div class="flex gap-6">
          <a class="hover:text-[#13ec25]" href="#">Terms of Service</a>
          <a class="hover:text-[#13ec25]" href="#">Privacy Policy</a>
          <a class="hover:text-[#13ec25]" href="#">Consultation Terms</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Import Fonts */
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

.font-display {
  font-family: "Manrope", sans-serif;
}

.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}

/* Custom Checkbox Style (from original HTML) */
.checkbox-custom:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
  background-color: #13ec25;
  border-color: #13ec25;
}
</style>
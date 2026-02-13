<script setup>
import { ref, computed, watch } from "vue"
import { useCartStore } from "@/stores/cart"
import { useProductStore } from "@/stores/product"
import Footer from "../components/Footer.vue"
import Navbar2 from "../components/Navbar2.vue"
import { useRoute } from "vue-router"

const route = useRoute()

/* ===== Store ===== */
const cart = useCartStore()
const productStore = useProductStore()

/* ===== State ===== */
const searchQuery = ref("")
const selectedCategory = ref("all")
watch(
  () => route.params.category,
  (newCategory) => {
    if (!newCategory) {
      selectedCategory.value = "all"
    } else {
      selectedCategory.value = newCategory
    }
  },
  { immediate: true }
)

const selectedBrands = ref([])

/* ===== Categories (ต้องมี!) ===== */
const categories = [
  { name: "ทั้งหมด", value: "all", icon: "potted_plant" },
  { name: "สารกำจัดวัชพืช", value: "herbicide", icon: "eco" },
  { name: "สารกำจัดแมลง", value: "insecticide", icon: "pest_control" },
  { name: "สารป้องกันโรค", value: "fungicide", icon: "health_and_safety" }
]

/* ===== Brands ===== */
const brands = [
  "Bayer Crop Science",
  "Syngenta",
  "BASF Agricultural",
  "Corteva Agriscience"
]

/* ===== Products from Store ===== */
const products = computed(() => productStore.$state.products || [])

/* ===== Filter ===== */
const filteredProducts = computed(() => {
  return products.value.filter(product => {

    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())

    const matchesBrand =
      selectedBrands.value.length === 0 ||
      selectedBrands.value.includes(product.brand)

    const matchesCategory =
      selectedCategory.value === "all" ||
      product.category === selectedCategory.value

    return matchesSearch && matchesBrand && matchesCategory
  })
})

/* ===== Cart ===== */
function addToCart(p) {
  cart.addToCart({
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.image
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
  <div class="min-h-screen bg-[#f9f9f9] font-main text-[#0d1b0f]">
    <Navbar2 />

    <main class="max-w-full w-full px-4 md:px-10 py-10 flex flex-col lg:flex-row gap-10">

      <!-- Sidebar -->
      <aside class="w-full lg:w-64 flex-shrink-0 space-y-8">

        <div>
          <h2 class="text-lg font-bold mb-1">Filters</h2>
          <p class="text-xs text-[#4c9a52] font-semibold uppercase tracking-wider">
            ปรับแต่งการค้นหา
          </p>
        </div>

        <!-- Category -->
        <div class="space-y-3">
          <h3 class="text-sm font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-[#13ec25] scale-75">
              category
            </span>
            ประเภทสินค้า
          </h3>

          <div class="flex flex-col gap-1">
            <button
              v-for="cat in categories"
              :key="cat.name"
              @click="selectedCategory = cat.value"
              :class="selectedCategory === cat.value
                ? 'bg-[#13ec25] text-white shadow-md'
                : 'hover:bg-[#E7F3E8] text-gray-600'"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left"
            >
              <span class="material-symbols-outlined text-[18px]">
                {{ cat.icon }}
              </span>
              {{ cat.name }}
            </button>
          </div>
        </div>

        <!-- Brand -->
        <div class="space-y-3">
          <h3 class="text-sm font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-[#13ec25] scale-75">
              verified
            </span>
            แบรนด์สินค้า
          </h3>

          <div class="flex flex-col gap-2.5">
            <label
              v-for="brand in brands"
              :key="brand"
              class="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                v-model="selectedBrands"
                :value="brand"
                class="rounded border-gray-300 text-[#13ec25] focus:ring-[#13ec25]"
              />
              <span class="text-xs font-medium text-gray-500 group-hover:text-[#13ec25] transition-colors">
                {{ brand }}
              </span>
            </label>
          </div>
        </div>

      </aside>

      <!-- Products -->
      <section class="flex-1">

        <div class="flex justify-between items-end mb-8">
          <div>
            <nav class="text-[10px] font-bold uppercase tracking-widest text-[#4c9a52] mb-1">
              Home / Shop
            </nav>
            <h2 class="text-3xl font-black">
              Agrochemicals
            </h2>
          </div>

          <div class="text-sm font-bold text-gray-400">
            แสดง {{ filteredProducts.length }} รายการ
          </div>
        </div>

        <div
          v-if="filteredProducts.length"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >

          <router-link
            v-for="p in filteredProducts"
            :key="p.id"
            :to="`/product/${p.id}`"
            class="group bg-white rounded-[2rem] border border-[#E7F0E8] p-4 transition-all hover:shadow-2xl hover:shadow-[#13ec25]/10 hover:-translate-y-1"
          >

            <div class="relative aspect-square bg-[#F8FAF8] rounded-[1.5rem] mb-4 overflow-hidden flex items-center justify-center">
              <img
                :src="p.image"
                class="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div class="px-2 space-y-1">
              <p class="text-[10px] font-bold text-[#4c9a52] uppercase">
                {{ p.brand }}
              </p>

              <h3 class="font-bold text-lg group-hover:text-[#13ec25] transition-colors text-black">
                {{ p.name }}
              </h3>

              <div class="flex items-center justify-between pt-3">
                <span class="text-xl font-black text-black">
                  {{ p.price.toLocaleString() }} บาท
                </span>

                <button
                  @click.stop.prevent="openConfirm(p)"
                  class="bg-[#F0F4F0] hover:bg-[#13ec25] text-[#13ec25] hover:text-white size-10 rounded-xl flex items-center justify-center transition-all shadow-sm"
                >
                  <span class="material-symbols-outlined text-[20px]">
                    add_shopping_cart
                  </span>
                </button>
              </div>
            </div>

          </router-link>
        </div>

      </section>

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

    </main>

    <Footer />
  </div>
</template>
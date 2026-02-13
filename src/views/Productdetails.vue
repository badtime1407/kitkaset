<script setup>
import { useRoute } from "vue-router"
import { computed } from "vue"
import { useProductStore } from "@/stores/product"
import Navbar2 from "../components/Navbar2.vue"
import Footer from "../components/Footer.vue"

const route = useRoute()
const productStore = useProductStore()

const product = computed(() => {
  return productStore.getById(route.params.id)
})
</script>

<template>
  <div class="bg-[#f5f7f6] min-h-screen">
    <Navbar2 />

    <div v-if="product" class="max-w-6xl mx-auto px-6 py-14">

      <!-- ===================== -->
      <!-- TOP SECTION -->
      <!-- ===================== -->
      <div class="grid md:grid-cols-2 gap-14">

        <!-- LEFT IMAGE -->
        <div class="flex flex-col items-center">
          <img
            :src="product.image"
            class="w-[280px] object-contain"
          />

          <!-- Description Grey Box -->
          <div class="bg-gray-200 mt-6 p-4 text-sm text-gray-700 rounded-md w-full">
            {{ product.description }}
          </div>
        </div>

        <!-- RIGHT INFO -->
        <div>

          <div class="text-xs text-green-600 font-semibold mb-2">
            In Stock
          </div>

          <h1 class="text-3xl font-bold mb-2">
            {{ product.name }}
          </h1>

          <p class="text-gray-500 text-sm mb-3">
            Broad-spectrum eco-friendly protection for organic farming
          </p>

          <!-- Rating -->
          <div class="flex items-center gap-2 mb-4">
            <div class="text-green-500">★★★★★</div>
            <span class="text-sm text-gray-500">
              124 verified reviews
            </span>
          </div>

          <!-- Price -->
          <div class="text-2xl font-bold text-green-600 mb-6">
            ฿ {{ product.price.toLocaleString() }}
          </div>

          <!-- Buttons -->
          <div class="space-y-3 mb-6">
            <button
              class="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md font-semibold"
            >
              Buy Now
            </button>

            <button
              class="w-full border border-green-500 text-green-600 py-3 rounded-md font-semibold hover:bg-green-50"
            >
              Chat with Agronomist
            </button>
          </div>

          <!-- Small Icons -->
          <div class="flex gap-8 text-sm text-gray-500">
            <div class="flex items-center gap-2">
              ✔ Safe for Crops
            </div>
            <div class="flex items-center gap-2">
              ⚡ Fast Delivery
            </div>
          </div>

        </div>
      </div>

      <!-- ===================== -->
      <!-- USAGE TABLE SECTION -->
      <!-- ===================== -->
      <div class="bg-white rounded-xl shadow-sm mt-14 p-8">

        <h3 class="text-lg font-bold mb-6">
          คำแนะนำการใช้งานและอัตราส่วนผสม
        </h3>

        <table class="w-full text-sm">
          <thead class="bg-gray-100 text-gray-600">
            <tr>
              <th class="py-3 px-4 text-left">Crop Type</th>
              <th class="px-4 text-left">Mixing Rate (ml/L)</th>
              <th class="px-4 text-left">Application Frequency</th>
              <th class="px-4 text-left">Pre-Harvest Interval</th>
            </tr>
          </thead>

          <tbody class="text-gray-700">
            <tr class="border-b">
              <td class="py-3 px-4">Vegetables</td>
              <td class="px-4">2.5 ml / Liter</td>
              <td class="px-4">Every 14 days</td>
              <td class="px-4">3 Days</td>
            </tr>
            <tr class="border-b">
              <td class="py-3 px-4">Fruit Trees</td>
              <td class="px-4">5.0 ml / Liter</td>
              <td class="px-4">Every 21 days</td>
              <td class="px-4">7 Days</td>
            </tr>
            <tr>
              <td class="py-3 px-4">Cereal Crops</td>
              <td class="px-4">1.5 ml / Liter</td>
              <td class="px-4">Once per season</td>
              <td class="px-4">15 Days</td>
            </tr>
          </tbody>
        </table>

        <!-- Bottom Icons -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 text-center text-sm text-gray-600">
          <div>🌿 Weed Control</div>
          <div>🛡️ Use Mask</div>
          <div>❄️ Cool Storage</div>
          <div>⚠️ Dilution Only</div>
        </div>

      </div>

<!-- ===================== -->
<!-- REVIEW SECTION -->
<!-- ===================== -->
<div class="mt-16">

  <!-- Header -->
  <div class="flex justify-between items-center mb-6">
    <h3 class="text-lg font-bold">
      Customer Reviews
    </h3>

    <button class="bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-200">
      Write a Review
    </button>
  </div>

  <!-- Review Summary Card -->
  <div class="bg-white rounded-2xl p-8 shadow-sm grid md:grid-cols-2 gap-10">

    <!-- LEFT SCORE -->
    <div>
      <div class="text-5xl font-bold">4.8</div>

      <div class="text-green-500 text-lg mt-2">
        ★★★★★
      </div>

      <div class="text-sm text-gray-500 mt-1">
        124 reviews
      </div>
    </div>

    <!-- RIGHT BARS -->
    <div class="space-y-3 text-sm">

      <!-- 5 Star -->
      <div class="flex items-center gap-3">
        <span class="w-3">5</span>
        <div class="flex-1 bg-gray-200 h-2 rounded-full">
          <div class="bg-green-500 h-2 rounded-full w-[90%]"></div>
        </div>
        <span class="w-10 text-right text-gray-500">90%</span>
      </div>

      <!-- 4 Star -->
      <div class="flex items-center gap-3">
        <span class="w-3">4</span>
        <div class="flex-1 bg-gray-200 h-2 rounded-full">
          <div class="bg-green-500 h-2 rounded-full w-[5%]"></div>
        </div>
        <span class="w-10 text-right text-gray-500">5%</span>
      </div>

      <!-- 3 Star -->
      <div class="flex items-center gap-3">
        <span class="w-3">3</span>
        <div class="flex-1 bg-gray-200 h-2 rounded-full">
          <div class="bg-green-500 h-2 rounded-full w-[2%]"></div>
        </div>
        <span class="w-10 text-right text-gray-500">2%</span>
      </div>

      <!-- 2 Star -->
      <div class="flex items-center gap-3">
        <span class="w-3">2</span>
        <div class="flex-1 bg-gray-200 h-2 rounded-full">
          <div class="bg-green-500 h-2 rounded-full w-[1%]"></div>
        </div>
        <span class="w-10 text-right text-gray-500">1%</span>
      </div>

      <!-- 1 Star -->
      <div class="flex items-center gap-3">
        <span class="w-3">1</span>
        <div class="flex-1 bg-gray-200 h-2 rounded-full">
          <div class="bg-green-500 h-2 rounded-full w-[2%]"></div>
        </div>
        <span class="w-10 text-right text-gray-500">2%</span>
      </div>

    </div>
  </div>

  <!-- ===================== -->
  <!-- PHOTOS SECTION -->
  <!-- ===================== -->
  <div class="mt-8">
    <h4 class="text-sm font-semibold mb-4 text-gray-700">
      Photos from farmers
    </h4>

    <div class="flex gap-4">
      <img src="https://images.unsplash.com/photo-1598514982847-6c60f8b2a1d2" class="w-28 h-20 object-cover rounded-md"/>
      <img src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6" class="w-28 h-20 object-cover rounded-md"/>
      <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399" class="w-28 h-20 object-cover rounded-md"/>
    </div>
  </div>

    <!-- ===================== -->
    <!-- SINGLE REVIEW CARD -->
    <!-- ===================== -->
    <div class="bg-white rounded-2xl shadow-sm p-6 mt-8">

        <div class="flex justify-between items-start mb-3">

        <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
            JD
            </div>

            <div>
            <div class="font-semibold">John Doe</div>
            <div class="text-xs text-gray-500">
                ✔ Verified Purchaser
            </div>
            </div>
        </div>

        <div class="text-green-500">
            ★★★★★
        </div>

        </div>

            <p class="text-gray-600 text-sm">
            ผลิตภัณฑ์ใช้งานได้ดี เห็นผลชัดเจนภายในไม่กี่วัน แนะนำสำหรับเกษตรกรที่ต้องการควบคุมศัตรูพืชอย่างปลอดภัย
            </p>

        <div class="text-xs text-gray-400 mt-4">
            2 weeks ago • 👍 Helpful (12)
        </div>

    </div>

    </div>

    </div>

    <Footer />
  </div>
</template>

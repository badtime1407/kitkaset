<script setup>
import { ref, computed, onMounted } from "vue"
import { useCartStore } from "@/stores/cart"
import { useAddressStore } from "@/stores/address"
import Footer from '../components/Footer.vue';
import Navbar2 from '../components/Navbar2.vue';

const cart = useCartStore()
const addressStore = useAddressStore()

onMounted(() => {
  addressStore.loadAddresses()
})

/* Step */
const currentStep = ref(3)

/* Shipping */
const shipping = ref(45)

/* Payment */
const paymentMethod = ref("card")

const finalTotal = computed(() => {
  return cart.totalPrice + shipping.value
})

function placeOrder() {
  if (!addressStore.selectedAddress) {
    alert("กรุณาเลือกที่อยู่")
    return
  }

  alert("สั่งซื้อสำเร็จ 🎉")
  cart.clear()
}
</script>


<template>
<div class="bg-[#f6f8f6] min-h-screen font-sans">

    <Navbar2 />

  <div class="max-w-6xl mx-auto">

    <!-- Breadcrumb -->
    <p class="text-sm text-gray-400 mb-8">
      Home / Cart / Checkout
    </p>

    <!-- Stepper -->
    <div class="bg-white rounded-xl p-6 mb-10 shadow-sm border">
      <div class="flex justify-between relative">
        <div class="absolute top-5 left-0 w-full h-[2px] bg-gray-200"></div>

        <div class="flex flex-col items-center z-10">
          <div class="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">1</div>
          <span class="text-xs mt-2 font-bold uppercase tracking-wider">Address</span>
        </div>

        <div class="flex flex-col items-center z-10">
          <div class="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">2</div>
          <span class="text-xs mt-2 font-bold uppercase tracking-wider">Logistics</span>
        </div>

        <div class="flex flex-col items-center z-10">
          <div class="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">3</div>
          <span class="text-xs mt-2 font-bold uppercase tracking-wider">Payment</span>
        </div>
      </div>
    </div>

    <div class="grid lg:grid-cols-12 gap-10">

      <!-- LEFT -->
      <div class="lg:col-span-8 space-y-10">

        <!-- 1 Address -->
        <section>
          <h2 class="text-xl font-bold mb-4">1. ที่อยู่จัดส่ง</h2>

          <div v-if="addressStore.selectedAddress"
               class="border-2 border-green-500 bg-green-50 rounded-xl p-6 relative">

            <span class="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold">
              Default
            </span>

            <p class="font-bold text-lg">
              {{ addressStore.selectedAddress.name }}
            </p>

            <p class="text-gray-600 mt-1">
              {{ addressStore.selectedAddress.address }}
            </p>

            <div class="mt-4 flex gap-4 text-xs font-bold text-green-600">
              <button>EDIT</button>
              <button class="text-red-500">REMOVE</button>
            </div>
          </div>

        </section>

        <!-- 2 Shipping -->
        <section>
          <h2 class="text-xl font-bold mb-4">2. วิธีการจัดส่ง</h2>

          <label
            class="block border-2 rounded-xl p-6 cursor-pointer transition"
            :class="shipping===45 ? 'border-green-500 bg-green-50' : 'border-gray-200'">

            <div class="flex justify-between mb-2">
              <span class="font-bold">Express Delivery</span>
              <span class="font-bold text-green-600">฿45.00</span>
            </div>

            <p class="text-sm text-gray-500">
              Estimated Arrival: Tomorrow
            </p>

            <input type="radio" value="45" v-model="shipping" class="hidden">
          </label>

          <label
            class="block border-2 rounded-xl p-6 mt-4 cursor-pointer transition"
            :class="shipping===0 ? 'border-green-500 bg-green-50' : 'border-gray-200'">

            <div class="flex justify-between mb-2">
              <span class="font-bold text-gray-500">Standard Freight</span>
              <span class="font-bold">FREE</span>
            </div>

            <p class="text-sm text-gray-400">
              Estimated Arrival: 3-5 days
            </p>

            <input type="radio" value="0" v-model="shipping" class="hidden">
          </label>
        </section>

        <!-- 3 Payment -->
        <section>
          <h2 class="text-xl font-bold mb-4">3. วิธีการชำระเงิน</h2>

          <div class="bg-white border rounded-xl p-6">

            <!-- Method Buttons -->
            <div class="flex gap-4 mb-6">

              <button
                @click="paymentMethod='card'"
                :class="paymentMethod==='card'
                  ? 'border-green-500 bg-green-50 text-green-600'
                  : 'border-gray-200 text-gray-400'"
                class="flex-1 border-2 rounded-xl p-4 font-bold transition">
                💳 Credit Card
              </button>

              <button
                @click="paymentMethod='bank'"
                :class="paymentMethod==='bank'
                  ? 'border-green-500 bg-green-50 text-green-600'
                  : 'border-gray-200 text-gray-400'"
                class="flex-1 border-2 rounded-xl p-4 font-bold transition">
                🏦 Bank Transfer
              </button>

              <button
                @click="paymentMethod='qr'"
                :class="paymentMethod==='qr'
                  ? 'border-green-500 bg-green-50 text-green-600'
                  : 'border-gray-200 text-gray-400'"
                class="flex-1 border-2 rounded-xl p-4 font-bold transition">
                📱 QR Pay
              </button>
            </div>

            <!-- Card Form -->
            <div v-if="paymentMethod==='card'"
                 class="grid grid-cols-2 gap-4">

              <input class="col-span-2 bg-gray-100 p-3 rounded-lg"
                     placeholder="Cardholder Name">

              <input class="col-span-2 bg-gray-100 p-3 rounded-lg"
                     placeholder="Card Number">

              <input class="bg-gray-100 p-3 rounded-lg"
                     placeholder="MM/YY">

              <input class="bg-gray-100 p-3 rounded-lg"
                     placeholder="CVV">
            </div>

          </div>
        </section>

      </div>

      <!-- RIGHT SUMMARY -->
      <div class="lg:col-span-4">

        <div class="bg-white rounded-xl p-6 shadow-lg sticky top-10">

          <h3 class="text-lg font-bold mb-6">Order Summary</h3>

          <div class="space-y-5 mb-6">

            <div v-for="item in cart.items"
                 :key="item.id"
                 class="flex justify-between items-start">

              <div>
                <p class="font-bold text-sm">
                  {{ item.name }}
                </p>
                <p class="text-xs text-gray-400">
                  {{ item.qty }} x ฿{{ item.price }}
                </p>
              </div>

              <span class="font-bold text-green-600 text-sm">
                ฿{{ item.price * item.qty }}
              </span>
            </div>

          </div>

          <div class="border-t pt-4 space-y-3 text-sm">

            <div class="flex justify-between">
              <span class="text-gray-500">Subtotal</span>
              <span class="font-bold">฿{{ cart.totalPrice }}</span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-500">Shipping</span>
              <span class="font-bold">฿{{ shipping }}</span>
            </div>

            <div class="flex justify-between text-xl font-extrabold text-green-600 pt-3">
              <span>Total</span>
              <span>฿{{ finalTotal }}</span>
            </div>

          </div>

          <button
            @click="placeOrder"
            class="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition shadow-md">
            PLACE ORDER
          </button>

        </div>

      </div>

    </div>

  </div>
  <Footer />

</div>
</template>


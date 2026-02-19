<template>
  <div class="min-h-screen bg-[#f6f8f6] font-sans text-[#0d1b0f]">

    <Navbar2 />

    <main class="max-w-6xl mx-auto px-4 py-10">

      <p class="text-sm text-gray-400 mb-8">
        Home / Cart / Payment
      </p>

      <div class="grid lg:grid-cols-12 gap-10">

        <!-- LEFT -->
        <div class="lg:col-span-8 space-y-10">

          <!-- SHIPPING ADDRESS -->
          <section class="space-y-4">

            <h2 class="text-2xl font-bold flex items-center gap-3">
              <span class="material-symbols-outlined text-[#13ec25]">
                location_on
              </span>
              ที่อยู่จัดส่ง
            </h2>

            <div v-if="addressStore.selectedAddress"
                class="bg-white border-2 border-[#13ec25] rounded-xl p-6 shadow-sm">

              <div class="flex justify-between items-start">

                <div>
                  <p class="font-bold text-lg">
                    {{ addressStore.selectedAddress.name }}
                  </p>

                  <p class="text-gray-600 mt-1">
                    {{ addressStore.selectedAddress.address }}
                  </p>
                </div>

                <span class="bg-[#13ec25] text-white text-xs px-3 py-1 rounded-full font-bold">
                  Default
                </span>

              </div>

              <button
                @click="router.push('/address')"
                class="mt-4 text-sm text-[#13ec25] font-bold hover:underline"
              >
                เปลี่ยนที่อยู่
              </button>

            </div>

            <div v-else
                class="bg-red-50 border border-red-200 rounded-xl p-6 text-red-600">
              ไม่พบที่อยู่จัดส่ง กรุณาเพิ่มที่อยู่ก่อนดำเนินการชำระเงิน
            </div>

          </section>

          <section class="space-y-4">
            <h2 class="text-2xl font-bold flex items-center gap-3">
              <span class="material-symbols-outlined text-[#13ec25]">
                payments
              </span>
              Payment Method
            </h2>

            <div class="bg-white p-6 rounded-xl border shadow-sm space-y-6">

              <div class="flex flex-wrap gap-3">

                <button
                  @click="paymentMethod='card'"
                  :class="methodClass('card')"
                  class="flex-1 min-w-[140px] flex flex-col items-center p-4 rounded-xl border-2 transition"
                >
                  <span class="material-symbols-outlined text-3xl mb-2">
                    credit_card
                  </span>
                  <span class="text-sm font-bold">Credit Card</span>
                </button>

                <button
                  @click="paymentMethod='bank'"
                  :class="methodClass('bank')"
                  class="flex-1 min-w-[140px] flex flex-col items-center p-4 rounded-xl border-2 transition"
                >
                  <span class="material-symbols-outlined text-3xl mb-2">
                    account_balance
                  </span>
                  <span class="text-sm font-bold">Bank Transfer</span>
                </button>

                <button
                  @click="paymentMethod='qr'"
                  :class="methodClass('qr')"
                  class="flex-1 min-w-[140px] flex flex-col items-center p-4 rounded-xl border-2 transition"
                >
                  <span class="material-symbols-outlined text-3xl mb-2">
                    qr_code_2
                  </span>
                  <span class="text-sm font-bold">QR Pay</span>
                </button>

              </div>

              <!-- CARD FORM -->
              <div v-if="paymentMethod==='card'"
                   class="grid md:grid-cols-2 gap-4">

                <input v-model="cardName"
                  class="md:col-span-2 bg-gray-100 p-3 rounded-lg"
                  placeholder="Cardholder Name"/>

                <input v-model="cardNumber"
                  class="md:col-span-2 bg-gray-100 p-3 rounded-lg"
                  placeholder="Card Number"/>

                <input v-model="cardExpiry"
                  class="bg-gray-100 p-3 rounded-lg"
                  placeholder="MM/YY"/>

                <input v-model="cardCVV"
                  class="bg-gray-100 p-3 rounded-lg"
                  placeholder="CVV"/>
              </div>

            </div>
          </section>

        </div>

        <!-- RIGHT SUMMARY -->
        <div class="lg:col-span-4">

          <div class="bg-white rounded-xl p-6 shadow-lg sticky top-10">

            <h3 class="text-xl font-bold mb-6 border-b pb-4">
              Order Summary
            </h3>

            <div class="space-y-4 mb-6">

              <div
                v-for="item in cart.items"
                :key="item.id"
                class="flex gap-4"
              >
                <img :src="item.image"
                     class="w-16 h-16 rounded-lg object-contain bg-gray-50"/>

                <div class="flex-1">
                  <p class="text-sm font-bold">
                    {{ item.name }}
                  </p>

                  <p class="text-xs text-gray-500">
                    {{ item.qty }} x ฿{{ item.price }}
                  </p>

                  <p class="text-sm font-bold text-[#13ec25] mt-1">
                    ฿{{ item.price * item.qty }}
                  </p>
                </div>
              </div>

            </div>

            <div class="space-y-3 border-t pt-4 mb-6 text-sm">

              <div class="flex justify-between">
                <span>Subtotal</span>
                <span>฿{{ cart.totalPrice }}</span>
              </div>

              <div class="flex justify-between">
                <span>Shipping</span>
                <span>฿{{ shipping }}</span>
              </div>

              <div class="flex justify-between">
                <span>Discount</span>
                <span class="text-red-500">-฿{{ discount }}</span>
              </div>

              <div class="flex justify-between">
                <span>Tax (5%)</span>
                <span>฿{{ tax }}</span>
              </div>

              <div class="flex justify-between text-xl font-bold text-[#13ec25] pt-2">
                <span>Total</span>
                <span>฿{{ finalTotal }}</span>
              </div>

            </div>

            <button
              @click="placeOrder"
              class="w-full bg-[#13ec25] text-black font-bold py-4 rounded-xl"
            >
              PLACE ORDER
            </button>

          </div>

        </div>

      </div>

    </main>

    <!-- SUCCESS POPUP -->
    <div v-if="showSuccess"
         class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

      <div class="bg-white rounded-2xl p-8 max-w-xl w-full relative">

        <button @click="confirmOrder"
                class="absolute top-4 right-4 text-gray-400 hover:text-black">
          ✕
        </button>

        <div class="flex justify-center mb-6">
          <div class="w-20 h-20 bg-[#13ec25]/10 rounded-full flex items-center justify-center">
            <span class="material-symbols-outlined text-5xl text-[#13ec25]">
              check_circle
            </span>
          </div>
        </div>

        <h2 class="text-3xl font-bold text-center mb-4">
          ชำระเงินสำเร็จ 🎉
        </h2>

        <div class="text-center mb-6">
          <span class="bg-[#13ec25]/10 text-[#13ec25] px-6 py-2 rounded-full font-bold">
            Order #: {{ orderId }}
          </span>
        </div>

        <div class="bg-gray-50 rounded-xl p-6 space-y-4 text-sm">

          <div class="flex justify-between">
            <span>วันที่จัดส่ง</span>
            <span class="font-bold">{{ deliveryDate }}</span>
          </div>

          <div class="flex justify-between">
            <span>ยอดรวม</span>
            <span class="text-[#13ec25] font-bold">
              ฿{{ finalTotal }}
            </span>
          </div>

          <div>
            <p class="font-bold mb-1">ที่อยู่จัดส่ง</p>

            <div v-if="addressStore.selectedAddress">
              <p>{{ addressStore.selectedAddress.name }}</p>
              <p>{{ addressStore.selectedAddress.address }}</p>
            </div>

            <div v-else class="text-red-500">
              ไม่พบที่อยู่จัดส่ง
            </div>

          </div>

        </div>

        <button
          @click="confirmOrder"
          class="w-full mt-6 bg-[#13ec25] text-black font-bold py-3 rounded-xl"
        >
          ไปหน้าประวัติการสั่งซื้อ
        </button>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useCartStore } from "@/stores/cart"
import { useAddressStore } from "@/stores/address"
import Navbar2 from "@/components/Navbar2.vue"

const cart = useCartStore()
const addressStore = useAddressStore()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  addressStore.loadAddresses()
})

const showSuccess = ref(false)

const shipping = Number(route.query.shipping) || 0
const discount = Number(route.query.discount) || 0

const paymentMethod = ref("card")
const cardName = ref("")
const cardNumber = ref("")
const cardExpiry = ref("")
const cardCVV = ref("")

const tax = computed(() => Math.round(cart.totalPrice * 0.05))

const finalTotal = computed(() => {
  const total = cart.totalPrice + shipping + tax.value - discount
  return total < 0 ? 0 : total
})

const orderId = computed(() =>
  `AGRO-${Math.floor(10000 + Math.random() * 90000)}`
)

const deliveryDate = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() + 3)
  return d.toLocaleDateString("th-TH")
})

function methodClass(type) {
  return paymentMethod.value === type
    ? "border-[#13ec25] bg-[#13ec25]/5"
    : "border-gray-200 hover:border-[#13ec25]/30"
}

function placeOrder() {
  if (paymentMethod.value === "card") {

    if (!addressStore.selectedAddress) {
    alert("กรุณาเลือกที่อยู่จัดส่งก่อน")
    return
  }

    if (!cardName.value || !cardNumber.value || !cardExpiry.value || !cardCVV.value) {
      alert("กรุณากรอกข้อมูลบัตรให้ครบ")
      return
    }
  }
  showSuccess.value = true
}

function confirmOrder() {
  cart.clear()
  showSuccess.value = false
  router.push("/order")
}
</script>

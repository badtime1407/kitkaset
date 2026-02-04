<template>
  <div class="max-w-5xl mx-auto p-6">

    <h1 class="text-2xl font-bold mb-6">
      🛒 Shopping Cart
    </h1>

    <!-- ไม่มีสินค้า -->
    <div
      v-if="cart.items.length === 0"
      class="text-center text-gray-500 py-20"
    >
      ไม่มีสินค้าในตะกร้า
    </div>

    <!-- มีสินค้า -->
    <div v-else>

      <table class="w-full border">

        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left">สินค้า</th>
            <th class="p-3">ราคา</th>
            <th class="p-3">จำนวน</th>
            <th class="p-3">รวม</th>
            <th class="p-3"></th>
          </tr>
        </thead>

        <tbody>

          <tr
            v-for="item in cart.items"
            :key="item.id"
            class="border-t"
          >

            <!-- รูป + ชื่อ -->
            <td class="p-3 flex gap-3 items-center">

              <img
                :src="item.image"
                class="w-16 h-16 object-cover rounded"
              />

              <span>
                {{ item.name }}
              </span>

            </td>

            <!-- ราคา -->
            <td class="text-center">
              {{ item.price }} บาท
            </td>

            <!-- จำนวน -->
            <td class="text-center">

              <div
                class="flex justify-center items-center gap-2"
              >

                <button
                  @click="cart.decrease(item.id)"
                  class="px-2 border rounded"
                >
                  -
                </button>

                <span>
                  {{ item.qty }}
                </span>

                <button
                  @click="cart.increase(item.id)"
                  class="px-2 border rounded"
                >
                  +
                </button>

              </div>

            </td>

            <!-- รวม -->
            <td class="text-center font-semibold">
              {{ item.price * item.qty }} บาท
            </td>

            <!-- ลบ -->
            <td class="text-center">

              <button
                @click="cart.remove(item.id)"
                class="text-red-500"
              >
                ลบ
              </button>

            </td>

          </tr>

        </tbody>
      </table>

      <!-- สรุปราคา -->
      <div
        class="mt-6 flex justify-between items-center"
      >

        <button
          @click="cart.clear()"
          class="text-red-600"
        >
          ล้างตะกร้า
        </button>

        <div class="text-xl font-bold">
            รวมทั้งหมด:
            {{ cart.totalPrice || 0 }} บาท
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>

import { useCartStore } from "@/stores/cart";

const cart = useCartStore();

</script>

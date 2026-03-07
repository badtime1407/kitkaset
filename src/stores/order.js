import { defineStore } from "pinia"

export const useOrderStore = defineStore("order", {

  state: () => ({
    orders: JSON.parse(localStorage.getItem("orders")) || []
  }),

  actions: {

    addOrder(order) {
      this.orders.unshift(order)

      localStorage.setItem(
        "orders",
        JSON.stringify(this.orders)
      )
    }

  }

})
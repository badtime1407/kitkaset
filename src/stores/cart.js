import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem("cart_items")) || [],
  }),

  getters: {
    totalPrice(state) {
      return state.items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );
    },

    totalQty(state) {
      return state.items.reduce(
        (sum, item) => sum + item.qty,
        0
      );
    },
  },

  actions: {
    save() {
      localStorage.setItem(
        "cart_items",
        JSON.stringify(this.items)
      );
    },

    addToCart(product) {
      const item = this.items.find(i => i.id === product.id);

      if (item) {
        item.qty++;
      } else {
        this.items.push({
          ...product,
          qty: 1,
        });
      }

      this.save();
    },

    increase(id) {
      const item = this.items.find(i => i.id === id);
      if (item) item.qty++;
      this.save();
    },

    decrease(id) {
      const item = this.items.find(i => i.id === id);
      if (item && item.qty > 1) item.qty--;
      this.save();
    },

    remove(id) {
      this.items = this.items.filter(i => i.id !== id);
      this.save();
    },

    clear() {
      this.items = [];
      this.save();
    },
  },
});

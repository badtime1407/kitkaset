import { defineStore } from "pinia";

const STORAGE_KEY = "address_book";

export const useAddressStore = defineStore("address", {
  state: () => ({
    addresses: [],
    selectedAddress: null,
  }),

  actions: {
    loadAddresses() {
      const data = localStorage.getItem(STORAGE_KEY);

      if (data) {
        this.addresses = JSON.parse(data);
        const def = this.addresses.find(a => a.default);
        if (def) this.selectedAddress = def;
      }
    },

    setDefault(index) {
      this.addresses.forEach(a => a.default = false);
      this.addresses[index].default = true;
      this.selectedAddress = this.addresses[index];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.addresses));
    },
  },
});

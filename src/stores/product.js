import { defineStore } from "pinia"

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [

      /* ===================================== */
      /* ===== สารกำจัดวัชพืช (herbicide) ===== */
      /* ===================================== */

      {
        id: 1,
        name: "อะบาเมกติน",
        price: 320,
        image: "https://max-ag.com/wp-content/uploads/2022/02/%E0%B8%AD%E0%B8%B0%E0%B8%9A%E0%B8%B2%E0%B9%80%E0%B8%A1%E0%B8%81%E0%B8%95%E0%B8%B4%E0%B8%99.png",
        brand: "Bayer Crop Science",
        category: "herbicide",
        description: "สารกำจัดศัตรูพืชประสิทธิภาพสูง ใช้ควบคุมแมลงและไรในพืชผักและไม้ผล เห็นผลรวดเร็วภายใน 24-48 ชั่วโมง"
      },
      {
        id: 2,
        name: "เอราบาส",
        price: 350,
        image: "https://erawanagri.com/wp-content/uploads/2022/04/erabas-640-240x300.png",
        brand: "Syngenta",
        category: "herbicide"
      },
      {
        id: 3,
        name: "ฟีโนบูคาร์บ",
        price: 390,
        image: "https://www.qmaxagrotech.com/images/content/original-1727402473253.png",
        brand: "Syngenta",
        category: "herbicide"
      },
      {
        id: 4,
        name: "คิวแม็กพินาโซล",
        price: 620,
        image: "https://www.qmaxagrotech.com/images/content/original-1685436057325.png",
        brand: "BASF Agricultural",
        category: "herbicide"
      },
      {
        id: 5,
        name: "พรีมิส เอสซี 200",
        price: 180,
        image: "https://www.cheminpestcontrol.com/cdn/shop/products/Premise-SC200_1024x1024.png?v=1579663268",
        brand: "Bayer Crop Science",
        category: "herbicide"
      },

      /* ===================================== */
      /* ===== สารกำจัดแมลง (insecticide) ===== */
      /* ===================================== */

      {
        id: 6,
        name: "ควิกไบท์",
        price: 1550,
        image: "https://www.cheminpestcontrol.com/cdn/shop/products/quick-bayt-1_1024x1024.png?v=1543376716",
        brand: "Bayer Crop Science",
        category: "insecticide"
      },
      {
        id: 7,
        name: "วีวีฟอส",
        price: 280,
        image: "https://i0.wp.com/tkagrogroup.com/wp-content/uploads/2021/08/%E0%B8%A7%E0%B8%B5%E0%B8%A7%E0%B8%B5%E0%B8%9F%E0%B8%AD%E0%B8%AA.png",
        brand: "Syngenta",
        category: "insecticide"
      },
      {
        id: 8,
        name: "โซเซียน่า",
        price: 450,
        image: "https://www.qmaxagrotech.com/images/content/original-1685331075682.png",
        brand: "BASF Agricultural",
        category: "insecticide"
      },
      {
        id: 9,
        name: "ดอสซ์",
        price: 1350,
        image: "https://www.pitsulin.com/wp-content/uploads/2025/01/unnamed-file-1.png",
        brand: "Bayer Crop Science",
        category: "insecticide"
      },
      {
        id: 10,
        name: "ฟิพ-การ์ด เอสซี",
        price: 520,
        image: "https://www.pitsulin.com/wp-content/uploads/2021/04/unnamed-file-12.png",
        brand: "Syngenta",
        category: "insecticide"
      },

      /* ===================================== */
      /* ===== สารป้องกันโรค (fungicide) ===== */
      /* ===================================== */

      {
        id: 11,
        name: "บลูชิลด์",
        price: 650,
        image: "https://www.pitsulin.com/wp-content/uploads/2021/04/unnamed-file-2.png",
        brand: "Bayer Crop Science",
        category: "fungicide"
      },
      {
        id: 12,
        name: "คิวโทมอร์ฟ",
        price: 1050,
        image: "https://www.qmaxagrotech.com/images/ready-template/crop-1685349655467.png",
        brand: "Syngenta",
        category: "fungicide"
      },
      {
        id: 13,
        name: "บลูโล",
        price: 180,
        image: "https://www.mobil-ag.com/wp-content/uploads/2021/08/%E0%B8%9A%E0%B8%A5%E0%B8%B9%E0%B9%82%E0%B8%A5-1024x1024.png",
        brand: "Corteva Agriscience",
        category: "fungicide"
      }

    ]
  }),

  getters: {
    getByCategory: (state) => {
      return (category) => {
        if (!category || category === "all") {
          return state.products
        }
        return state.products.filter(p => p.category === category)
      }
    },

    getById: (state) => {
      return (id) => {
        return state.products.find(p => p.id == id)
      }
    }
  }
})

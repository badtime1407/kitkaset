<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showConfirm = ref(false)
const deleteIndex = ref(null)
const STORAGE_KEY = 'address_book'

/* Error Popup */
const showError = ref(false)
const errorMessage = ref('')

/* Sidebar Menu */
const navigationItems = [
  { name: 'My Profile', icon: 'person', path: '/profile' },
  { name: 'Address Book', icon: 'location_on', path: '/address' },
  { name: 'Order History', icon: 'inventory_2', path: '/Order' },
  { name: 'Account Settings', icon: 'settings', path: '/Setting' },
]

const isActive = (path) => route.path === path

/* Address Data */
const addresses = ref([])

/* Load from localStorage */
onMounted(() => {
  const data = localStorage.getItem(STORAGE_KEY)

  if (data) {
    addresses.value = JSON.parse(data)
  } else {
    addresses.value = [
      {
        name: 'Main Farm',
        contact: 'John Miller',
        phone: '081-234-5678',
        address: '123 Green Road, Chiang Mai',
        default: true
      }
    ]
  }
})

/* Auto Save */
watch(
  addresses,
  (newVal) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(newVal)
    )
  },
  { deep: true }
)

/* Modal */
const showModal = ref(false)
const editIndex = ref(null)

const form = reactive({
  name: '',
  contact: '',
  phone: '',
  address: ''
})

const formError = ref('')

/* Functions */
const openAdd = () => {
  clearForm()
  formError.value = ''
  editIndex.value = null
  showModal.value = true
}

const openEdit = (index) => {
  const data = addresses.value[index]

  form.name = data.name
  form.contact = data.contact
  form.phone = data.phone
  form.address = data.address

  editIndex.value = index
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  formError.value = ''
}

const clearForm = () => {
  form.name = ''
  form.contact = ''
  form.phone = ''
  form.address = ''
}

const saveAddress = () => {

  // Validate
  if (
    !form.name.trim() ||
    !form.contact.trim() ||
    !form.phone.trim() ||
    !form.address.trim()
  ) {

    errorMessage.value = 'กรุณากรอกข้อมูลให้ครบทุกช่อง'
    showError.value = true
    return
  }


  if (editIndex.value === null) {

    addresses.value.push({
      ...form,
      default: false
    })

  } else {

    addresses.value[editIndex.value] = {
      ...addresses.value[editIndex.value],
      ...form
    }

  }

  closeModal()
}



const deleteAddress = (index) => {
  deleteIndex.value = index
  showConfirm.value = true
}

const confirmDelete = () => {
  addresses.value.splice(deleteIndex.value, 1)

  showConfirm.value = false
  deleteIndex.value = null
}

const cancelDelete = () => {
  showConfirm.value = false
  deleteIndex.value = null
}

const setDefault = (index) => {

  addresses.value.forEach(a => a.default = false)
  addresses.value[index].default = true

}
</script>

<template>
<div class="flex min-h-screen w-full bg-[#F8F9F8] font-sans">

  <!-- Sidebar -->
  <aside class="w-64 bg-white hidden lg:flex flex-col border-r border-gray-100 sticky top-0 h-screen">

    <div class="p-6 flex flex-col h-full">

      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-3 mb-10 group no-underline">

        <div class="bg-[#00D632] p-2 rounded-xl">
          <span class="material-symbols-outlined text-white">agriculture</span>
        </div>

        <div>
          <h1 class="font-black text-lg">กิจเกษตร</h1>
          <p class="text-[#00D632] text-[9px] font-bold">Consultant</p>
        </div>

      </router-link>


      <!-- Menu -->
      <nav class="flex flex-col gap-1.5 grow">

        <router-link
          v-for="item in navigationItems"
          :key="item.name"
          :to="item.path"
          :class="[
            'flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-bold text-sm no-underline transition-all',
            isActive(item.path)
              ? 'bg-[#EBF9F1] text-[#00D632]'
              : 'text-gray-400 hover:bg-gray-50'
          ]"
        >

          <span class="material-symbols-outlined text-[22px]">
            {{ item.icon }}
          </span>

          {{ item.name }}

        </router-link>

      </nav>


      <!-- Logout -->
      <div class="pt-4 border-t">

        <router-link
          to="/login"
          class="flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-50 rounded-xl font-bold no-underline"
        >

          <span class="material-symbols-outlined">logout</span>
          Logout

        </router-link>

      </div>

    </div>
  </aside>


  <!-- Main -->
  <main class="flex-1 p-10 xl:p-16 overflow-y-auto">

    <div class="max-w-[1200px] mx-auto">

      <!-- Header -->
      <div class="flex justify-between items-center mb-12">

        <div>
          <h2 class="text-5xl font-extrabold mb-2">
            Address Book
          </h2>

          <p class="text-gray-400">
            จัดการที่อยู่สำหรับจัดส่งสินค้า
          </p>
        </div>


        <button
          @click="openAdd"
          class="bg-[#00D632] text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition"
        >
          + เพิ่มที่อยู่
        </button>

      </div>


      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">


        <!-- Card -->
        <div
          v-for="(item,index) in addresses"
          :key="index"
          class="bg-white p-6 rounded-[32px] shadow border relative"
        >

          <!-- Default Badge -->
          <div
            v-if="item.default"
            class="absolute top-4 right-4 bg-[#00D632] text-white text-xs px-3 py-1 rounded-full font-bold"
          >
            Default
          </div>


          <h3 class="text-xl font-black mb-1">
            {{ item.name }}
          </h3>

          <p class="text-gray-600 text-sm">
            {{ item.contact }}
          </p>

          <p class="text-gray-600 text-sm">
            {{ item.phone }}
          </p>

          <p class="text-gray-400 mt-3 text-sm">
            {{ item.address }}
          </p>


          <!-- Buttons -->
          <div class="flex justify-between items-center mt-6 pt-4 border-t">

            <div class="space-x-4">

              <button
                @click="openEdit(index)"
                class="text-blue-500 text-sm font-bold"
              >
                แก้ไข
              </button>

              <button
                @click="deleteAddress(index)"
                class="text-rose-500 text-sm font-bold"
              >
                ลบ
              </button>

            </div>


            <button
              v-if="!item.default"
              @click="setDefault(index)"
              class="text-[#00D632] text-sm font-bold"
            >
              ตั้ง Default
            </button>

          </div>

        </div>

      </div>

    </div>

  </main>


  <!-- Modal -->
  <div v-if="showModal" class="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

    <div class="bg-white w-full max-w-lg rounded-[32px] p-7">

      <h3 class="text-3xl font-black mb-8">
        {{ editIndex === null ? 'เพิ่มที่อยู่' : 'แก้ไขที่อยู่' }}
      </h3>

      <div class="space-y-4 rounded-xl">
        <!-- Error Popup -->
        <div v-if="showError" class="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div class="bg-white w-full max-w-sm rounded-2xl p-6 text-center">
                <span class="material-symbols-outlined text-red-500 text-5xl mb-3 block">
                error
                </span>
                <h3 class="text-xl font-bold mb-2">
                แจ้งเตือน
                </h3>
                <p class="text-gray-500 mb-6">
                {{ errorMessage }}
                </p>

                <button
                @click="showError = false"
                class="bg-[#00D632] text-white px-8 py-3 rounded-xl font-bold"
                >
                ตกลง
                </button>

            </div>
        </div>

        <div>
            <h1 class="text-sm font-extrabold mb-2">ชื่อที่อยู่</h1>
            <input v-model="form.name" class="w-full h-14 px-5 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-green-300"/>
        </div>

        <div>  
            <h1 class="text-sm font-extrabold mb-2">ชื่อผู้ติดต่อ</h1>
            <input v-model="form.contact" class="w-full h-14 px-5 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-green-300"/>
        </div>
        <div>
            <h1 class="text-sm font-extrabold mb-2">เบอร์โทร</h1>
            <input v-model="form.phone" class="w-full h-14 px-5 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-green-300"/>
        </div>
        
        <div>
            <h1 class="text-sm font-extrabold mb-2">ที่อยู่</h1>   
            <textarea v-model="form.address" rows="3" class="w-full px-5 py-3 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-green-300"></textarea>
        </div>
      </div>


      <div class="flex justify-end gap-4 mt-8">

        <button
          @click="closeModal"
          class="px-6 py-3 font-bold text-gray-400"
        >
          ยกเลิก
        </button>

        <button
          @click="saveAddress"
          class="px-8 py-3 bg-[#00D632] text-white rounded-xl font-bold"
        >
          บันทึก
        </button>

      </div>

    </div>

  </div>
  <!-- Confirm Delete Modal -->
    <div v-if="showConfirm" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div class="bg-white w-full max-w-md rounded-3xl p-8 shadow-xl">

            <div class="text-center">

            <span class="material-symbols-outlined text-6xl text-rose-500 mb-4">
                warning
            </span>

            <h3 class="text-2xl font-black mb-2">
                ยืนยันการลบ
            </h3>

            <p class="text-gray-500 mb-8">
                คุณแน่ใจหรือไม่ว่าต้องการลบที่อยู่นี้?
            </p>

            </div>
            <div class="flex justify-center gap-4">

            <button
                @click="cancelDelete"
                class="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100"
            >
                ยกเลิก
            </button>

            <button
                @click="confirmDelete"
                class="px-8 py-3 bg-rose-500 text-white rounded-xl font-bold hover:bg-rose-600"
            >
                ลบ
            </button>

        </div>

    </div>
    </div>
</div>
</template>

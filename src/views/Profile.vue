<script setup>
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'

const route = useRoute()

// ข้อมูลโปรไฟล์ผู้ใช้
const userProfile = reactive({
  fullName: '',
  phone: '',
  email: '',
  dob: '',
  avatar: 'https://cdn-icons-png.freepik.com/512/10130/10130567.png' 
})

// ข้อมูลเมนูนำทาง (ใช้ path ในการเช็ก active)
const navigationItems = [
  { name: 'My Profile', icon: 'person', path: '/profile' },
  { name: 'Address Book', icon: 'location_on', path: '/Address' },
  { name: 'Order History', icon: 'inventory_2', path: '/Order' },
  { name: 'Account Settings', icon: 'settings', path: '/Setting' },
]

// ฟังก์ชันเช็กว่า Path ปัจจุบันตรงกับเมนูไหน
const isActive = (path) => route.path === path

// ข้อมูลตัวเลือกพืชผล
const cropOptions = ref([
  { id: 'rice', name: 'Rice', icon: 'eco', selected: true },
  { id: 'sugarcane', name: 'Sugarcane', icon: 'grass', selected: true },
  { id: 'corn', name: 'Corn', icon: 'potted_plant', selected: false },
  { id: 'wheat', name: 'Wheat', icon: 'grain', selected: false },
  { id: 'soy', name: 'Soybean', icon: 'spa', selected: false },
])

const savePreferences = () => {
  const selectedCrops = cropOptions.value.filter(c => c.selected).map(c => c.name)
  alert(`บันทึกข้อมูลเรียบร้อยแล้ว!\nพืชที่เลือก: ${selectedCrops.join(', ')}`)
}
</script>

<template>
  <div class="flex min-h-screen w-full bg-[#F8F9F8] font-sans">
    
    <Sidebar />

    <main class="flex-1 p-8 lg:p-14 xl:p-20 overflow-y-auto">
      <div class="max-w-[1200px] mx-auto"> 
        <div class="mb-14">
          <h2 class="text-[#1A3128] text-5xl font-extrabold mb-4 tracking-tight">ข้อมูลส่วนบุคคล</h2>
          <div class="flex items-center gap-3">
             <span class="w-2 h-2 rounded-full bg-[#00D632]"></span>
             <p class="text-gray-400 text-lg font-medium">จัดการข้อมูลส่วนตัวของคุณเพื่อให้ได้ผลผลิตที่แม่นยำที่สุด</p>
          </div>
        </div>

        <div class="bg-white rounded-[48px] shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-gray-100/50 overflow-hidden">
          
          <div class="p-12 lg:p-20 border-b border-gray-50 bg-gradient-to-br from-white to-[#FAFCFA]">
            <div class="flex flex-col md:flex-row items-center gap-14">
              <div class="relative group">
                <div 
                  class="h-44 w-44 lg:h-52 lg:w-52 rounded-[48px] bg-cover bg-center border-[8px] border-white shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-2"
                  :style="{ backgroundImage: `url(${userProfile.avatar})` }"
                ></div>
                <label class="absolute -bottom-3 -right-3 bg-[#00D632] text-white p-4 rounded-2xl cursor-pointer shadow-xl border-4 border-white hover:bg-[#00C22D] hover:scale-110 transition-all">
                  <span class="material-symbols-outlined text-2xl block font-bold">photo_camera</span>
                  <input type="file" class="hidden" />
                </label>
              </div>
              <div class="text-center md:text-left">
                <h3 class="text-[#1A3128] text-3xl font-black mb-3">Farmer Profile Photo</h3>
                <p class="text-gray-400 text-base mb-8 font-medium">JPG, PNG or GIF. Recommended size 400×400px.</p>
                <div class="flex gap-5 justify-center md:justify-start">
                  <button class="bg-[#00D632] text-white text-base font-bold px-10 py-4 rounded-2xl hover:shadow-xl hover:shadow-green-200 hover:-translate-y-1 transition-all">Upload New</button>
                  <button class="text-gray-400 text-base font-bold px-8 py-4 hover:text-rose-500 transition-colors">Remove</button>
                </div>
              </div>
            </div>
          </div>

          <div class="p-12 lg:p-20">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 mb-20">
              <div v-for="(label, key) in {fullName: 'ชื่อ-นามสกุล', phone: 'หมายเลขโทรศัพท์', email: 'อีเมล', dob: 'วันเกิด'}" :key="key" class="flex flex-col gap-4">
                <label class="text-[#1A3128] text-base font-black ml-1 opacity-90 uppercase tracking-widest ">{{ label }}</label>
                <input 
                  v-model="userProfile[key]" 
                  :type="key === 'email' ? 'email' : key === 'dob' ? 'date' : 'text'"
                  class="w-full rounded-2xl border-2 border-transparent bg-[#F4F7F5] h-16 px-8 text-lg font-semibold text-gray-700 outline-none focus:border-[#00D632]/30 focus:bg-white focus:ring-4 focus:ring-[#00D632]/5 transition-all" 
                />
              </div>
            </div>

            <div class="mb-10">
              <h3 class="text-3xl font-black text-[#1A3128] mb-3">พืชผลของฉัน</h3>
              <p class="text-gray-400 text-base font-medium">เลือกพันธุ์พืชที่คุณปลูกเพื่อรับคำปรึกษาที่ตรงจุดและแม่นยำ</p>
            </div>
            
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-8">
              <div v-for="crop in cropOptions" :key="crop.id" class="relative group">
                <input type="checkbox" :id="crop.id" v-model="crop.selected" class="peer hidden" />
                <label :for="crop.id" 
                  class="flex flex-col items-center justify-center py-12 rounded-[40px] border-2 border-transparent bg-[#F4F7F5] peer-checked:border-[#00D632] peer-checked:bg-[#EBF9F1] cursor-pointer transition-all hover:bg-white hover:shadow-2xl hover:-translate-y-2">
                  <div class="mb-5 transition-colors" :class="crop.selected ? 'text-[#00D632]' : 'text-gray-300'">
                    <span class="material-symbols-outlined text-5xl">{{ crop.icon }}</span>
                  </div>
                  <span class="text-base font-black" :class="crop.selected ? 'text-[#1A3128]' : 'text-gray-400'">{{ crop.name }}</span>
                </label>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row justify-end items-center gap-10 mt-20 pt-12 border-t border-gray-100">
              <button class="text-lg font-bold text-gray-400 hover:text-gray-600 transition-colors">Cancel</button>
              <button @click="savePreferences" class="w-full sm:w-auto px-20 py-5 text-lg font-black text-white bg-[#00D632] rounded-[24px] shadow-2xl shadow-green-200 hover:brightness-105 hover:-translate-y-1 active:scale-95 transition-all">
                Save Preferences
              </button>
            </div>
          </div>
        </div>

        <div class="mt-16 bg-[#1A3128] rounded-[40px] p-12 flex flex-col xl:flex-row items-center justify-between gap-8 shadow-3xl">
          <div class="flex items-center gap-8 text-center md:text-left">
            <div class="bg-[#00D632] p-5 rounded-3xl shadow-lg rotate-3">
              <span class="material-symbols-outlined text-white text-4xl block">psychology</span>
            </div>
            <div>
              <h4 class="text-white font-bold text-2xl mb-2">ต้องการวิเคราะห์ผลผลิตอย่างละเอียด?</h4>
              <p class="text-gray-400 text-lg font-medium">พูดคุยกับผู้เชี่ยวชาญเพื่อวางแผนการปลูกในฤดูกาลหน้าได้ทันที</p>
            </div>
          </div>
          <button class="bg-white text-[#1A3128] px-12 py-5 rounded-[20px] text-lg font-black hover:bg-[#00D632] hover:text-white shadow-xl transition-all whitespace-nowrap">
            Book Now
          </button>
        </div>

      </div>
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');

body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #1A3128;
  margin: 0;
  -webkit-font-smoothing: antialiased;
}

.no-underline {
  text-decoration: none;
}

::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: #f8f9f8; }
::-webkit-scrollbar-thumb { background: #00D632; border-radius: 10px; border: 3px solid #f8f9f8; }
</style>
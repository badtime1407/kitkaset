<script setup>
import { ref, computed } from 'vue';
import Navbar2 from '../components/Navbar2.vue';
import Footer from '../components/Footer.vue';

// --- 1. State & Data ---
const searchQuery = ref('');
const fileInput = ref(null);
const toasts = ref([]);
const isModalOpen = ref(false);
const modalData = ref({ title: '', content: '' });

// ข้อมูลจำลอง
const diseases = ref([
  {
    id: 1,
    name: 'สนิมใบ',
    engName: 'Leaf Rust (Fungal)',
    image: 'https://lirp.cdn-website.com/4488033e/dms3rep/multi/opt/algal+spot-09-640w.jpg', 
    advice: 'ใช้สารป้องกันกำจัดเชื้อราที่มีส่วนผสมของ Tebuconazole และควรเว้นระยะห่างระหว่างต้นเพื่อลดความชื้น'
  },
  {
    id: 2,
    name: 'โรคราน้ำค้าง',
    engName: 'Downy Mildew',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Powdery_Mildew_Acer_DK43_(1).jpg/3840px-Powdery_Mildew_Acer_DK43_(1).jpg',
    advice: 'กำจัดใบที่เป็นโรคออกจากแปลงทันที พ่นด้วยน้ำผสมเบกกิ้งโซดาหรือกำมะถันผง'
  },
  {
    id: 3,
    name: 'โรครากเน่า',
    engName: 'Root Rot',
    image: 'https://ephytia.inra.fr/en/IC/36116/Phytophthora-racines-Tomate3',
    advice: 'ปรับปรุงการระบายน้ำในดิน งดให้น้ำจนกว่าดินจะแห้ง ใช้เชื้อไตรโคเดอร์มาช่วยควบคุมเชื้อรา'
  },
  {
    id: 4,
    name: 'ข้าวโพดต้นดอกดำ',
    engName: 'Corn Smut',
    image: 'https://www.agrifind.fr/alertes/wp-content/uploads/2017/12/MI_Fusa-graminearum_1-min.jpg',
    advice: 'เด็ดถุงปมเชื้อราออกก่อนที่จะแตกกระจาย สลับปลูกพืชหมุนเวียนในฤดูถัดไป'
  }
]);

// --- 2. Computed ---
const filteredDiseases = computed(() => {
  if (!searchQuery.value) return diseases.value;
  const lowerQuery = searchQuery.value.toLowerCase();
  return diseases.value.filter(d => 
    d.name.includes(searchQuery.value) || 
    d.engName.toLowerCase().includes(lowerQuery)
  );
});

// --- 3. Actions ---

const goToChat = () => {
  console.log("Navigating to chat...");
  window.location.href = '/chat'; 
};

const showToast = (message) => {
  const id = Date.now();
  toasts.value.push({ id, message });
  setTimeout(() => toasts.value = toasts.value.filter(t => t.id !== id), 3000);
};

const openModal = (title, content) => {
  modalData.value = { title, content };
  isModalOpen.value = true;
};

const triggerFileUpload = () => fileInput.value.click();

const handleFileChange = (e) => {
  if (e.target.files[0]) {
    showToast('กำลังอัปโหลดรูปภาพ...');
    setTimeout(() => {
      openModal('ผลการวิเคราะห์ AI', `
        <div class="text-center">
          <span class="material-symbols-outlined text-6xl text-green-500 mb-2">check_circle</span>
          <p class="text-xl font-bold mb-2">ตรวจพบ: ขาดธาตุไนโตรเจน</p>
          <p class="text-gray-600">แนะนำให้ใส่ปุ๋ยยูเรีย หรือปุ๋ยคอกเพื่อเพิ่มไนโตรเจนในดิน</p>
        </div>
      `);
    }, 2000);
  }
};
</script>

<template>
  <div class="font-prompt min-h-screen bg-[#F8FAF8] text-gray-800 relative">
    <navbar2 />
    
    <main class="max-w-5xl mx-auto px-4 py-10 flex flex-col items-center">
      
      <div class="w-full flex justify-between items-end mb-8">
        <div>
          <h1 class="text-3xl md:text-4xl font-bold mb-2 text-gray-900">ศูนย์ให้คำปรึกษาเกี่ยวกับพืช</h1>
          <p class="text-gray-500">คำแนะนำการวินิจฉัยจากผู้เชี่ยวชาญและการสนับสนุนแบบเรียลไทม์สำหรับพืชของคุณ</p>
        </div>
        
        <button @click="goToChat" class="hidden md:flex bg-[#13ec25] hover:bg-green-500 text-black font-bold px-6 py-3 rounded-lg items-center gap-2 shadow-sm transition-transform active:scale-95">
          <span class="material-symbols-outlined">chat</span>
          Start Chat
        </button>
      </div>

      <div class="w-full mb-10">
        <div class="relative w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex items-center h-14 px-4 focus-within:ring-2 focus-within:ring-[#13ec25]/50 transition-all">
          <span class="material-symbols-outlined text-gray-400 mr-3">search</span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="ค้นหาอาการ (เช่น จุดสีเหลือง ใบเหี่ยว)..." 
            class="w-full h-full border-none focus:ring-0 text-gray-700 placeholder-gray-400 text-base"
          >
        </div>
      </div>

      <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        
        <div @click="goToChat" class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow group text-left">
          <div class="w-full h-48 bg-gray-200 rounded-xl mb-4 overflow-hidden relative">
             <img src="/ER1.png" class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" alt="Consultant">
             <div class="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-green-700 flex items-center gap-1">
                <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
             </div>
          </div>
          <div class="flex items-center gap-2 mb-1">
            <span class="material-symbols-outlined text-[#13ec25]">support_agent</span>
            <h3 class="font-bold text-lg text-gray-900">ปรึกษาผู้เชี่ยวชาญ</h3>
          </div>
          <p class="text-gray-500 text-sm">ผู้เชี่ยวชาญที่จะให้คำปรึกษาเกี่ยวกับอาการของพืชในสวนคุณ</p>
        </div>

        <div @click="triggerFileUpload" class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow group">
          <div class="w-full h-48 bg-gray-100 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden group-hover:bg-gray-200 transition-colors">
             <span class="material-symbols-outlined text-8xl text-gray-300 group-hover:text-[#13ec25] transition-colors duration-300">cloud_upload</span>
             <div class="absolute bottom-0 w-full text-center pb-4 text-gray-400 font-bold tracking-wider">UPLOAD</div>
          </div>
          <div class="flex items-center gap-2 mb-1">
            <span class="material-symbols-outlined text-[#13ec25]">add_a_photo</span>
            <h3 class="font-bold text-lg">อัปโหลดอาการ</h3>
          </div>
          <p class="text-gray-500 text-sm">Use our AI diagnostic tool. Snap a photo of the affected leaf for instant identification.</p>
        </div>

      </div>

      <div class="w-full mb-12">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold">โรคพืชที่พบบ่อย</h2>
          <a href="#" class="text-[#13ec25] text-sm font-bold flex flex-col items-end leading-tight hover:underline">
            <span>View</span>
            <span>All</span>
          </a>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="disease in filteredDiseases" :key="disease.id" class="bg-white p-4 rounded-xl border border-gray-100 hover:shadow-lg transition-all flex flex-col items-center text-center group">
            
            <div class="w-full aspect-square rounded-full mb-4 overflow-hidden border-4 border-white shadow-md relative mx-auto">
               <img 
                 :src="disease.image" 
                 :alt="disease.name" 
                 class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
               >
            </div>
            
            <h3 class="font-bold text-gray-900 mb-0.5 w-full text-left pl-1">{{ disease.name }}</h3>
            <p class="text-xs text-gray-400 mb-4 w-full text-left pl-1">{{ disease.engName }}</p>
            
            <button @click="openModal(disease.name, `<p>${disease.advice}</p>`)" class="w-full py-1.5 bg-[#effdf0] text-[#13ec25] text-xs font-bold rounded-lg hover:bg-[#13ec25] hover:text-white transition-colors">
              ดูคำแนะนำ
            </button>
          </div>
        </div>
      </div>

      <div class="w-full bg-[#effdf0] rounded-2xl p-8 md:p-10">
        <h2 class="text-xl font-bold mb-6">ทำไมต้องปรึกษาเรา?</h2>
        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <div class="bg-[#13ec25] rounded-full p-0.5 mt-0.5">
               <span class="material-symbols-outlined text-white text-sm block font-bold">check</span>
            </div>
            <p class="text-sm text-gray-600">มีนักเกษตรศาสตร์ที่ได้รับการรับรองมากกว่า 500 คนพร้อมให้บริการตลอด 24 ชั่วโมงทุกวัน</p>
          </div>
          <div class="flex items-start gap-3">
            <div class="bg-[#13ec25] rounded-full p-0.5 mt-0.5">
               <span class="material-symbols-outlined text-white text-sm block font-bold">check</span>
            </div>
            <p class="text-sm text-gray-600">แนวทางการรักษาที่มีหลักฐาน</p>
          </div>
          <div class="flex items-start gap-3">
            <div class="bg-[#13ec25] rounded-full p-0.5 mt-0.5">
               <span class="material-symbols-outlined text-white text-sm block font-bold">check</span>
            </div>
            <p class="text-sm text-gray-600">บูรณาการโดยตรงกับโซลูชันเคมีที่เป็นมิตรกับสิ่งแวดล้อม</p>
          </div>
        </div>
      </div>

    </main>
    
    <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileChange">
    
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" @click.self="isModalOpen = false">
      <div class="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fade-in-up">
        <div class="flex justify-between items-center mb-4">
           <h3 class="text-xl font-bold">{{ modalData.title }}</h3>
           <button @click="isModalOpen = false" class="text-gray-400 hover:text-red-500"><span class="material-symbols-outlined">close</span></button>
        </div>
        <div v-html="modalData.content"></div>
      </div>
    </div>

    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <div v-for="t in toasts" :key="t.id" class="bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg text-sm flex items-center gap-2 animate-slide-in">
        <span class="material-symbols-outlined text-[#13ec25] text-base">info</span>
        {{ t.message }}
      </div>
    </div>
    <Footer />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');

.font-prompt {
  font-family: 'Prompt', sans-serif;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}
@keyframes slideIn {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}
</style>
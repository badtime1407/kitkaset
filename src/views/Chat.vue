<template>
  <div class="font-prompt flex h-screen flex-col overflow-hidden bg-[#f0f2f0] text-gray-800 font-medium">
    <Navbar2 />

    <main class="flex flex-1 overflow-hidden">
      <aside class="w-80 border-r border-[#e7f3e8] bg-[#fcfdfc] flex flex-col shrink-0">
        <div class="p-5 border-b border-[#e7f3e8]">
          <h1 class="text-xl font-bold text-gray-900 mb-4">Consultations</h1>
          <div class="flex bg-[#f0f4f0] p-1 rounded-xl text-xs font-bold text-center border border-[#d1dbd1]">
            <div class="flex-1 bg-white shadow-sm py-2 rounded-lg text-gray-900 cursor-pointer transition-all">Active</div>
            <div class="flex-1 py-2 text-gray-500 cursor-pointer hover:text-[#13ec25] transition-all">Archived</div>
          </div>
        </div>
        <div class="flex-1 overflow-y-auto scroll-custom">
          <div 
            v-for="expert in experts" 
            :key="expert.id" 
            @click="activeChatId = expert.id"
            :class="['flex items-center gap-3 p-4 border-b border-[#f0f4f0]/50 cursor-pointer transition-all', activeChatId === expert.id ? 'bg-[#13ec25]/10 border-r-4 border-[#13ec25]' : 'hover:bg-gray-50']"
          >
            <div class="relative shrink-0">
              <img :src="expert.avatar" class="size-12 rounded-full border-2 border-white shadow-sm object-cover" alt="expert avatar">
              <div v-if="expert.online" class="absolute bottom-0 right-0 size-3 bg-[#13ec25] border-2 border-white rounded-full"></div>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-baseline mb-1">
                <h4 class="text-sm font-bold text-gray-900 truncate">{{ expert.name }}</h4>
                <span class="text-[10px] font-medium text-gray-400">{{ expert.time }}</span>
              </div>
              <p class="text-xs font-medium text-gray-500 truncate">{{ expert.lastMsg }}</p>
            </div>
          </div>
        </div>
      </aside>

      <section class="flex-1 flex flex-col bg-white">
        <div v-if="currentExpert" class="flex flex-col h-full text-gray-800">
          
          <div class="px-8 py-4 border-b border-[#e7f3e8] flex justify-between items-center bg-white shadow-sm z-10">
            <div class="flex items-center gap-4">
              <img :src="currentExpert.avatar" class="size-11 rounded-full shadow-sm border-2 border-white object-cover" alt="active expert">
              <div>
                <h3 class="text-base font-bold text-gray-900">{{ currentExpert.name }}</h3>
                <p class="text-xs text-[#139c1e] font-semibold uppercase tracking-wide">{{ currentExpert.role }}</p>
              </div>
            </div>
            <button class="flex items-center gap-2 bg-[#fff1f1] text-[#e53e3e] px-5 py-2 rounded-xl text-xs font-bold border border-[#fed7d7] hover:bg-red-50 active:scale-95 transition-all">
              <span class="material-symbols-outlined text-lg">call</span> โทร
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-8 space-y-6 bg-[#f9faf9]" ref="chatBox">
            <div class="text-center mb-6">
              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-[#e7f3e8]/50 px-4 py-1.5 rounded-full">Today</span>
            </div>
            
            <div v-for="(msg, idx) in filteredMessages" :key="idx" :class="['flex items-end gap-3', msg.isMe ? 'flex-row-reverse' : '']">
              <div class="size-8 rounded-full overflow-hidden shrink-0 border border-gray-100 shadow-sm bg-gray-100 mb-1">
                <img :src="msg.isMe ? 'https://th.knowhae.com/sites/default/files/inline-images/knowhaeth_stimulus_ico5.png' : currentExpert.avatar" class="w-full h-full object-cover" alt="avatar">
              </div>
              <div :class="['flex flex-col max-w-[70%]', msg.isMe ? 'items-end' : 'items-start']">
                
                <div v-if="msg.text" :class="['px-5 py-3 rounded-2xl text-[15px] font-normal leading-relaxed shadow-sm border', msg.isMe ? 'bg-[#13ec25] text-white border-[#11d621] rounded-tr-none' : 'bg-white text-gray-700 border-[#e2e8f0] rounded-tl-none']">
                  <span :class="msg.isMe ? 'text-[#0a3f0e] font-medium' : ''">{{ msg.text }}</span>
                </div>

                <div v-if="msg.image" class="w-64 rounded-2xl overflow-hidden border-4 border-white shadow-md bg-gray-100">
                  <img :src="msg.image" class="w-full h-auto object-cover" alt="sent image">
                </div>

                <span class="text-[10px] text-gray-400 mt-1.5 font-medium px-1">{{ msg.time }}</span>
              </div>
            </div>
          </div>

          <div class="p-6 border-t border-[#e7f3e8] bg-white">
            <div class="max-w-4xl mx-auto flex flex-col gap-4">
              <div class="flex gap-4 px-2 items-center text-gray-600 font-medium">
                <button @click="scrollToBottom" class="flex items-center gap-2 text-xs font-bold text-[#139c1e] bg-[#13ec25]/10 px-4 py-2 rounded-xl border border-[#13ec25]/20 hover:bg-[#13ec25]/20 transition-all">
                  <span class="material-symbols-outlined text-lg">shopping_bag</span> Recommend Product
                </button>
                <input type="file" ref="fileInput" accept="image/*" class="hidden" @change="handleFileUpload">
                <button @click="triggerFileUpload" class="hover:text-[#13ec25] transition-colors"><span class="material-symbols-outlined text-2xl">photo_camera</span></button>
                <button class="hover:text-[#13ec25] transition-colors"><span class="material-symbols-outlined text-2xl">attach_file</span></button>
              </div>
              <div class="flex gap-3 items-center relative">
                <input v-model="input" @keyup.enter="send" type="text" placeholder="พิมพ์ข้อความของคุณที่นี่..." class="flex-1 bg-gray-50 border border-[#e2e8f0] rounded-2xl px-6 py-4 text-[15px] font-normal text-gray-800 focus:bg-white focus:border-[#13ec25] focus:ring-0 outline-none transition-all placeholder:text-gray-400 shadow-inner">
                <button @click="send" class="bg-[#13ec25] text-[#0a3f0e] size-12 rounded-xl flex items-center justify-center shadow-md hover:shadow-lg active:scale-95 transition-all hover:bg-[#11d621]">
                  <span class="material-symbols-outlined text-2xl">send</span>
                </button>
              </div>
              <div class="flex items-center gap-2 text-[10px] text-gray-400 font-medium px-2 justify-center">
                 <span class="material-symbols-outlined text-[14px]">lock</span>
                 All diagnostic images and chats are end-to-end encrypted.
              </div>
            </div>
          </div>
        </div>
      </section>

      <aside v-if="currentExpert" class="hidden xl:flex w-80 flex-col bg-[#fcfdfc] p-6 gap-8 border-l border-[#e7f3e8] text-gray-800">
        <div>
          <h5 class="text-[11px] font-bold uppercase text-gray-400 mb-4 tracking-widest">Conversation Context</h5>
          <p class="text-xs font-bold text-gray-600 uppercase mb-2">Selected Field</p>
          <div class="bg-white p-4 rounded-2xl border border-[#e2e8f0] flex items-center gap-4 shadow-sm hover:border-[#13ec25]/50 transition-colors">
            <div class="size-10 bg-[#e7f3e8] text-[#13ec25] flex items-center justify-center rounded-xl"><span class="material-symbols-outlined">map</span></div>
            <div>
              <p class="text-sm font-bold text-gray-900">{{ currentExpert.field }}</p>
              <p class="text-xs font-medium text-gray-500">12.4 Acres • Loam Soil</p>
            </div>
          </div>
        </div>

        <div>
          <p class="text-xs font-bold text-gray-600 uppercase mb-3">Previous Diagnosis</p>
          <div class="p-4 border border-dashed border-[#cbd5e1] rounded-2xl bg-gray-50">
             <p class="text-sm font-semibold text-gray-800">Mild Aphid Infestation</p>
             <p class="text-xs font-medium text-green-600 mt-1 flex items-center gap-1">
                <span class="material-symbols-outlined text-[12px]">check_circle</span> Resolved • June 12, 2023
             </p>
          </div>
        </div>

        <div class="flex-1">
          <h5 class="text-[11px] font-bold text-gray-400 uppercase mb-3 tracking-widest">Files Shared</h5>
          <div class="space-y-2">
            <div v-for="file in sharedFiles" :key="file.name" class="flex items-center justify-between p-3 bg-white border border-gray-100 hover:border-[#13ec25]/30 hover:shadow-sm rounded-xl cursor-pointer group transition-all">
              <div class="flex items-center gap-3">
                <div class="bg-red-50 p-1.5 rounded-lg">
                    <span class="material-symbols-outlined text-red-500 text-lg block">description</span>
                </div>
                <span class="text-xs font-medium text-gray-700 truncate w-32">{{ file.name }}</span>
              </div>
              <span class="material-symbols-outlined text-lg text-gray-300 group-hover:text-[#13ec25] transition-colors">download</span>
            </div>
          </div>
          <button class="mt-6 w-full text-center text-[#139c1e] text-xs font-bold hover:underline transition-all uppercase tracking-wide">View Full History</button>
        </div>
      </aside>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import Navbar2 from '../components/Navbar2.vue'

// --- SETTINGS & STATE ---
const input = ref('')
const chatBox = ref(null)
const activeChatId = ref(1)
const fileInput = ref(null)

// --- DATA STORAGE ---
const experts = ref([
  { id: 1, name: 'Dr. Aris Thorne', role: 'ผู้ให้คำปรึกษาด้านเคมีเกษตร', time: '2m ago', lastMsg: 'อัตราการใช้คือ 10-20 มล.', online: true, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXYyGntkoVsOebE28B2HiceYtcP-56B6I1JLQf_EwEeVKBvxt2', field: 'North Corn Field' },
  { id: 2, name: 'Sarah Miller', role: 'ผู้เชี่ยวชาญด้านดิน', time: '1h ago', lastMsg: 'ผลตรวจดินพร้อมแล้วค่ะ', online: true, avatar: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTQauKQ1URGKQ914KpTtXDcwAi96Mx4_XBmUzjZVqw1Pkv7_RBZ', field: 'Rice Field A' },
  { id: 3, name: 'Mike Chen', role: 'ผู้เชี่ยวชาญการชลประทาน', time: 'Yesterday', lastMsg: 'ระบบน้ำทำงานปกติไหมครับ?', online: false, avatar: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTq2phqoL0AAa9Ue_nznjjWHEzsVY3bXaoiEbr8F7xJiQGc-n0B', field: 'Orchard Area' }
])

const sharedFiles = ref([
  { name: 'Soil_Analysis_May.pdf' },
  { name: 'Treatment_Plan_Q2.doc' }
])

const allMessages = ref([
  { chatId: 1, isMe: true, text: "สารตัวนี้ควรใช้กับข้าวในปริมาณเท่าไรครับ", time: "10:15 AM", image: null },
  { chatId: 1, isMe: true, text: null, image: "https://max-ag.com/wp-content/uploads/2022/02/%E0%B8%AD%E0%B8%B0%E0%B8%9A%E0%B8%B2%E0%B9%80%E0%B8%A1%E0%B8%81%E0%B8%95%E0%B8%B4%E0%B8%99.png", time: "10:16 AM" },
  { chatId: 1, isMe: false, text: "โดยทั่วไปอัตราการใช้คือ 10-20 มิลลิลิตรต่อน้ำ 20 ลิตรสำหรับหนอนม้วนใบ และ 20 ซีซีต่อน้ำ 20 ลิตร สำหรับเพลี้ยไฟครับ", time: "10:18 AM", image: null }
])

// --- COMPUTED ---
const currentExpert = computed(() => experts.value.find(e => e.id === activeChatId.value))
const filteredMessages = computed(() => allMessages.value.filter(m => m.chatId === activeChatId.value))

// --- LOGIC FUNCTIONS ---
const scrollToBottom = async () => {
  await nextTick()
  if (chatBox.value) {
    chatBox.value.scrollTo({ top: chatBox.value.scrollHeight, behavior: 'smooth' })
  }
}

const createNewMessage = (content, type = 'text') => ({
  chatId: activeChatId.value,
  isMe: true,
  text: type === 'text' ? content : null,
  image: type === 'image' ? content : null,
  time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
})

const send = () => {
  if (!input.value.trim()) return
  allMessages.value.push(createNewMessage(input.value, 'text'))
  input.value = ''
  scrollToBottom()
}

const triggerFileUpload = () => fileInput.value?.click()

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      allMessages.value.push(createNewMessage(e.target.result, 'image'))
      scrollToBottom()
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style>
/* นำเข้าฟอนต์ Prompt */
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');

/* กำหนด Font Family */
.font-prompt {
  font-family: 'Prompt', sans-serif;
}

body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
}

/* Custom Scrollbar */
.scroll-custom::-webkit-scrollbar { width: 5px; }
.scroll-custom::-webkit-scrollbar-track { background: transparent; }
.scroll-custom::-webkit-scrollbar-thumb { background: #dbece0; border-radius: 10px; }
.scroll-custom::-webkit-scrollbar-thumb:hover { background: #13ec25; }
</style>
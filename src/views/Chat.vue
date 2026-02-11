<template>
  <div class="flex h-screen flex-col overflow-hidden bg-[#f0f2f0] font-display text-black font-medium">
    <Navbar2 />

    <main class="flex flex-1 overflow-hidden">
      <aside class="w-80 border-r border-[#e7f3e8] bg-[#fcfdfc] flex flex-col shrink-0 text-black">
        <div class="p-5 border-b border-[#e7f3e8]">
          <h1 class="text-lg font-bold text-black mb-4">Consultations</h1>
          <div class="flex bg-[#f0f4f0] p-1 rounded-xl text-[11px] font-black text-center border border-[#d1dbd1]">
            <div class="flex-1 bg-white shadow-sm py-2 rounded-lg text-black font-bold cursor-pointer">Active</div>
            <div class="flex-1 py-2 text-black cursor-pointer hover:text-[#13ec25] font-bold">Archived</div>
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
              <img :src="expert.avatar" class="size-12 rounded-full border-2 border-white shadow-sm" alt="expert avatar">
              <div v-if="expert.online" class="absolute bottom-0 right-0 size-3 bg-[#13ec25] border-2 border-white rounded-full"></div>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-baseline mb-0.5">
                <h4 class="text-sm font-bold text-black truncate">{{ expert.name }}</h4>
                <span class="text-[10px] font-bold text-black">{{ expert.time }}</span>
              </div>
              <p class="text-[11px] font-bold text-black truncate">{{ expert.lastMsg }}</p>
            </div>
          </div>
        </div>
      </aside>

      <section class="flex-1 flex flex-col bg-white">
        <div v-if="currentExpert" class="flex flex-col h-full text-black">
          <div class="px-8 py-4 border-b border-[#e7f3e8] flex justify-between items-center bg-white shadow-sm z-10">
            <div class="flex items-center gap-4">
              <img :src="currentExpert.avatar" class="size-11 rounded-full shadow-sm border-2 border-white" alt="active expert">
              <div>
                <h3 class="text-base font-bold text-black">{{ currentExpert.name }}</h3>
                <p class="text-[11px] text-[#139c1e] font-black uppercase tracking-wide">{{ currentExpert.role }}</p>
              </div>
            </div>
            <button class="flex items-center gap-2 bg-[#fff1f1] text-[#e53e3e] px-5 py-2 rounded-xl text-xs font-black border border-[#fed7d7] hover:bg-red-50 active:scale-95 transition-all">
              <span class="material-symbols-outlined text-lg font-bold">call</span> โทร
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-8 space-y-8 bg-[#f9faf9]" ref="chatBox">
            <div class="text-center">
              <span class="text-[10px] font-black text-black uppercase tracking-[0.2em] bg-[#e7f3e8] px-4 py-1.5 rounded-full border border-[#d1e3d1]">Today</span>
            </div>
            
            <div v-for="(msg, idx) in filteredMessages" :key="idx" :class="['flex items-start gap-4', msg.isMe ? 'flex-row-reverse' : '']">
              <div class="size-10 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm bg-gray-100">
                <img :src="msg.isMe ? 'https://th.knowhae.com/sites/default/files/inline-images/knowhaeth_stimulus_ico5.png' : currentExpert.avatar" alt="avatar">
              </div>
              <div :class="['flex flex-col max-w-[75%]', msg.isMe ? 'items-end' : 'items-start']">
                <div v-if="msg.text" :class="['px-5 py-3 rounded-2xl text-[14px] font-bold leading-relaxed shadow-sm border border-[#e2e8f0]', msg.isMe ? 'bg-[#13ec25] text-black rounded-tr-none border-[#11d621]' : 'bg-white text-black rounded-tl-none']">
                  {{ msg.text }}
                </div>
                <div v-if="msg.image" class="mt-4 w-64 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-[#d9d9d9]">
                  <img :src="msg.image" class="w-full h-auto object-contain p-4 aspect-[4/3]" alt="sent image">
                </div>
                <span class="text-[10px] text-black mt-2 font-black uppercase tracking-tighter">{{ msg.time }}</span>
              </div>
            </div>
          </div>

          <div class="p-6 border-t border-[#e7f3e8] bg-white">
            <div class="max-w-4xl mx-auto flex flex-col gap-4">
              <div class="flex gap-4 px-2 items-center text-black font-bold">
                <button @click="scrollToBottom" class="flex items-center gap-2 text-[11px] font-black text-black bg-[#13ec25]/10 px-4 py-2 rounded-xl border border-[#13ec25]/20 hover:bg-[#13ec25]/20 transition-all">
                  <span class="material-symbols-outlined text-lg font-bold">shopping_bag</span> Recommend Product
                </button>
                <input type="file" ref="fileInput" accept="image/*" class="hidden" @change="handleFileUpload">
                <button @click="triggerFileUpload" class="text-black hover:text-[#13ec25] transition-colors"><span class="material-symbols-outlined text-2xl font-bold">photo_camera</span></button>
                <button class="text-black hover:text-[#13ec25] transition-colors"><span class="material-symbols-outlined text-2xl font-bold">attach_file</span></button>
              </div>
              <div class="flex gap-4 items-center relative">
                <input v-model="input" @keyup.enter="send" type="text" placeholder="พิมพ์ข้อความของคุณที่นี่..." class="flex-1 bg-white border-2 border-[#e7f3e8] rounded-2xl px-6 py-4 text-sm  focus:border-[#13ec25] focus:ring-0 outline-none transition-all placeholder:text-[#666] text-black shadow-sm font-bold">
                <button @click="send" class="bg-[#13ec25] text-black size-12 rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-all hover:bg-[#11d621]">
                  <span class="material-symbols-outlined text-2xl font-black">send</span>
                </button>
              </div>
              <div class="flex items-center gap-2 text-[10px] text-black font-bold px-2">
                 <span class="material-symbols-outlined text-[12px] font-bold">info</span>
                 Experts usually respond within 5 minutes. All diagnostic images are encrypted.
              </div>
            </div>
          </div>
        </div>
      </section>

      <aside v-if="currentExpert" class="hidden xl:flex w-80 flex-col bg-[#fcfdfc] p-6 gap-8 border-l border-[#e7f3e8] text-black">
        <div>
          <h5 class="text-[10px] font-black uppercase text-black mb-4 tracking-widest">Conversation Context</h5>
          <p class="text-[10px] font-bold text-black uppercase mb-2 ">Selected Field</p>
          <div class="bg-[#e7f3e8] p-4 rounded-2xl border border-[#d1e3d1] flex items-center gap-4 shadow-sm">
            <div class="size-10 bg-[#13ec25] text-white flex items-center justify-center rounded-xl shadow-sm"><span class="material-symbols-outlined font-bold">map</span></div>
            <div>
              <p class="text-xs font-black text-black">{{ currentExpert.field }}</p>
              <p class="text-[10px] font-bold text-black">12.4 Acres • Loam Soil</p>
            </div>
          </div>
        </div>

        <div>
          <p class="text-[10px] font-bold text-black uppercase mb-3 ">Previous Diagnosis</p>
          <div class="p-4 border border-dashed border-[#d1dbd1] rounded-2xl bg-gray-50/20">
             <p class="text-[11px] font-bold text-black ">Mild Aphid Infestation</p>
             <p class="text-[10px] font-bold text-black mt-1">Resolved • June 12, 2023</p>
          </div>
        </div>

        <div>
          <h5 class="text-[10px] font-bold text-black uppercase mb-3 ">Files Shared</h5>
          <div class="space-y-3">
            <div v-for="file in sharedFiles" :key="file.name" class="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer group">
              <div class="flex items-center gap-3 text-black font-bold">
                <span class="material-symbols-outlined text-red-500 font-bold text-lg">picture_as_pdf</span>
                <span class="text-[11px] font-bold truncate w-40">{{ file.name }}</span>
              </div>
              <span class="material-symbols-outlined text-lg text-black group-hover:text-[#13ec25] transition-colors font-bold">download</span>
            </div>
          </div>
          <button class="mt-8 w-full text-center text-[#139c1e] text-[11px] font-black hover:underline tracking-tight transition-all uppercase">View Full History</button>
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
  { chatId: 1, isMe: true, text: "สารตัวนี้ควรใช้กับข้าวในปริมาณเท่าไรครับ", time: "10:15 AM • Delivered", image: null },
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
body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
}
.font-display { font-family: 'Manrope', sans-serif; }
.scroll-custom::-webkit-scrollbar { width: 5px; }
.scroll-custom::-webkit-scrollbar-track { background: transparent; }
.scroll-custom::-webkit-scrollbar-thumb { background: #cbdacb; border-radius: 10px; }
</style>
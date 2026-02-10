<template>
  <div class="flex h-screen flex-col overflow-hidden bg-[#f0f2f0] font-display text-[#0d1b0f]">
    <header class="flex items-center justify-between border-b border-[#e7f3e8] bg-white px-6 py-3 shrink-0 shadow-sm z-20">
      <div class="flex items-center gap-8">
        <a href="/" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div class="size-8 text-[#13ec25]">
            <svg fill="currentColor" viewBox="0 0 48 48"><path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"></path></svg>
          </div>
          <h2 class="text-xl font-extrabold tracking-tight">กิจเกษตร</h2>
        </a>
        <nav class="hidden md:flex items-center gap-8 text-sm font-bold">
          <a href="/Productall" class="text-gray-700 hover:text-[#13ec25]">ร้านค้า</a>
          <a href="/consult" class="text-[#13ec25] underline decoration-2 underline-offset-8 font-extrabold">การให้คำปรึกษา</a>
        </nav>
      </div>
      <div class="flex items-center gap-4">
        <div class="bg-[#e7f3e8] rounded-xl px-4 py-2 flex items-center gap-3 border border-[#d1e3d1]">
          <span class="material-symbols-outlined text-[#4c9a52] text-xl font-bold">search</span>
          <input type="text" placeholder="ค้นหาคำสั่งซื้อ ผู้เชี่ยวชาญ..." class="bg-transparent border-none text-xs font-bold outline-none w-56 placeholder:text-[#4c9a52]">
        </div>
        <button class="material-symbols-outlined text-gray-600 font-bold cursor-pointer hover:text-[#13ec25] transition-colors">notifications</button>
        <a href="/settings" class="material-symbols-outlined text-gray-600 font-bold cursor-pointer hover:text-[#13ec25] transition-colors">settings</a>
        <a href="/profile" class="size-10 rounded-full bg-gray-300 border-2 border-white shadow-sm overflow-hidden hover:ring-2 hover:ring-[#13ec25] transition-all">
           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgvoOmD8Yhr90O55sFJngSV6XhXkFP7VgRcw&s" alt="user">
        </a>
      </div>
    </header>

    <main class="flex flex-1 overflow-hidden">
      <aside class="w-80 border-r border-[#e7f3e8] bg-[#fcfdfc] flex flex-col shrink-0">
        <div class="p-5 border-b border-[#e7f3e8]">
          <h1 class="text-lg font-bold text-[#0d1b0f] mb-4">Consultations</h1>
          <div class="flex bg-[#f0f4f0] p-1 rounded-xl text-[11px] font-black text-center">
            <div class="flex-1 bg-white shadow-sm py-2 rounded-lg text-[#0d1b0f] cursor-pointer">Active</div>
            <div class="flex-1 py-2 text-[#4c9a52] cursor-pointer hover:text-[#0d1b0f]">Archived</div>
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
              <img :src="expert.avatar" class="size-12 rounded-full border-2 border-white shadow-sm">
              <div v-if="expert.online" class="absolute bottom-0 right-0 size-3 bg-[#13ec25] border-2 border-white rounded-full"></div>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-baseline mb-0.5">
                <h4 class="text-sm font-bold text-[#0d1b0f] truncate">{{ expert.name }}</h4>
                <span class="text-[10px] font-bold text-[#4c9a52]">{{ expert.time }}</span>
              </div>
              <p class="text-[11px] font-medium text-[#4c9a52] truncate">{{ expert.lastMsg }}</p>
            </div>
          </div>
        </div>
      </aside>

      <section class="flex-1 flex flex-col bg-white">
        <div v-if="currentExpert" class="flex flex-col h-full">
          <div class="px-8 py-4 border-b border-[#e7f3e8] flex justify-between items-center bg-white shadow-sm z-10">
            <div class="flex items-center gap-4">
              <img :src="currentExpert.avatar" class="size-11 rounded-full shadow-sm border-2 border-white">
              <div>
                <h3 class="text-base font-bold text-[#0d1b0f]">{{ currentExpert.name }}</h3>
                <p class="text-[11px] text-[#4c9a52] font-bold uppercase tracking-wide">{{ currentExpert.role }}</p>
              </div>
            </div>
            <button class="flex items-center gap-2 bg-[#fff1f1] text-[#e53e3e] px-5 py-2 rounded-xl text-xs font-black border border-[#fed7d7] hover:bg-red-50 active:scale-95 transition-all">
              <span class="material-symbols-outlined text-lg">call</span> โทร
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-8 space-y-8 bg-[#f9faf9]" ref="chatBox">
            <div class="text-center"><span class="text-[10px] font-bold text-[#4c9a52] uppercase tracking-[0.2em] bg-[#e7f3e8] px-4 py-1.5 rounded-full">Today</span></div>
            
            <div v-for="(msg, idx) in filteredMessages" :key="idx" :class="['flex items-start gap-4', msg.isMe ? 'flex-row-reverse' : '']">
              <div class="size-10 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                <img :src="msg.isMe ? 'https://th.knowhae.com/sites/default/files/inline-images/knowhaeth_stimulus_ico5.png' : currentExpert.avatar">
              </div>
              <div :class="['flex flex-col max-w-[75%]', msg.isMe ? 'items-end' : 'items-start']">
                <div v-if="msg.text" :class="['px-5 py-3 rounded-2xl text-sm font-bold leading-relaxed shadow-sm', msg.isMe ? 'bg-[#13ec25] text-white rounded-tr-none' : 'bg-white text-[#0d1b0f] border border-[#e7f3e8] rounded-tl-none']">
                  {{ msg.text }}
                </div>
                <div v-if="msg.image" class="mt-4 w-64 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-[#d9d9d9]">
                  <img :src="msg.image" class="w-full h-auto object-contain p-4 aspect-[4/3]">
                </div>
                <span class="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-tighter">{{ msg.time }}</span>
              </div>
            </div>
          </div>

          <div class="p-6 border-t border-[#e7f3e8] bg-white">
            <div class="max-w-4xl mx-auto flex flex-col gap-4">
              <div class="flex gap-4 px-2 items-center">
                <button class="flex items-center gap-2 text-[11px] font-bold text-[#13ec25] bg-[#13ec25]/10 px-4 py-2 rounded-xl border border-[#13ec25]/20 hover:bg-[#13ec25]/20 transition-all">
                  <span class="material-symbols-outlined text-lg font-bold">shopping_bag</span> Recommend Product
                </button>

                <input type="file" ref="fileInput" accept="image/*" class="hidden" @change="handleFileUpload">
                
                <button @click="triggerFileUpload" class="text-gray-400 hover:text-[#13ec25] transition-colors">
                  <span class="material-symbols-outlined text-2xl font-bold">photo_camera</span>
                </button>
                
                <button class="text-gray-400 hover:text-[#13ec25] transition-colors"><span class="material-symbols-outlined text-2xl font-bold">attach_file</span></button>
              </div>
              <div class="flex gap-4 items-center relative">
                <input v-model="input" @keyup.enter="send" type="text" placeholder="พิมพ์ข้อความของคุณที่นี่..." class="flex-1 bg-white border-2 border-[#e7f3e8] rounded-2xl px-6 py-4 text-sm font-bold focus:border-[#13ec25] focus:ring-0 outline-none transition-all placeholder:text-gray-300 shadow-sm">
                <button @click="send" class="bg-[#13ec25] text-white size-12 rounded-xl flex items-center justify-center shadow-lg active:scale-95 transition-all hover:bg-[#11d621]">
                  <span class="material-symbols-outlined text-2xl font-bold">send</span>
                </button>
              </div>
              <div class="flex items-center gap-2 text-[10px] text-gray-400 font-bold px-2">
                 <span class="material-symbols-outlined text-[12px]">info</span>
                 Experts usually respond within 5 minutes. All diagnostic images are encrypted.
              </div>
            </div>
          </div>
        </div>
      </section>

      <aside v-if="currentExpert" class="hidden xl:flex w-80 flex-col bg-[#fcfdfc] p-6 gap-8 border-l border-[#e7f3e8]">
        <div>
          <h5 class="text-[10px] font-black uppercase text-gray-400 mb-4 tracking-widest">Conversation Context</h5>
          <p class="text-[10px] font-bold text-[#4c9a52] uppercase mb-2 font-black">Selected Field</p>
          <div class="bg-[#e7f3e8] p-4 rounded-2xl border border-[#d1e3d1] flex items-center gap-4 shadow-sm">
            <div class="size-10 bg-[#13ec25] text-white flex items-center justify-center rounded-xl"><span class="material-symbols-outlined">map</span></div>
            <div>
              <p class="text-xs font-black">{{ currentExpert.field }}</p>
              <p class="text-[10px] font-bold text-gray-400">12.4 Acres • Loam Soil</p>
            </div>
          </div>
        </div>

        <div>
          <p class="text-[10px] font-bold text-[#4c9a52] uppercase mb-3 font-black">Previous Diagnosis</p>
          <div class="p-4 border border-dashed border-[#e7f3e8] rounded-2xl bg-gray-50/20">
             <p class="text-[11px] font-bold text-[#0d1b0f]">Mild Aphid Infestation</p>
             <p class="text-[10px] font-bold text-gray-400 mt-1">Resolved • June 12, 2023</p>
          </div>
        </div>

        <div>
          <h5 class="text-[10px] font-bold text-[#4c9a52] uppercase mb-3 font-black">Files Shared</h5>
          <div class="space-y-3">
            <div v-for="file in files" :key="file.name" class="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer group transition-colors">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-red-500 font-bold">picture_as_pdf</span>
                <span class="text-[11px] font-bold text-gray-600 truncate w-40">{{ file.name }}</span>
              </div>
              <span class="material-symbols-outlined text-lg text-gray-300 group-hover:text-[#13ec25] transition-colors">download</span>
            </div>
          </div>
          <button class="mt-8 w-full text-center text-[#13ec25] text-[11px] font-black hover:underline tracking-tight transition-all">View Full History</button>
        </div>
      </aside>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const input = ref('')
const chatBox = ref(null)
const activeChatId = ref(1)
const fileInput = ref(null) // ตัวแปรอ้างอิงถึงช่อง input file

const experts = ref([
  { id: 1, name: 'Dr. Aris Thorne', role: 'ผู้ให้คำปรึกษาด้านเคมีเกษตร', time: '2m ago', lastMsg: 'โดยทั่วไปอัตราการใช้คือ 10-20...', online: true, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXYyGntkoVsOebE28B2HiceYtcP-56B6I1JLQf_EwEeVKBvxt2', field: 'North Corn Field' },
  { id: 2, name: 'Sarah Miller', role: 'ผู้เชี่ยวชาญด้านดิน', time: '1h ago', lastMsg: 'ผลตรวจดินพร้อมแล้วค่ะ', online: true, avatar: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTQauKQ1URGKQ914KpTtXDcwAi96Mx4_XBmUzjZVqw1Pkv7_RBZ', field: 'Rice Field A' },
  { id: 3, name: 'Mike Chen', role: 'ผู้เชี่ยวชาญการชลประทาน', time: 'Yesterday', lastMsg: 'ระบบน้ำเป็นอย่างไรบ้าง?', online: false, avatar: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTq2phqoL0AAa9Ue_nznjjWHEzsVY3bXaoiEbr8F7xJiQGc-n0B', field: 'Orchard Area' }
])

const files = ref([
  { name: 'Soil_Analysis_May.pdf' },
  { name: 'Treatment_Plan_Q2.doc' }
])

const allMessages = ref([
  { chatId: 1, isMe: true, text: "สารตัวนี้ควรใช่กับข้าวในปริมาณเท่าไรหรอครับ", time: "10:15 AM • Delivered" },
  { chatId: 1, isMe: true, image: "https://max-ag.com/wp-content/uploads/2022/02/%E0%B8%AD%E0%B8%B0%E0%B8%9A%E0%B8%B2%E0%B9%80%E0%B8%A1%E0%B8%81%E0%B8%95%E0%B8%B4%E0%B8%99.png", time: "10:16 AM" },
  { chatId: 1, isMe: false, text: "โดยทั่วไปอัตราการใช้คือ 10-20 มิลลิลิตรต่อน้ำ 20 ลิตรสำหรับหนอนม้วนใบ และ 20 ซีซีต่อน้ำ 20 ลิตร (หรือ 20 ซีซีต่อไร่) สำหรับเพลี้ยไฟ สำหรับกำจัดหอยเชอรี่สามารถใช้ในอัตรา 100-200 ซีซีต่อน้ำ 200 ลิตรหรือใช้หยดหอยโดยตรง 1 ลิตรต่อนา 4-5 ไร่ ครับ", time: "10:18 AM" },
  { chatId: 2, isMe: false, text: "สวัสดีครับคุณเกษตรกร ผลวิเคราะห์ดินที่ส่งไป ขาดฟอสฟอรัสนะครับ", time: "09:00 AM" },
  { chatId: 3, isMe: false, text: "พรุ่งนี้ผมจะเข้าไปเช็คระบบสปริงเกอร์ให้นะครับ", time: "Yesterday" }
])

const currentExpert = computed(() => experts.value.find(e => e.id === activeChatId.value))
const filteredMessages = computed(() => allMessages.value.filter(m => m.chatId === activeChatId.value))

// ฟังก์ชันสั่งให้ปุ่มกล้องเรียก input file
const triggerFileUpload = () => {
  fileInput.value.click()
}

// ฟังก์ชันจัดการเมื่อเลือกรูปภาพเสร็จ
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      allMessages.value.push({
        chatId: activeChatId.value,
        isMe: true,
        text: null,
        image: e.target.result,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
      })
      scrollToBottom()
    }
    reader.readAsDataURL(file)
  }
}

const send = async () => {
  if (input.value.trim() === '') return
  allMessages.value.push({
    chatId: activeChatId.value,
    isMe: true,
    text: input.value,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
  })
  input.value = ''
  scrollToBottom()
}

const scrollToBottom = async () => {
  await nextTick()
  if (chatBox.value) {
    chatBox.value.scrollTop = chatBox.value.scrollHeight
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Material+Symbols+Outlined');
.font-display { font-family: 'Manrope', sans-serif; }
.scroll-custom::-webkit-scrollbar { width: 5px; }
.scroll-custom::-webkit-scrollbar-thumb { background: #cbdacb; border-radius: 10px; }
</style>
<template>
        <footer class="bg-white border-t border-gray-100 py-12 px-6 md:px-10 lg:px-40 mt-12">
      <div class="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <div class="text-[#1ED730] size-6">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 class="text-lg font-bold text-gray-900">กิจเกษตร</h2>
          </div>
          <p class="text-xs text-gray-500 leading-relaxed">ผู้นำด้านเทคโนโลยีการเกษตรสมัยใหม่ ที่ได้รับความไว้วางใจจากเกษตรกรไทย</p>
        </div>
        <div>
          <h4 class="font-bold text-sm mb-4 text-gray-900">หมวดหมู่สินค้า</h4>
          <ul class="text-xs space-y-3 text-gray-500">
            <li><router-link to="/Product1" class="hover:text-[#1ED730]">สารกำจัดวัชพืช</router-link></li>
            <li><router-link to="/Product2" class="hover:text-[#1ED730]">สารกำจัดแมลง</router-link></li>
            <li><router-link to="/Product3" class="hover:text-[#1ED730]">สารป้องกันโรคพืช</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-sm mb-4 text-gray-900">การบริการ</h4>
          <ul class="text-xs space-y-3 text-gray-500">
            <li><router-link to="/consultation" class="hover:text-[#1ED730]">ปรึกษาผู้เชี่ยวชาญ</router-link></li>
            <li><a href="#" class="hover:text-[#1ED730]">ติดตามสถานะการส่ง</a></li>
            <li><a href="#" class="hover:text-[#1ED730]">นโยบายการคืนเงิน</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-sm mb-4 text-gray-900">รับข่าวสารและส่วนลด</h4>
          <div class="flex gap-2">
            <input class="flex-1 rounded-lg border border-gray-200 bg-gray-50 text-xs px-3 py-2 focus:ring-2 focus:ring-[#1ED730] outline-none" placeholder="อีเมลของคุณ" type="email" />
            <button class="bg-[#1ED730] text-[#0d1b0f] px-4 py-2 rounded-lg font-bold text-xs hover:bg-[#18b528]">ส่ง</button>
          </div>
        </div>
      </div>
      <div class="max-w-[1280px] mx-auto mt-12 pt-8 border-t border-gray-100 text-center text-[10px] text-gray-400">
        © 2026 Kij Kaset Co., Ltd. All rights reserved.
      </div>
    </footer>
</template>
<template>
  <div class="bookshelf-wrapper relative">
    <!-- SVG 手绘滤镜 & 装饰物定义 -->
    <svg class="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
      <defs>
        <!-- 手绘抖动滤镜 -->
        <filter id="sketchy-line">
          <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="4" result="noise" seed="2" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>

    <!-- 书架整体容器 -->
    <div class="bookshelf relative mx-auto max-w-6xl">
      <!-- === 第一层书架 === -->
      <div class="shelf-row relative mb-2">
        <!-- 书本区域 -->
        <div class="books-area flex items-end gap-1.5 px-2 md:gap-3 md:px-10 pb-0 min-h-[200px] md:min-h-[240px] relative z-10">
          <!-- 左侧复古闹钟装饰（手机缩小） -->
          <div class="doodle-clock self-end mr-1 md:mr-2 flex-shrink-0">
            <svg class="w-8 h-11 md:w-12 md:h-[68px] opacity-80 dark:opacity-60" viewBox="0 0 40 56" fill="none">
              <!-- 左铃铛 -->
              <ellipse cx="9" cy="10" rx="5" ry="4" stroke="#B45309" stroke-width="1.5" fill="#FCD34D" filter="url(#sketchy-line)" />
              <!-- 右铃铛 -->
              <ellipse cx="31" cy="10" rx="5" ry="4" stroke="#B45309" stroke-width="1.5" fill="#FCD34D" filter="url(#sketchy-line)" />
              <!-- 顶部提手 -->
              <path d="M15 8 Q20 2 25 8" stroke="#B45309" stroke-width="1.5" fill="none" stroke-linecap="round" />
              <!-- 表盘主体 -->
              <circle cx="20" cy="30" r="14" stroke="#B45309" stroke-width="1.5" fill="#FFF8DC" filter="url(#sketchy-line)" />
              <!-- 内圈刻度环 -->
              <circle cx="20" cy="30" r="11" stroke="#B45309" stroke-width="0.6" fill="none" opacity="0.5" />
              <!-- 12/3/6/9 点刻度 -->
              <line x1="20" y1="19" x2="20" y2="22" stroke="#333" stroke-width="1.2" stroke-linecap="round" />
              <line x1="31" y1="30" x2="28" y2="30" stroke="#333" stroke-width="1.2" stroke-linecap="round" />
              <line x1="20" y1="41" x2="20" y2="38" stroke="#333" stroke-width="1.2" stroke-linecap="round" />
              <line x1="9" y1="30" x2="12" y2="30" stroke="#333" stroke-width="1.2" stroke-linecap="round" />
              <!-- 时针 -->
              <line x1="20" y1="30" x2="20" y2="23" stroke="#333" stroke-width="1.5" stroke-linecap="round" />
              <!-- 分针 -->
              <line x1="20" y1="30" x2="26" y2="30" stroke="#333" stroke-width="1.2" stroke-linecap="round" />
              <!-- 中心圆点 -->
              <circle cx="20" cy="30" r="1.3" fill="#333" />
              <!-- 左脚 -->
              <path d="M11 43 L7 52" stroke="#B45309" stroke-width="1.5" stroke-linecap="round" />
              <!-- 右脚 -->
              <path d="M29 43 L33 52" stroke="#B45309" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </div>

          <!-- 第1本：竖立 -->
          <slot name="book-1" />
          <!-- 第2本：竖立 -->
          <slot name="book-2" />
          <!-- 第3本：斜靠 -->
          <slot name="book-3" />
          <!-- 第9本：竖立（新增） -->
          <slot name="book-9" />

          <!-- 小盆栽装饰（手机缩小） -->
          <div class="doodle-plant self-end mx-1 md:mx-3 flex-shrink-0">
            <svg class="w-7 h-11 md:w-11 md:h-[68px] opacity-80" viewBox="0 0 36 56" fill="none">
              <!-- 花盆 -->
              <path d="M10 36 L8 52 Q8 55 12 55 L24 55 Q28 55 28 52 L26 36 Z" stroke="#8B4513" stroke-width="1.5" fill="#D2691E" filter="url(#sketchy-line)" />
              <!-- 泥土 -->
              <ellipse cx="18" cy="36" rx="9" ry="3" fill="#654321" />
              <!-- 茎 -->
              <path d="M18 36 Q16 28 18 20" stroke="#228B22" stroke-width="1.5" fill="none" stroke-linecap="round" />
              <path d="M18 28 Q14 24 12 20" stroke="#228B22" stroke-width="1.2" fill="none" stroke-linecap="round" />
              <path d="M18 24 Q22 20 24 16" stroke="#228B22" stroke-width="1.2" fill="none" stroke-linecap="round" />
              <!-- 叶子 -->
              <ellipse cx="11" cy="19" rx="4" ry="2" fill="#32CD32" transform="rotate(-30 11 19)" />
              <ellipse cx="25" cy="15" rx="4" ry="2" fill="#32CD32" transform="rotate(20 25 15)" />
              <ellipse cx="18" cy="17" rx="3" ry="5" fill="#2E8B57" transform="rotate(5 18 17)" />
              <!-- 小花 -->
              <circle cx="18" cy="12" r="3" fill="#FFD700" />
              <circle cx="18" cy="12" r="1.5" fill="#FFA500" />
            </svg>
          </div>

          <!-- 第4本：竖立 -->
          <slot name="book-4" />
          <!-- 第16本：连城诀（金庸系列，新增） -->
          <slot name="book-16" />
          <!-- 第14本：竖立（金庸系列） -->
          <slot name="book-14" />

          <!-- 中部眼镜装饰（仅桌面端显示，避免手机拥挤） -->
          <div class="doodle-glasses self-end mx-1 md:mx-3 mb-1 flex-shrink-0 hidden md:block">
            <svg class="w-9 h-6 md:w-14 md:h-9 opacity-70 dark:opacity-50" viewBox="0 0 44 28" fill="none">
              <!-- 左镜片 -->
              <circle cx="10" cy="16" r="8" stroke="#4B5563" stroke-width="1.5" fill="#DBEAFE" fill-opacity="0.5" filter="url(#sketchy-line)" />
              <!-- 右镜片 -->
              <circle cx="34" cy="16" r="8" stroke="#4B5563" stroke-width="1.5" fill="#DBEAFE" fill-opacity="0.5" filter="url(#sketchy-line)" />
              <!-- 鼻梁 -->
              <path d="M18 14 Q22 11 26 14" stroke="#4B5563" stroke-width="1.5" fill="none" stroke-linecap="round" />
              <!-- 左镜腿 -->
              <path d="M2.5 13 Q0 10 1 6" stroke="#4B5563" stroke-width="1.5" fill="none" stroke-linecap="round" />
              <!-- 右镜腿 -->
              <path d="M41.5 13 Q44 10 43 6" stroke="#4B5563" stroke-width="1.5" fill="none" stroke-linecap="round" />
              <!-- 镜片高光 -->
              <path d="M6 12 Q8 10 11 11" stroke="#FFF" stroke-width="0.8" fill="none" opacity="0.7" />
              <path d="M30 12 Q32 10 35 11" stroke="#FFF" stroke-width="0.8" fill="none" opacity="0.7" />
            </svg>
          </div>

          <!-- 第18本：恶意（斜靠，新增） -->
          <slot name="book-18" />
          <!-- 第15本：竖立（金庸系列） -->
          <slot name="book-15" />
          <!-- 第11本：竖立 -->
          <slot name="book-11" />

          <!-- 右侧小猫装饰（手机缩小） -->
          <div class="doodle-cat self-end ml-auto flex-shrink-0">
            <svg class="w-8 h-7 md:w-[50px] md:h-11 opacity-70 dark:opacity-50" viewBox="0 0 40 36" fill="none">
              <!-- 猫身体 -->
              <ellipse cx="20" cy="28" rx="12" ry="8" fill="currentColor" class="text-zinc-400 dark:text-zinc-500" />
              <!-- 猫头 -->
              <circle cx="20" cy="16" r="8" fill="currentColor" class="text-zinc-400 dark:text-zinc-500" />
              <!-- 猫耳 -->
              <path d="M14 10 L12 3 L17 8 Z" fill="currentColor" class="text-zinc-400 dark:text-zinc-500" />
              <path d="M26 10 L28 3 L23 8 Z" fill="currentColor" class="text-zinc-400 dark:text-zinc-500" />
              <!-- 猫眼 -->
              <circle cx="17" cy="15" r="1.5" fill="#333" />
              <circle cx="23" cy="15" r="1.5" fill="#333" />
              <!-- 猫鼻 -->
              <path d="M19 18 L20 19 L21 18" stroke="#333" stroke-width="0.8" fill="none" />
              <!-- 猫尾 -->
              <path d="M32 26 Q38 20 36 14" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" class="text-zinc-400 dark:text-zinc-500" />
            </svg>
          </div>
        </div>

        <!-- 书架板 -->
        <div class="shelf-board relative h-5">
          <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 16">
            <path
              d="M0 2 Q200 0 400 2 Q600 4 800 2 L800 14 Q600 16 400 14 Q200 12 0 14 Z"
              class="fill-amber-700 dark:fill-amber-900"
              filter="url(#sketchy-line)"
            />
            <path
              d="M0 2 Q200 0 400 2 Q600 4 800 2"
              class="stroke-amber-900 dark:stroke-amber-700"
              stroke-width="1"
              fill="none"
            />
          </svg>
          <!-- 架板厚度阴影 -->
          <div class="absolute left-0 right-0 -bottom-2 h-2 bg-gradient-to-b from-amber-900/30 to-transparent rounded-b" />
        </div>
      </div>

      <!-- === 第二层书架 === -->
      <div class="shelf-row relative">
        <!-- 书本区域 -->
        <div class="books-area flex items-end gap-1.5 px-2 md:gap-3 md:px-10 pb-0 min-h-[200px] md:min-h-[240px] relative z-10">
          <!-- 左侧咖啡杯装饰（手机缩小） -->
          <div class="doodle-coffee self-end mr-1 md:mr-3 flex-shrink-0">
            <svg class="w-6 h-7 md:w-10 md:h-[42px] opacity-75" viewBox="0 0 32 34" fill="none">
              <!-- 杯身 -->
              <path d="M4 10 L6 30 Q6 33 10 33 L20 33 Q24 33 24 30 L26 10 Z" stroke="#6B4423" stroke-width="1.5" fill="#FFF8DC" filter="url(#sketchy-line)" />
              <!-- 杯把 -->
              <path d="M26 14 Q32 14 32 20 Q32 26 26 26" stroke="#6B4423" stroke-width="1.5" fill="none" />
              <!-- 咖啡液面 -->
              <ellipse cx="15" cy="12" rx="10" ry="2.5" fill="#4A2C17" />
              <!-- 蒸汽 -->
              <path d="M10 6 Q11 3 10 0" stroke="#999" stroke-width="0.8" fill="none" opacity="0.5" stroke-linecap="round" />
              <path d="M15 5 Q16 2 15 -1" stroke="#999" stroke-width="0.8" fill="none" opacity="0.5" stroke-linecap="round" />
              <path d="M20 6 Q21 3 20 0" stroke="#999" stroke-width="0.8" fill="none" opacity="0.5" stroke-linecap="round" />
            </svg>
          </div>

          <!-- 第5本：竖立 -->
          <slot name="book-5" />
          <!-- 第17本：我的阿勒泰（新增） -->
          <slot name="book-17" />
          <!-- 第10本：竖立（厚重本） -->
          <slot name="book-10" />
          <!-- 第6本：平放 -->
          <slot name="book-6" />

          <!-- 中部信件堆装饰（仅桌面端显示） -->
          <div class="doodle-letters self-end mx-1 md:mx-3 flex-shrink-0 hidden md:block">
            <svg class="w-8 h-8 md:w-12 md:h-11 opacity-75" viewBox="0 0 40 36" fill="none">
              <!-- 底部信封 -->
              <rect x="3" y="16" width="30" height="17" rx="1" stroke="#8B4513" stroke-width="1.3" fill="#FAF0E6" filter="url(#sketchy-line)" />
              <path d="M3 16 L18 26 L33 16" stroke="#8B4513" stroke-width="0.9" fill="none" />
              <!-- 中间信封 -->
              <rect x="6" y="10" width="30" height="17" rx="1" stroke="#8B4513" stroke-width="1.3" fill="#FFF8DC" filter="url(#sketchy-line)" />
              <path d="M6 10 L21 20 L36 10" stroke="#8B4513" stroke-width="0.9" fill="none" />
              <!-- 顶部信封（带蜡封） -->
              <rect x="4" y="3" width="26" height="15" rx="1" stroke="#8B4513" stroke-width="1.3" fill="#FFEFDB" filter="url(#sketchy-line)" />
              <path d="M4 3 L17 12 L30 3" stroke="#8B4513" stroke-width="0.9" fill="none" />
              <!-- 蜡封印 -->
              <circle cx="17" cy="13" r="2.2" fill="#DC143C" opacity="0.85" />
              <circle cx="17" cy="13" r="0.8" fill="#FFF" opacity="0.5" />
            </svg>
          </div>

          <!-- 第12本：竖立 -->
          <slot name="book-12" />
          <!-- 第19本：倾城之恋（新增） -->
          <slot name="book-19" />
          <!-- 第7本：斜靠 -->
          <slot name="book-7" />
          <!-- 第20本：摆渡人（新增） -->
          <slot name="book-20" />
          <!-- 第13本：竖立 -->
          <slot name="book-13" />
          <!-- 第8本：竖立 -->
          <slot name="book-8" />

          <!-- 右侧小台灯装饰（手机缩小） -->
          <div class="doodle-lamp self-end ml-auto flex-shrink-0">
            <svg class="w-7 h-12 md:w-[46px] md:h-[72px] opacity-70 dark:opacity-50" viewBox="0 0 38 60" fill="none">
              <!-- 灯罩 -->
              <path d="M8 8 L14 28 L24 28 L30 8 Z" stroke="#DAA520" stroke-width="1.5" fill="#FFD700" opacity="0.6" filter="url(#sketchy-line)" />
              <!-- 灯泡光晕 -->
              <circle cx="19" cy="18" r="4" fill="#FFF3B0" opacity="0.4" />
              <!-- 灯杆 -->
              <line x1="19" y1="28" x2="19" y2="50" stroke="#666" stroke-width="2" stroke-linecap="round" />
              <!-- 灯座 -->
              <ellipse cx="19" cy="53" rx="10" ry="4" fill="#555" />
              <!-- 开关 -->
              <circle cx="19" cy="40" r="1.5" fill="#333" />
            </svg>
          </div>
        </div>

        <!-- 书架板 -->
        <div class="shelf-board relative h-5">
          <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 16">
            <path
              d="M0 2 Q200 4 400 2 Q600 0 800 2 L800 14 Q600 12 400 14 Q200 16 0 14 Z"
              class="fill-amber-700 dark:fill-amber-900"
              filter="url(#sketchy-line)"
            />
            <path
              d="M0 2 Q200 4 400 2 Q600 0 800 2"
              class="stroke-amber-900 dark:stroke-amber-700"
              stroke-width="1"
              fill="none"
            />
          </svg>
          <div class="absolute left-0 right-0 -bottom-2 h-2 bg-gradient-to-b from-amber-900/30 to-transparent rounded-b" />
        </div>
      </div>

      <!-- 书架侧板（手绘风格） -->
      <div class="shelf-sides absolute inset-0 pointer-events-none">
        <!-- 左侧板 -->
        <svg class="absolute left-0 top-0 bottom-0 w-3 h-full" preserveAspectRatio="none" viewBox="0 0 12 400">
          <path d="M6 0 Q4 100 6 200 Q8 300 6 400" class="stroke-amber-800 dark:stroke-amber-700" stroke-width="4" fill="none" filter="url(#sketchy-line)" />
        </svg>
        <!-- 右侧板 -->
        <svg class="absolute right-0 top-0 bottom-0 w-3 h-full" preserveAspectRatio="none" viewBox="0 0 12 400">
          <path d="M6 0 Q8 100 6 200 Q4 300 6 400" class="stroke-amber-800 dark:stroke-amber-700" stroke-width="4" fill="none" filter="url(#sketchy-line)" />
        </svg>
      </div>

      <!-- 底部涂鸦装饰 -->
      <div class="doodle-footer flex justify-center items-center gap-4 mt-4 opacity-50">
        <!-- 小星星 -->
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1 L9.5 6 L15 6.5 L10.5 10 L12 15 L8 12 L4 15 L5.5 10 L1 6.5 L6.5 6 Z" stroke="currentColor" stroke-width="1" class="text-amber-600 dark:text-amber-400" fill="none" />
        </svg>
        <span class="text-xs text-zinc-400 dark:text-zinc-500 italic font-handwriting">~ reading is dreaming ~</span>
        <!-- 小书本图标 -->
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
          <path d="M1 2 Q4 1 9 2 Q14 1 17 2 L17 12 Q14 11 9 12 Q4 11 1 12 Z" stroke="currentColor" stroke-width="1" class="text-amber-600 dark:text-amber-400" fill="none" />
          <line x1="9" y1="2" x2="9" y2="12" stroke="currentColor" stroke-width="0.8" class="text-amber-600 dark:text-amber-400" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 书架组件 - 提供书架结构和手绘装饰
// 通过具名插槽放置书本
</script>

<style scoped>
.bookshelf-wrapper {
  font-family: 'Comic Sans MS', 'Segoe UI', cursive, sans-serif;
}
</style>

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
          <!-- 左侧书立装饰（手机缩小） -->
          <div class="bookend-left self-end mr-0.5 md:mr-1 flex-shrink-0">
            <svg class="w-3.5 h-20 md:w-6 md:h-[130px] opacity-70 dark:opacity-50" viewBox="0 0 20 100" fill="none">
              <path d="M2 98 L2 5 Q3 2 6 2 L18 2 L18 8 L8 8 L8 98 Z" stroke="currentColor" stroke-width="1.5" fill="currentColor" class="text-amber-800 dark:text-amber-600" filter="url(#sketchy-line)" />
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
          <!-- 第14本：竖立（新增，金庸系列） -->
          <slot name="book-14" />
          <!-- 第15本：竖立（新增，金庸系列） -->
          <slot name="book-15" />
          <!-- 第11本：竖立（新增） -->
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
          <!-- 第10本：竖立（新增，厚重本） -->
          <slot name="book-10" />
          <!-- 第6本：平放 -->
          <slot name="book-6" />
          <!-- 第12本：竖立（新增） -->
          <slot name="book-12" />
          <!-- 第7本：斜靠 -->
          <slot name="book-7" />
          <!-- 第13本：竖立（新增） -->
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

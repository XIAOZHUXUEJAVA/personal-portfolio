<template>
  <section id="gaming" class="py-5 px-6">
    <div class="max-w-7xl mx-auto">
      <!-- SVG 手绘抖动滤镜定义（gaming 专用，避免与 bookshelf 的 sketchy-line 冲突） -->
      <svg class="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          <filter id="sketchy-line-gaming">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.04"
              numOctaves="4"
              result="noise"
              seed="3"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <!-- Section Title -->
      <h2
        class="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-orange-500 via-green-600 to-yellow-500 bg-clip-text text-transparent"
        style="
          background-size: 200% 100%;
          animation: gradient-shift 3s ease-in-out infinite alternate;
        "
      >
        最近游玩
      </h2>

      <!-- 手绘街机柜 -->
      <div class="arcade-cabinet relative mx-auto max-w-6xl">
        <!-- === 顶部装饰栏 === -->
        <div class="cabinet-row relative">
          <!-- 顶部涂鸦区（摇杆 / 奖杯 / 三颗心） -->
          <div
            class="doodles-area flex items-end justify-between gap-1.5 px-2 md:gap-3 md:px-10 pb-1 min-h-[60px] md:min-h-[80px] relative z-10"
          >
            <!-- 左侧：街机摇杆 -->
            <div class="doodle-joystick flex-shrink-0">
              <svg
                class="w-9 h-12 md:w-[52px] md:h-[72px] opacity-85 dark:opacity-65"
                viewBox="0 0 40 56"
                fill="none"
              >
                <!-- 顶部球 -->
                <circle
                  cx="20"
                  cy="12"
                  r="7"
                  stroke="#B45309"
                  stroke-width="1.5"
                  fill="#DC143C"
                  filter="url(#sketchy-line-gaming)"
                />
                <!-- 球体高光 -->
                <ellipse
                  cx="17"
                  cy="10"
                  rx="2.5"
                  ry="1.5"
                  fill="#FFF"
                  opacity="0.55"
                />
                <!-- 摇杆杆 -->
                <line
                  x1="20"
                  y1="19"
                  x2="20"
                  y2="40"
                  stroke="#333"
                  stroke-width="3"
                  stroke-linecap="round"
                />
                <!-- 底座 -->
                <ellipse
                  cx="20"
                  cy="44"
                  rx="14"
                  ry="5"
                  stroke="#78350F"
                  stroke-width="1.5"
                  fill="#71717A"
                  filter="url(#sketchy-line-gaming)"
                />
                <!-- 底座顶面高光 -->
                <ellipse
                  cx="20"
                  cy="42"
                  rx="12"
                  ry="3"
                  fill="#A1A1AA"
                  opacity="0.5"
                />
                <!-- 地面阴影 -->
                <ellipse
                  cx="20"
                  cy="52"
                  rx="16"
                  ry="2"
                  fill="#000"
                  opacity="0.18"
                />
              </svg>
            </div>

            <!-- 中央：奖杯（仅桌面端） -->
            <div class="doodle-trophy hidden md:block flex-shrink-0">
              <svg
                class="w-11 h-[68px] opacity-80 dark:opacity-60"
                viewBox="0 0 40 56"
                fill="none"
              >
                <!-- 杯身 -->
                <path
                  d="M10 8 L10 24 Q10 34 20 34 Q30 34 30 24 L30 8 Z"
                  stroke="#B45309"
                  stroke-width="1.5"
                  fill="#FCD34D"
                  filter="url(#sketchy-line-gaming)"
                />
                <!-- 左耳 -->
                <path
                  d="M10 13 Q3 13 3 20 Q3 26 10 26"
                  stroke="#B45309"
                  stroke-width="1.5"
                  fill="none"
                  stroke-linecap="round"
                />
                <!-- 右耳 -->
                <path
                  d="M30 13 Q37 13 37 20 Q37 26 30 26"
                  stroke="#B45309"
                  stroke-width="1.5"
                  fill="none"
                  stroke-linecap="round"
                />
                <!-- 顶口 -->
                <path
                  d="M10 8 Q20 5 30 8"
                  stroke="#B45309"
                  stroke-width="1.2"
                  fill="none"
                />
                <!-- 杯身星星 -->
                <path
                  d="M20 15 L21 18 L24 18 L21.5 20 L22.5 23 L20 21 L17.5 23 L18.5 20 L16 18 L19 18 Z"
                  fill="#B45309"
                />
                <!-- 杯颈 -->
                <rect x="17" y="34" width="6" height="5" fill="#DAA520" />
                <!-- 底座 -->
                <path
                  d="M12 39 L28 39 L30 47 L10 47 Z"
                  stroke="#B45309"
                  stroke-width="1.5"
                  fill="#FCD34D"
                  filter="url(#sketchy-line-gaming)"
                />
                <!-- 底盘 -->
                <rect
                  x="8"
                  y="47"
                  width="24"
                  height="4"
                  rx="1"
                  fill="#B45309"
                />
              </svg>
            </div>

            <!-- 右侧：三颗爱心 HP -->
            <div class="doodle-hearts flex items-end gap-1 flex-shrink-0">
              <svg
                v-for="i in 3"
                :key="i"
                class="w-5 h-[18px] md:w-6 md:h-[22px] opacity-85 dark:opacity-65"
                viewBox="0 0 20 18"
                fill="none"
              >
                <path
                  d="M10 15 C10 15, 2 10, 2 6 C2 3, 4 1, 6 1 C8 1, 10 3, 10 5 C10 3, 12 1, 14 1 C16 1, 18 3, 18 6 C18 10, 10 15, 10 15 Z"
                  stroke="#B91C1C"
                  stroke-width="1.2"
                  fill="#EF4444"
                  filter="url(#sketchy-line-gaming)"
                />
                <!-- 高光 -->
                <path
                  d="M5 4 Q7 3 8 5"
                  stroke="#FFF"
                  stroke-width="0.8"
                  fill="none"
                  opacity="0.6"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </div>

          <!-- 顶部木板 -->
          <div class="shelf-board relative h-5">
            <svg
              class="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 800 16"
            >
              <path
                d="M0 2 Q200 0 400 2 Q600 4 800 2 L800 14 Q600 16 400 14 Q200 12 0 14 Z"
                class="fill-amber-700 dark:fill-amber-900"
                filter="url(#sketchy-line-gaming)"
              />
              <path
                d="M0 2 Q200 0 400 2 Q600 4 800 2"
                class="stroke-amber-900 dark:stroke-amber-700"
                stroke-width="1"
                fill="none"
              />
            </svg>
            <!-- 木板厚度阴影 -->
            <div
              class="absolute left-0 right-0 -bottom-2 h-2 bg-gradient-to-b from-amber-900/30 to-transparent rounded-b"
            />
          </div>
        </div>

        <!-- === 屏幕区域（BendingGallery） === -->
        <div class="screen-wrapper relative py-3 px-2 md:px-8">
          <div
            class="h-96 w-full bg-amber-50/55 dark:bg-amber-950/30 backdrop-blur-md rounded-2xl overflow-clip flex items-center justify-center border-2 border-amber-800/30 dark:border-amber-700/40 shadow-inner shadow-amber-900/20"
          >
            <BendingGallery :items="items" :bend="2" :border-radius="0.1" />
          </div>
          <!-- 屏幕四角螺丝钉（手绘） -->
          <div
            v-for="pos in screwPositions"
            :key="pos.key"
            class="absolute w-2.5 h-2.5 md:w-3 md:h-3 opacity-70 dark:opacity-55"
            :style="pos.style"
          >
            <svg viewBox="0 0 12 12" fill="none">
              <circle
                cx="6"
                cy="6"
                r="5"
                stroke="#78350F"
                stroke-width="1"
                fill="#B45309"
                filter="url(#sketchy-line-gaming)"
              />
              <!-- 十字槽 -->
              <line
                x1="3"
                y1="6"
                x2="9"
                y2="6"
                stroke="#3F1F04"
                stroke-width="1"
                stroke-linecap="round"
              />
              <line
                x1="6"
                y1="3"
                x2="6"
                y2="9"
                stroke="#3F1F04"
                stroke-width="1"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>

        <!-- === 底部装饰栏 === -->
        <div class="cabinet-row relative">
          <!-- 底部木板 -->
          <div class="shelf-board relative h-5">
            <svg
              class="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 800 16"
            >
              <path
                d="M0 2 Q200 4 400 2 Q600 0 800 2 L800 14 Q600 12 400 14 Q200 16 0 14 Z"
                class="fill-amber-700 dark:fill-amber-900"
                filter="url(#sketchy-line-gaming)"
              />
              <path
                d="M0 2 Q200 4 400 2 Q600 0 800 2"
                class="stroke-amber-900 dark:stroke-amber-700"
                stroke-width="1"
                fill="none"
              />
            </svg>
            <div
              class="absolute left-0 right-0 -bottom-2 h-2 bg-gradient-to-b from-amber-900/30 to-transparent rounded-b"
            />
          </div>

          <!-- 底部涂鸦区（手柄 / press start / 骰子） -->
          <div
            class="doodles-area flex items-center justify-between gap-1.5 px-2 md:gap-3 md:px-10 pt-3 min-h-[60px] md:min-h-[80px] relative z-10"
          >
            <!-- 左侧：游戏手柄 -->
            <div class="doodle-gamepad flex-shrink-0">
              <svg
                class="w-14 h-9 md:w-[68px] md:h-11 opacity-80 dark:opacity-60"
                viewBox="0 0 60 36"
                fill="none"
              >
                <!-- 手柄主体 -->
                <path
                  d="M12 8 Q6 8 4 16 Q2 28 8 30 Q14 30 18 24 L42 24 Q46 30 52 30 Q58 28 56 16 Q54 8 48 8 Z"
                  stroke="#78350F"
                  stroke-width="1.5"
                  fill="#8B4513"
                  filter="url(#sketchy-line-gaming)"
                />
                <!-- 左侧十字方向键 -->
                <line
                  x1="14"
                  y1="14"
                  x2="14"
                  y2="20"
                  stroke="#FFF"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <line
                  x1="11"
                  y1="17"
                  x2="17"
                  y2="17"
                  stroke="#FFF"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <!-- 中央双开关 -->
                <ellipse cx="27" cy="15" rx="3" ry="1.2" fill="#4B5563" />
                <ellipse cx="34" cy="15" rx="3" ry="1.2" fill="#4B5563" />
                <!-- 右侧 A/B 按钮 -->
                <circle
                  cx="44"
                  cy="14"
                  r="2.6"
                  fill="#DC143C"
                  stroke="#7F1D1D"
                  stroke-width="0.6"
                />
                <circle
                  cx="50"
                  cy="18"
                  r="2.6"
                  fill="#FCD34D"
                  stroke="#B45309"
                  stroke-width="0.6"
                />
              </svg>
            </div>

            <!-- 中央：手写字 + 星 + 金币 -->
            <div
              class="doodle-footer flex items-center gap-2 md:gap-3 opacity-70"
            >
              <!-- 星星 -->
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1 L9.5 6 L15 6.5 L10.5 10 L12 15 L8 12 L4 15 L5.5 10 L1 6.5 L6.5 6 Z"
                  stroke="currentColor"
                  stroke-width="1"
                  class="text-amber-600 dark:text-amber-400"
                  fill="none"
                />
              </svg>
              <span
                class="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 italic font-handwriting whitespace-nowrap"
              >
                ~ press start to play ~
              </span>
              <!-- 金币 -->
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  stroke="#B45309"
                  stroke-width="1"
                  fill="#FCD34D"
                  filter="url(#sketchy-line-gaming)"
                />
                <text
                  x="8"
                  y="11"
                  text-anchor="middle"
                  font-size="8"
                  font-weight="bold"
                  fill="#B45309"
                  font-family="Comic Sans MS, cursive"
                >
                  $
                </text>
              </svg>
            </div>

            <!-- 右侧：骰子 -->
            <div class="doodle-dice flex-shrink-0">
              <svg
                class="w-9 h-9 md:w-11 md:h-11 opacity-80 dark:opacity-60"
                viewBox="0 0 40 40"
                fill="none"
              >
                <g transform="rotate(-10 20 20)">
                  <rect
                    x="6"
                    y="6"
                    width="28"
                    height="28"
                    rx="4"
                    stroke="#78350F"
                    stroke-width="1.5"
                    fill="#FFF8DC"
                    filter="url(#sketchy-line-gaming)"
                  />
                  <!-- 5 点 -->
                  <circle cx="13" cy="13" r="1.8" fill="#7F1D1D" />
                  <circle cx="27" cy="13" r="1.8" fill="#333" />
                  <circle cx="20" cy="20" r="1.8" fill="#7F1D1D" />
                  <circle cx="13" cy="27" r="1.8" fill="#333" />
                  <circle cx="27" cy="27" r="1.8" fill="#7F1D1D" />
                </g>
              </svg>
            </div>
          </div>
        </div>

        <!-- 左右侧板（手绘竖线） -->
        <div class="cabinet-sides absolute inset-0 pointer-events-none">
          <svg
            class="absolute left-0 top-0 bottom-0 w-3 h-full"
            preserveAspectRatio="none"
            viewBox="0 0 12 400"
          >
            <path
              d="M6 0 Q4 100 6 200 Q8 300 6 400"
              class="stroke-amber-800 dark:stroke-amber-700"
              stroke-width="4"
              fill="none"
              filter="url(#sketchy-line-gaming)"
            />
          </svg>
          <svg
            class="absolute right-0 top-0 bottom-0 w-3 h-full"
            preserveAspectRatio="none"
            viewBox="0 0 12 400"
          >
            <path
              d="M6 0 Q8 100 6 200 Q4 300 6 400"
              class="stroke-amber-800 dark:stroke-amber-700"
              stroke-width="4"
              fill="none"
              filter="url(#sketchy-line-gaming)"
            />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { BendingGallery } from "~/components/ui/bending-gallery";

// 游戏卡片数据
const items = ref<Array<{ image: string; text: string }>>([
  { image: "/images/games/33.png", text: "" },
  { image: "/images/games/bloodborne.jpg", text: "" },
  { image: "/images/games/dark-souls-iii.jpg", text: "" },
  { image: "/images/games/eldenring.png", text: "" },
  { image: "/images/games/god-of-war.png", text: "" },
  { image: "/images/games/nioh2.png", text: "" },
  { image: "/images/games/sekiro.png", text: "" },
  { image: "/images/games/spider2.png", text: "" },
  { image: "/images/games/the-last-of-us-part1.png", text: "" },
  { image: "/images/games/the-last-of-us-part2.png", text: "" },
  { image: "/images/games/wolong.png", text: "" },
  { image: "/images/games/wukong.png", text: "" },
]);

// 屏幕四角螺丝钉定位配置
const screwPositions = [
  { key: "tl", style: { top: "18px", left: "18px" } },
  { key: "tr", style: { top: "18px", right: "18px" } },
  { key: "bl", style: { bottom: "18px", left: "18px" } },
  { key: "br", style: { bottom: "18px", right: "18px" } },
];
</script>

<style scoped>
.arcade-cabinet {
  /* 与书架保持同款手写字体，营造"同一本手账"的一致感 */
  font-family: "Comic Sans MS", "Segoe UI", cursive, sans-serif;
}

.font-handwriting {
  font-family: "Comic Sans MS", "Segoe UI", cursive, sans-serif;
}
</style>

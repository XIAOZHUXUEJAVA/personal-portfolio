<template>
  <div
    class="shelf-book relative cursor-pointer transition-all duration-300 group"
    :class="[
      modeClass,
      { 'hover:-translate-y-4': mode === 'upright' || mode === 'leaning' },
      { 'hover:-translate-y-2': mode === 'flat' },
    ]"
    :style="bookStyle"
    @click="$emit('click')"
  >
    <!-- === 竖立书本 - 简笔插画书脊 === -->
    <template v-if="mode === 'upright'">
      <svg
        class="w-full h-full drop-shadow-sm"
        :viewBox="`0 0 ${thickness} ${height}`"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- 书脊底色（柔和色块） -->
        <rect
          x="1.5" y="1.5"
          :width="thickness - 3"
          :height="height - 3"
          rx="2"
          :fill="palette.fill"
          stroke="currentColor"
          stroke-width="1.8"
          class="text-zinc-700 dark:text-zinc-400"
          filter="url(#sketchy-line)"
        />
        <!-- 顶部装饰线 -->
        <line
          :x1="thickness * 0.2" y1="10"
          :x2="thickness * 0.8" y2="10"
          stroke="currentColor" stroke-width="1" stroke-linecap="round"
          class="text-zinc-600 dark:text-zinc-400" opacity="0.6"
        />
        <line
          :x1="thickness * 0.3" y1="14"
          :x2="thickness * 0.7" y2="14"
          stroke="currentColor" stroke-width="0.8" stroke-linecap="round"
          class="text-zinc-600 dark:text-zinc-400" opacity="0.4"
        />
        <!-- 底部装饰线 -->
        <line
          :x1="thickness * 0.2" :y1="height - 12"
          :x2="thickness * 0.8" :y2="height - 12"
          stroke="currentColor" stroke-width="1" stroke-linecap="round"
          class="text-zinc-600 dark:text-zinc-400" opacity="0.6"
        />
        <!-- 中间小装饰图案（放在书名上方，避免与书名重叠） -->
        <g :transform="`translate(${thickness / 2}, ${height * 0.12})`" opacity="0.5">
          <!-- 根据书的颜色画不同的小涂鸦 -->
          <template v-if="decoType === 'star'">
            <path d="M0 -5 L1.5 -1.5 L5.5 -1 L2.5 1.5 L3.5 5.5 L0 3 L-3.5 5.5 L-2.5 1.5 L-5.5 -1 L-1.5 -1.5 Z"
              stroke="currentColor" stroke-width="0.8" fill="none" class="text-zinc-600 dark:text-zinc-400" />
          </template>
          <template v-else-if="decoType === 'heart'">
            <path d="M0 2 Q-4 -2 -3 -4 Q-1 -6 0 -3 Q1 -6 3 -4 Q4 -2 0 2 Z"
              stroke="currentColor" stroke-width="0.8" fill="none" class="text-zinc-600 dark:text-zinc-400" />
          </template>
          <template v-else-if="decoType === 'diamond'">
            <path d="M0 -5 L4 0 L0 5 L-4 0 Z"
              stroke="currentColor" stroke-width="0.8" fill="none" class="text-zinc-600 dark:text-zinc-400" />
          </template>
          <template v-else>
            <circle r="3" stroke="currentColor" stroke-width="0.8" fill="none" class="text-zinc-600 dark:text-zinc-400" />
            <circle r="1" fill="currentColor" class="text-zinc-600 dark:text-zinc-400" />
          </template>
        </g>
        <!-- 书名竖排文字区域（使用 foreignObject） -->
        <foreignObject
          :x="1" :y="height * 0.24"
          :width="thickness - 2" :height="height * 0.56"
        >
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            class="writing-vertical w-full h-full flex items-center justify-center"
          >
            <span class="text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-tight tracking-wider select-none text-center" style="-webkit-font-smoothing: antialiased;">
              {{ title }}
            </span>
          </div>
        </foreignObject>
      </svg>
    </template>

    <!-- === 斜靠书本 - 简笔插画封面 === -->
    <template v-else-if="mode === 'leaning'">
      <div
        class="relative w-full h-full"
        :style="{
          transform: `rotate(${leanAngle}deg)`,
          transformOrigin: leanAngle < 0 ? '0% 100%' : '100% 100%',
        }"
      >
        <svg
          class="w-full h-full drop-shadow-sm"
          :viewBox="`0 0 ${Math.round(thickness * 2.2)} ${Math.round(height * 0.85)}`"
          fill="none"
        >
          <!-- 封面底色 -->
          <rect
            x="1.5" y="1.5"
            :width="Math.round(thickness * 2.2) - 3"
            :height="Math.round(height * 0.85) - 3"
            rx="2"
            :fill="palette.fill"
            stroke="currentColor" stroke-width="1.8"
            class="text-zinc-700 dark:text-zinc-400"
            filter="url(#sketchy-line)"
          />
          <!-- 书名框 -->
          <rect
            :x="thickness * 0.3" :y="Math.round(height * 0.2)"
            :width="Math.round(thickness * 1.6)" :height="Math.round(height * 0.35)"
            rx="2" fill="white" fill-opacity="0.4"
            stroke="currentColor" stroke-width="0.8" stroke-dasharray="2 2"
            class="text-zinc-500 dark:text-zinc-400"
          />
          <!-- 书名 -->
          <foreignObject
            :x="thickness * 0.3" :y="Math.round(height * 0.2)"
            :width="Math.round(thickness * 1.6)" :height="Math.round(height * 0.35)"
          >
            <div xmlns="http://www.w3.org/1999/xhtml" class="w-full h-full flex flex-col items-center justify-center px-1.5">
              <span class="text-xs font-bold text-zinc-800 dark:text-zinc-200 text-center leading-tight" style="-webkit-font-smoothing: antialiased;">
                {{ title }}
              </span>
              <span class="text-[9px] text-zinc-600 dark:text-zinc-400 mt-1 font-medium">
                {{ author }}
              </span>
            </div>
          </foreignObject>
          <!-- 底部小涂鸦 -->
          <g :transform="`translate(${Math.round(thickness * 1.1)}, ${Math.round(height * 0.7)})`" opacity="0.4">
            <path d="M-4 0 Q0 -3 4 0 Q0 3 -4 0" stroke="currentColor" stroke-width="0.8" fill="none" class="text-zinc-600 dark:text-zinc-400" />
          </g>
        </svg>
      </div>
    </template>

    <!-- === 平放书本 - 简笔插画侧视 === -->
    <template v-else-if="mode === 'flat'">
      <svg
        class="w-full drop-shadow-sm"
        :viewBox="`0 0 ${Math.round(height * 0.6)} ${flatHeight}`"
        fill="none"
        :style="{ height: flatHeight + 'px' }"
      >
        <!-- 书的侧面 -->
        <rect
          x="1" y="1"
          :width="Math.round(height * 0.6) - 2"
          :height="flatHeight - 2"
          rx="1"
          :fill="palette.fill"
          stroke="currentColor" stroke-width="1.5"
          class="text-zinc-700 dark:text-zinc-400"
          filter="url(#sketchy-line)"
        />
        <!-- 页面线条 -->
        <line
          :x1="Math.round(height * 0.6) - 6" y1="3"
          :x2="Math.round(height * 0.6) - 6" :y2="flatHeight - 3"
          stroke="currentColor" stroke-width="0.5" class="text-zinc-500" opacity="0.4"
        />
        <!-- 书名 -->
        <foreignObject x="4" y="1" :width="Math.round(height * 0.6) - 14" :height="flatHeight - 2">
          <div xmlns="http://www.w3.org/1999/xhtml" class="w-full h-full flex items-center justify-center">
            <span class="text-[11px] font-bold text-zinc-700 dark:text-zinc-200 truncate select-none" style="-webkit-font-smoothing: antialiased;">
              {{ title }}
            </span>
          </div>
        </foreignObject>
      </svg>
    </template>

    <!-- hover 详情气泡（所有模式共用） -->
    <div
      class="absolute left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50"
      :class="mode === 'flat' ? '-top-24' : '-top-[110px]'"
    >
      <div class="relative bg-amber-50 dark:bg-zinc-800 rounded-xl px-5 py-3 shadow-xl border-2 border-zinc-700 dark:border-zinc-500 whitespace-nowrap">
        <p class="text-base font-bold text-zinc-800 dark:text-zinc-100" style="-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">{{ title }}</p>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5" style="-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">{{ author }}</p>
        <div class="flex items-center gap-2 mt-2">
          <span class="text-xs font-medium px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200" style="-webkit-font-smoothing: antialiased;">{{ status }}</span>
          <div class="flex items-center gap-1.5">
            <div class="w-20 h-2 bg-zinc-200 dark:bg-zinc-600 rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-500">
              <div class="h-full bg-emerald-400 rounded-full" :style="{ width: progress + '%' }" />
            </div>
            <span class="text-xs font-medium text-zinc-600 dark:text-zinc-300" style="-webkit-font-smoothing: antialiased;">{{ progress }}%</span>
          </div>
        </div>
        <!-- 手绘三角箭头 -->
        <svg class="absolute -bottom-3 left-1/2 -translate-x-1/2" width="16" height="10" viewBox="0 0 16 10" fill="none">
          <path d="M1 0 Q8 10 15 0" fill="currentColor" class="text-amber-50 dark:text-zinc-800" />
          <path d="M1 0 Q8 10 15 0" stroke="currentColor" stroke-width="1.5" fill="none" class="text-zinc-700 dark:text-zinc-500" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

export interface ShelfBookProps {
  title: string;
  author: string;
  color: string;
  progress: number;
  status: string;
  mode?: "upright" | "leaning" | "flat";
  thickness?: number;
  height?: number;
  leanAngle?: number;
  flatHeight?: number;
}

const props = withDefaults(defineProps<ShelfBookProps>(), {
  mode: "upright",
  thickness: 28,
  height: 140,
  leanAngle: -12,
  flatHeight: 18,
});

defineEmits<{
  click: [];
}>();

// 简笔插画风格的柔和色板
const colorPalette = {
  blue: { fill: "#DBEAFE", accent: "#3B82F6" },
  emerald: { fill: "#D1FAE5", accent: "#10B981" },
  purple: { fill: "#EDE9FE", accent: "#8B5CF6" },
  red: { fill: "#FEE2E2", accent: "#EF4444" },
  yellow: { fill: "#FEF3C7", accent: "#F59E0B" },
  gray: { fill: "#F3F4F6", accent: "#6B7280" },
  green: { fill: "#DCFCE7", accent: "#22C55E" },
  orange: { fill: "#FFEDD5", accent: "#F97316" },
} as const;

type PaletteKey = keyof typeof colorPalette;
const defaultPalette = colorPalette.gray;

const palette = computed(() => {
  const key = props.color as PaletteKey;
  return colorPalette[key] || defaultPalette;
});

// 根据颜色选择不同的小装饰图案
const decoType = computed(() => {
  const map: Record<string, string> = {
    blue: "star",
    emerald: "heart",
    purple: "diamond",
    red: "star",
    yellow: "circle",
    gray: "diamond",
    green: "heart",
    orange: "circle",
  };
  return map[props.color] || "circle";
});

const bookStyle = computed(() => {
  if (props.mode === "upright") {
    return { width: props.thickness + "px", height: props.height + "px" };
  }
  if (props.mode === "leaning") {
    return { width: Math.round(props.thickness * 2.2) + "px", height: Math.round(props.height * 0.85) + "px" };
  }
  return { width: Math.round(props.height * 0.6) + "px" };
});

const modeClass = computed(() => ({
  upright: "self-end",
  leaning: "self-end origin-bottom",
  flat: "self-end",
})[props.mode]);
</script>

<style scoped>
.writing-vertical {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
</style>

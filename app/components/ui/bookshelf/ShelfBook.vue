<template>
  <div
    class="shelf-book relative cursor-pointer self-end"
    :class="{ 'is-reading': status === '在读' }"
    :data-mode="mode"
    :style="bookStyle"
    role="button"
    tabindex="0"
    aria-haspopup="dialog"
    :aria-label="`${title}，${author}，${status}，阅读进度 ${safeProgress}%，查看书籍详情`"
    @click="$emit('click')"
    @keydown.enter.prevent="$emit('click')"
    @keydown.space.prevent="$emit('click')"
  >
    <!-- 书本插画和文字分层，阴影、手绘滤镜仅用于书本轮廓。 -->
    <div class="book-art relative w-full h-full" :style="artStyle">
      <svg
        v-if="mode === 'upright'"
        class="book-illustration w-full h-full"
        :viewBox="`0 0 ${thickness} ${height}`"
        fill="none"
        aria-hidden="true"
      >
        <g class="book-surface">
          <rect
            x="1.5" y="1.5"
            :width="thickness - 3" :height="height - 3"
            rx="2.5" :fill="palette.fill"
            stroke="currentColor" stroke-width="1.3"
            class="book-outline" filter="url(#sketchy-line)"
          />
        </g>
        <!-- 书脊折线与封边高光 -->
        <path :d="`M5 8 V${height - 8}`" stroke="white" stroke-opacity="0.65" stroke-linecap="round" />
        <path :d="`M${thickness - 6} 8 V${height - 8}`" stroke="currentColor" stroke-opacity="0.12" class="book-outline" />
        <g stroke="currentColor" class="book-detail" stroke-linecap="round">
          <line :x1="thickness * 0.2" y1="10" :x2="thickness * 0.8" y2="10" stroke-width="0.8" />
          <line :x1="thickness * 0.3" y1="14" :x2="thickness * 0.7" y2="14" stroke-width="0.6" opacity="0.6" />
          <line :x1="thickness * 0.2" :y1="height - 12" :x2="thickness * 0.8" :y2="height - 12" stroke-width="0.8" />
        </g>
        <g :transform="`translate(${thickness / 2}, 27)`" class="book-detail" stroke="currentColor" stroke-width="0.8">
          <path v-if="decoType === 'star'" d="M0 -5 L1.5 -1.5 L5.5 -1 L2.5 1.5 L3.5 5.5 L0 3 L-3.5 5.5 L-2.5 1.5 L-5.5 -1 L-1.5 -1.5 Z" />
          <path v-else-if="decoType === 'heart'" d="M0 2 Q-4 -2 -3 -4 Q-1 -6 0 -3 Q1 -6 3 -4 Q4 -2 0 2 Z" />
          <path v-else-if="decoType === 'diamond'" d="M0 -5 L4 0 L0 5 L-4 0 Z" />
          <g v-else>
            <circle r="3" />
            <circle r="1" fill="currentColor" stroke="none" />
          </g>
        </g>
      </svg>

      <svg
        v-else-if="mode === 'leaning'"
        class="book-illustration w-full h-full"
        :viewBox="`0 0 ${coverWidth} ${coverHeight}`"
        fill="none"
        aria-hidden="true"
      >
        <g class="book-surface">
          <rect
            x="1.5" y="1.5" :width="coverWidth - 3" :height="coverHeight - 3"
            rx="2.5" :fill="palette.fill"
            stroke="currentColor" stroke-width="1.3"
            class="book-outline" filter="url(#sketchy-line)"
          />
        </g>
        <path :d="`M6 7 V${coverHeight - 7}`" stroke="white" stroke-opacity="0.65" />
        <path :d="`M10 7 V${coverHeight - 7}`" stroke="currentColor" stroke-opacity="0.1" class="book-outline" />
        <rect
          :x="Math.round(coverWidth * 0.15)" :y="Math.round(coverHeight * 0.23)"
          :width="Math.round(coverWidth * 0.72)" :height="Math.round(coverHeight * 0.43)"
          rx="2" fill="white" fill-opacity="0.35"
          stroke="currentColor" stroke-width="0.7" stroke-dasharray="1 3"
          class="book-detail"
        />
        <g :transform="`translate(${Math.round(coverWidth / 2)}, ${Math.round(coverHeight * 0.8)})`" class="book-detail">
          <path d="M-4 0 Q0 -3 4 0 Q0 3 -4 0" stroke="currentColor" stroke-width="0.8" />
        </g>
      </svg>

      <svg
        v-else
        class="book-illustration w-full h-full"
        :viewBox="`0 0 ${Math.round(height * 0.6)} ${flatHeight}`"
        fill="none"
        aria-hidden="true"
      >
        <g class="book-surface">
          <rect
            x="1.5" y="1.5" :width="Math.round(height * 0.6) - 3" :height="flatHeight - 3"
            rx="2" :fill="palette.fill" stroke="currentColor" stroke-width="1.2"
            class="book-outline" filter="url(#sketchy-line)"
          />
        </g>
        <path :d="`M6 5 H${Math.round(height * 0.6) - 6}`" stroke="white" stroke-opacity="0.65" />
        <line
          :x1="Math.round(height * 0.6) - 6" y1="5"
          :x2="Math.round(height * 0.6) - 6" :y2="flatHeight - 5"
          stroke="currentColor" stroke-width="0.6" class="book-detail"
        />
      </svg>

      <!-- 原生 HTML 文字保持独立，不参与 SVG 的滤镜处理。 -->
      <div class="book-lettering" :class="`book-lettering--${mode}`" aria-hidden="true">
        <span class="book-title">{{ title }}</span>
        <span v-if="mode === 'leaning'" class="book-author">{{ author }}</span>
      </div>
      <span v-if="status === '在读'" class="reading-ribbon" aria-hidden="true" />
    </div>

    <div class="book-tooltip" aria-hidden="true">
      <div class="tooltip-card">
        <p class="tooltip-title">{{ title }}</p>
        <p class="tooltip-author">{{ author }}</p>
        <div class="tooltip-meta">
          <span class="tooltip-status">{{ status }}</span>
          <div class="tooltip-progress">
            <span class="progress-track"><span :style="{ width: `${safeProgress}%` }" /></span>
            <span>{{ safeProgress }}%</span>
          </div>
        </div>
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

defineEmits<{ click: [] }>();

// 降低饱和度，让书封更接近柔和的纸张颜色。
const colorPalette = {
  blue: { fill: "#DFE9F3", accent: "#6C88A5" },
  emerald: { fill: "#DDEEE5", accent: "#658B76" },
  purple: { fill: "#EAE5F2", accent: "#8A7A9E" },
  red: { fill: "#F2E0DF", accent: "#AF7975" },
  yellow: { fill: "#F4EDCF", accent: "#A18A4E" },
  gray: { fill: "#ECECE8", accent: "#85877E" },
  green: { fill: "#E2EEDF", accent: "#7B9270" },
  orange: { fill: "#F5E6D5", accent: "#AD8762" },
} as const;

const palette = computed(() => colorPalette[props.color as keyof typeof colorPalette] || colorPalette.gray);
const safeProgress = computed(() => Number.isFinite(props.progress) ? Math.min(100, Math.max(0, props.progress)) : 0);
const coverWidth = computed(() => Math.round(props.thickness * 2.2));
const coverHeight = computed(() => Math.round(props.height * 0.85));

const decoType = computed(() => {
  const decorations: Record<string, string> = {
    blue: "star", emerald: "heart", purple: "diamond", red: "star",
    yellow: "circle", gray: "diamond", green: "heart", orange: "circle",
  };
  return decorations[props.color] || "circle";
});

const bookStyle = computed(() => ({
  width: `${props.mode === "leaning" ? coverWidth.value : props.mode === "flat" ? Math.round(props.height * 0.6) : props.thickness}px`,
  height: `${props.mode === "leaning" ? coverHeight.value : props.mode === "flat" ? props.flatHeight : props.height}px`,
  "--book-accent": palette.value.accent,
  "--spine-title-size": `${Math.min(15, Math.max(11, Math.floor((props.height - 66) / Math.max(Array.from(props.title).length, 1) / 1.08)))}px`,
}));

const artStyle = computed(() => props.mode === "leaning" ? {
  transform: `rotate(${props.leanAngle}deg)`,
  transformOrigin: props.leanAngle < 0 ? "0% 100%" : "100% 100%",
} : undefined);
</script>

<style scoped>
.shelf-book {
  flex: 0 0 auto;
  outline: none;
  border-radius: 3px;
  -webkit-tap-highlight-color: transparent;
  transition: transform 220ms ease;
}

.shelf-book:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 6px;
}

.shelf-book:hover,
.shelf-book:focus-visible { z-index: 30; }
.book-illustration { display: block; overflow: visible; }
.book-surface { filter: drop-shadow(1px 2px 1px rgb(54 44 32 / 0.13)); }
.book-outline { color: #62615a; }
.book-detail { color: #79796e; opacity: 0.55; }

.book-lettering {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #343a35;
  font-family: "LXGW WenKai", "Microsoft YaHei", "PingFang SC", sans-serif;
  font-weight: 500;
  text-shadow: none;
  user-select: none;
  pointer-events: none;
}

.book-lettering--upright { inset: 38px 6px 28px; }
.book-lettering--upright .book-title {
  writing-mode: vertical-rl;
  text-orientation: upright;
  white-space: nowrap;
  font-size: var(--spine-title-size);
  line-height: 1.25;
  letter-spacing: 0.08em;
}

.book-lettering--leaning {
  left: 15%;
  top: 23%;
  width: 72%;
  height: 43%;
  padding: 5px;
  flex-direction: column;
  gap: 7px;
  text-align: center;
}

.book-lettering--leaning .book-title { font-size: 14px; line-height: 1.45; text-wrap: balance; }
.book-author { color: #686d63; font-size: 11px; line-height: 1.4; text-wrap: balance; }
.book-lettering--flat { inset: 4px 10px 4px 6px; }
.book-lettering--flat .book-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  letter-spacing: 0.03em;
}

.reading-ribbon {
  position: absolute;
  top: -2px;
  right: 7px;
  width: 6px;
  height: 21px;
  background: var(--book-accent);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%);
  pointer-events: none;
}

[data-mode="leaning"] .reading-ribbon { right: 12px; height: 25px; }
[data-mode="flat"] .reading-ribbon { right: 10px; height: 12px; }

.book-tooltip {
  position: absolute;
  bottom: calc(100% + 20px);
  left: 50%;
  z-index: 50;
  width: max-content;
  max-width: 220px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, 5px);
  pointer-events: none;
  transition: opacity 180ms ease, transform 180ms ease, visibility 180ms ease;
}

.shelf-book:hover .book-tooltip,
.shelf-book:focus-visible .book-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0);
}

.tooltip-card {
  position: relative;
  padding: 13px 16px;
  border: 1px solid var(--border);
  border-radius: 9px;
  background: var(--popover);
  color: var(--popover-foreground);
  box-shadow: var(--surface-shadow-hover);
}

.tooltip-card::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: calc(50% - 4px);
  width: 8px;
  height: 8px;
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  background: inherit;
  transform: rotate(45deg);
}

.tooltip-title { font-size: 15px; font-weight: 600; line-height: 1.5; }
.tooltip-author { margin-top: 3px; color: var(--muted-foreground); font-size: 12px; }
.tooltip-meta { display: flex; align-items: center; gap: 12px; margin-top: 10px; font-size: 11px; }
.tooltip-status { padding: 2px 6px; border-radius: 3px; background: var(--muted); white-space: nowrap; }
.is-reading .tooltip-status { color: var(--accent-foreground); background: var(--accent); }
.tooltip-progress { display: flex; align-items: center; gap: 6px; }
.progress-track { width: 54px; height: 4px; overflow: hidden; border-radius: 2px; background: var(--muted); }
.progress-track > span { display: block; height: 100%; border-radius: inherit; background: var(--primary); }

.dark .book-outline { color: #a6a699; }

@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .shelf-book:hover { transform: translateY(-7px); }
}

@media (prefers-reduced-motion: reduce) {
  .shelf-book, .book-tooltip { transition: none; }
}
</style>

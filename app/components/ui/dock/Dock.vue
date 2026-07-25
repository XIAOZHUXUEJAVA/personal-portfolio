<template>
  <div
    ref="dockRef"
    :class="
      cn(
        'supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto mt-8 flex h-12 w-max max-w-[calc(100vw-2rem)] rounded-2xl border p-1.5 backdrop-blur-md transition-all gap-2 sm:h-[58px] sm:p-2 sm:gap-4',
        orientation === 'vertical' && 'flex-col w-[58px] h-max',
        props.class,
        dockClass,
      )
    "
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import type { DataOrientation, Direction } from "./types";
import {
  MOUSE_X_INJECTION_KEY,
  MOUSE_Y_INJECTION_KEY,
  MAGNIFICATION_INJECTION_KEY,
  DISTANCE_INJECTION_KEY,
  ORIENTATION_INJECTION_KEY,
} from "./injectionKeys";

interface DockProps {
  class?: HTMLAttributes["class"];
  magnification?: number;
  distance?: number;
  direction?: Direction;
  orientation?: DataOrientation;
}

const props = withDefaults(defineProps<DockProps>(), {
  magnification: 60,
  distance: 140,
  direction: "middle",
  orientation: "horizontal",
});

const dockRef = ref<HTMLElement | null>(null);
const mouseX = ref(Infinity);
const mouseY = ref(Infinity);
const magnification = computed(() => props.magnification);
const distance = computed(() => props.distance);

// 触屏设备没有真正的 hover，跳过放大交互，避免点击后图标卡在放大状态撑宽导航
const canHover =
  typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

const dockClass = computed(() => ({
  "items-start": props.direction === "top",
  "items-center": props.direction === "middle",
  "items-end": props.direction === "bottom",
}));

function onMouseMove(e: MouseEvent) {
  if (!canHover) return;
  requestAnimationFrame(() => {
    mouseX.value = e.pageX;
    mouseY.value = e.pageY;
  });
}

function onMouseLeave() {
  requestAnimationFrame(() => {
    mouseX.value = Infinity;
    mouseY.value = Infinity;
  });
}
provide(MOUSE_X_INJECTION_KEY, mouseX);
provide(MOUSE_Y_INJECTION_KEY, mouseY);
provide(ORIENTATION_INJECTION_KEY, props.orientation);
provide(MAGNIFICATION_INJECTION_KEY, magnification);
provide(DISTANCE_INJECTION_KEY, distance);
</script>

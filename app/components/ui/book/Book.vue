<template>
  <div
    :class="
      cn(
        'book group relative [perspective:800px] w-fit max-w-full',
        $props.class,
      )
    "
  >
    <div
      :style="{ width: sizeMap[size].width, maxWidth: '100%', transitionDuration: `${props.duration}ms` }"
      :class="[
        'book-volume relative aspect-[3/4] [transform-style:preserve-3d]',
        isStatic
          ? '[transform:rotateY(-30deg)]'
          : '[transform:rotateY(0deg)]',
        radiusMap[radius],
      ]"
    >
      <div
        :class="`
          book-front
          absolute inset-y-0 overflow-hidden size-full left-0
          text-white flex flex-col justify-end p-6
          bg-gradient-to-tr
          ${computedGradient.from}
          ${computedGradient.to}
          ${radiusMap[radius]}
        `"
        :style="{
          transform: 'translateZ(25px)',
          boxShadow: '3px 5px 14px var(--shadowColor)',
          background: coverColor,
        }"
      >
        <div
          class="absolute left-0 top-0 h-full"
          :style="{
            minWidth: '8.2%',
            background:
              'linear-gradient(90deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0) 12%, hsla(0, 0%, 100%, .25) 29.25%, hsla(0, 0%, 100%, 0) 50.5%, hsla(0, 0%, 100%, 0) 75.25%, hsla(0, 0%, 100%, .25) 91%, hsla(0, 0%, 100%, 0)), linear-gradient(90deg, rgba(0, 0, 0, .03), rgba(0, 0, 0, .1) 12%, transparent 30%, rgba(0, 0, 0, .02) 50%, rgba(0, 0, 0, .2) 73.5%, rgba(0, 0, 0, .5) 75.25%, rgba(0, 0, 0, .15) 85.25%, transparent)',
            opacity: '0.2',
          }"
        ></div>
        <div :class="cn('relative pl-1', contentClass)">
          <slot />
        </div>
      </div>

      <div
        class="absolute left-0 bg-white"
        aria-hidden="true"
        :style="{
          top: '3px',
          bottom: '3px',
          width: '48px',
          left: 'calc(100% - 28px)',
          transform: 'rotateY(90deg)',
          background: 'repeating-linear-gradient(90deg, #f3f1e9 0px, #f3f1e9 2px, #e4e2d8 2px, #e4e2d8 3px)',
        }"
      ></div>

      <div
        aria-hidden="true"
        :class="`
          absolute inset-y-0 overflow-hidden size-full left-0
          text-white flex flex-col justify-end p-6
          bg-gradient-to-tr
          ${computedGradient.from}
          ${computedGradient.to}
          ${radiusMap[radius]}
        `"
        :style="{
          transform: 'translateZ(-25px)',
          boxShadow: shadowSizeMap[shadowSize],
          background: coverColor,
        }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { computed } from "vue";
import {
  BOOK_RADIUS_MAP as radiusMap,
  BOOK_SIZE_MAP as sizeMap,
  BOOK_COLOR_MAP as colorMap,
  BOOK_SHADOW_SIZE_MAP as shadowSizeMap,
  type BookRadius,
  type BookSize,
  type BookColor,
  type BookShadowSize,
} from "./index";

interface BookProps {
  class?: HTMLAttributes["class"];
  duration?: number;
  color?: BookColor;
  isStatic?: boolean;
  size?: BookSize;
  radius?: BookRadius;
  shadowSize?: BookShadowSize;
  coverColor?: string;
  contentClass?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<BookProps>(), {
  duration: 1000,
  color: "zinc",
  isStatic: false,
  size: "md",
  radius: "md",
  shadowSize: "lg",
});

const computedGradient = computed(() => {
  return colorMap[props.color] || colorMap.zinc;
});
</script>

<style scoped>
.book {
  --shadowColor: rgb(39 42 34 / 0.13);
}

.dark .book {
  --shadowColor: rgb(0 0 0 / 0.28);
}

.book-volume {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}

.book-front {
  backface-visibility: hidden;
}

.book:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 10px;
  border-radius: 4px;
}

.book:focus-visible .book-volume {
  transform: rotateY(-30deg);
}

@media (hover: hover) {
  .book:hover .book-volume {
    transform: rotateY(-30deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .book .book-volume {
    transition: none;
    transform: none;
  }
}
</style>

<template>
  <component
    :is="is"
    :class="
      cn(
        'rainbow-button',
        'group relative inline-flex h-11 cursor-pointer items-center justify-center rounded-xl border-0 bg-[length:200%] px-8 py-2 font-semibold text-gray-900 dark:text-gray-100 transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [text-shadow:0_1px_2px_rgba(255,255,255,0.8)] dark:[text-shadow:0_1px_2px_rgba(0,0,0,0.5)]',
        'before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]',
        'bg-[linear-gradient(rgba(255,255,255,0.95),rgba(255,255,255,0.9)),linear-gradient(rgba(255,255,255,0.8)_50%,rgba(255,255,255,0.4)_80%,rgba(255,255,255,0.1)),linear-gradient(90deg,var(--color-1),var(--color-2),var(--color-3),var(--color-4),var(--color-5))]',
        'dark:bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.7)),linear-gradient(rgba(0,0,0,0.6)_50%,rgba(0,0,0,0.3)_80%,rgba(0,0,0,0.1)),linear-gradient(90deg,var(--color-1),var(--color-2),var(--color-3),var(--color-4),var(--color-5))]',
        'backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]',
        props.class
      )
    "
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";
import { computed } from "vue";

interface RainbowButtonProps {
  class?: string;
  is?: string;
  speed?: number;
}

const props = withDefaults(defineProps<RainbowButtonProps>(), {
  speed: 2,
  is: "button",
});

const speedInSeconds = computed(() => `${props.speed}s`);
</script>

<style scoped>
.rainbow-button {
  --color-1: hsl(120 60% 75%);
  --color-2: hsl(60 70% 80%);
  --color-3: hsl(30 75% 78%);
  --color-4: hsl(45 65% 82%);
  --color-5: hsl(90 55% 77%);
  --speed: v-bind(speedInSeconds);
  animation: rainbow var(--speed) infinite linear;
}

.rainbow-button:before {
  animation: rainbow var(--speed) infinite linear;
}

@keyframes rainbow {
  0% {
    background-position: 0;
  }
  100% {
    background-position: 200%;
  }
}
</style>

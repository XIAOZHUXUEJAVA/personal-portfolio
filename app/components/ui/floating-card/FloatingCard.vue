<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, useTemplateRef, watch, type HTMLAttributes } from "vue";
import { useMediaQuery, usePreferredReducedMotion } from "@vueuse/core";
import { useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion-v";
import { cn } from "@/lib/utils";

// Adapted from Inspira UI's Floating Card.
const props = withDefaults(defineProps<{
  rotateDepth?: number;
  translateDepth?: number;
  class?: HTMLAttributes["class"];
}>(), {
  rotateDepth: 17.5,
  translateDepth: 20,
});

const wrapperRef = useTemplateRef<HTMLElement>("wrapperRef");
const cardRef = useTemplateRef<HTMLElement>("cardRef");
const glareRef = useTemplateRef<HTMLElement>("glareRef");
const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
const reducedMotion = usePreferredReducedMotion();
const motionEnabled = computed(() => canHover.value && reducedMotion.value !== "reduce");

const x = useMotionValue(0);
const y = useMotionValue(0);
const scaleTarget = useMotionValue(1);
const zTarget = useMotionValue(0);
const glareTarget = useMotionValue(0);
const springOptions = { damping: 22, stiffness: 260 };
const mouseX = useSpring(x, springOptions);
const mouseY = useSpring(y, springOptions);
const scale = useSpring(scaleTarget, springOptions);
const z = useSpring(zTarget, springOptions);
const glareOpacity = useSpring(glareTarget, { damping: 24, stiffness: 220 });

const rotateX = useTransform(mouseY, [-0.5, 0.5], [-props.rotateDepth, props.rotateDepth]);
const rotateY = useTransform(mouseX, [-0.5, 0.5], [props.rotateDepth, -props.rotateDepth]);
const translateX = useTransform(mouseX, [-0.5, 0.5], [-props.translateDepth, props.translateDepth]);
const translateY = useTransform(mouseY, [-0.5, 0.5], [props.translateDepth, -props.translateDepth]);
const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);
const cardTransform = useMotionTemplate`translateX(${translateX}px) translateY(${translateY}px) translateZ(${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.8), transparent 75%)`;

const cleanupFns: Array<() => void> = [];

function bindMotionValue<T>(
  value: { get: () => T; on: (event: "change", handler: (latest: T) => void) => () => void },
  handler: (latest: T) => void,
) {
  handler(value.get());
  cleanupFns.push(value.on("change", handler));
}

onMounted(() => {
  bindMotionValue(cardTransform, (latest) => {
    if (cardRef.value) cardRef.value.style.transform = latest;
  });
  bindMotionValue(glareBackground, (latest) => {
    if (glareRef.value) glareRef.value.style.background = latest;
  });
  bindMotionValue(glareOpacity, (latest) => {
    if (glareRef.value) glareRef.value.style.opacity = String(latest);
  });
});

onBeforeUnmount(() => cleanupFns.forEach((cleanup) => cleanup()));

function handlePointerMove(event: PointerEvent) {
  if (!motionEnabled.value || event.pointerType === "touch" || !wrapperRef.value) return;

  // Measure the stationary wrapper so the transformed card cannot shift the tracking area.
  const rect = wrapperRef.value.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  x.set(Math.max(-0.5, Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5)));
  y.set(Math.max(-0.5, Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5)));
  scaleTarget.set(1.03);
  zTarget.set(30);
  glareTarget.set(0.14);
}

function resetCard() {
  x.set(0);
  y.set(0);
  scaleTarget.set(1);
  zTarget.set(0);
  glareTarget.set(0);
}

watch(motionEnabled, (enabled) => {
  if (!enabled) resetCard();
});
</script>

<template>
  <div
    ref="wrapperRef"
    :class="cn('floating-card relative min-w-0', props.class)"
    :data-motion="motionEnabled ? 'enabled' : 'disabled'"
    @pointerenter="handlePointerMove"
    @pointermove="handlePointerMove"
    @pointerleave="resetCard"
    @pointercancel="resetCard"
  >
    <div ref="cardRef" class="floating-card__surface surface-card relative h-full rounded-2xl">
      <slot />
      <div
        ref="glareRef"
        aria-hidden="true"
        class="floating-card__glare pointer-events-none absolute inset-0 rounded-[inherit] opacity-0"
      />
    </div>
  </div>
</template>

<style scoped>
.floating-card {
  perspective: 1200px;
}

.floating-card[data-motion="enabled"]:hover {
  z-index: 1;
}

.floating-card[data-motion="disabled"] .floating-card__surface {
  transform: none !important;
}

.floating-card[data-motion="disabled"] .floating-card__glare {
  display: none;
}

@media (prefers-reduced-motion: reduce), (hover: none), (pointer: coarse) {
  .floating-card__surface {
    transform: none !important;
  }

  .floating-card__glare {
    display: none;
  }
}
</style>

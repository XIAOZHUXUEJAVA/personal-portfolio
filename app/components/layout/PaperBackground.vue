<template>
  <div class="paper-background" aria-hidden="true"><canvas ref="canvasRef" /></div>
</template>

<script setup lang="ts">
import { useResizeObserver, useMutationObserver } from "@vueuse/core";

const canvasRef = ref<HTMLCanvasElement | null>(null);
let frame = 0;

// A deterministic, static texture: redraw only when the viewport or theme changes.
function drawPaper() {
  const canvas = canvasRef.value;
  const context = canvas?.getContext("2d");
  if (!canvas || !context) return;
  const width = document.documentElement.clientWidth;
  const height = window.innerHeight;
  const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  context.scale(ratio, ratio);
  let seed = 71423;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const dark = document.documentElement.classList.contains("dark");
  const ink = dark ? "#b3c3b5" : "#667d6d";
  context.fillStyle = ink;
  for (let i = 0; i < width * height / 900; i++) {
    context.globalAlpha = dark ? 0.015 + random() * 0.025 : 0.03 + random() * 0.07;
    context.fillRect(random() * width, random() * height, 0.6, 0.6);
  }
  context.globalAlpha = 1;
}

function scheduleDraw() {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(drawPaper);
}

onMounted(() => {
  drawPaper();
  useResizeObserver(document.documentElement, scheduleDraw);
  useMutationObserver(document.documentElement, scheduleDraw, { attributes: true, attributeFilter: ["class"] });
  window.addEventListener("resize", scheduleDraw);
});
onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  window.removeEventListener("resize", scheduleDraw);
});
</script>

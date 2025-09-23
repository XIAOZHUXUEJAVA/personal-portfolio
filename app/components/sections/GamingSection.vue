<template>
  <section id="gaming" class="py-5 px-6">
    <div class="max-w-7xl mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2
          class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-green-500 to-yellow-500 bg-clip-text text-transparent"
        >
          最近游玩
        </h2>
      </div>
      <div class="relative group">
        <!-- 渐变边框容器 -->
        <div
          class="absolute -inset-px bg-gradient-to-r from-emerald-200 via-teal-300 to-cyan-300 rounded-2xl blur-sm opacity-20 group-hover:opacity-35 transition duration-1000 group-hover:duration-200 animate-tilt"
        />

        <!-- 内容容器 -->
        <div
          class="relative h-96 w-full bg-white/80 backdrop-blur-sm rounded-2xl overflow-clip flex flex-col items-center justify-center gap-24 border border-gray-200/50"
        >
          <BendingGallery :items="items" :bend="2" :border-radius="0.1" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { BendingGallery } from "~/components/ui/bending-gallery";
const items = ref<Array<{ image: string; text: string }>>([
  {
    image: "/images/games/33.png",
    text: "",
  },
  {
    image: "/images/games/bloodborne.jpg",
    text: "",
  },
  {
    image: "/images/games/dark-souls-iii.jpg",
    text: "",
  },
  {
    image: "/images/games/eldenring.png",
    text: "",
  },
  {
    image: "/images/games/god-of-war.png",
    text: "",
  },
  {
    image: "/images/games/nioh2.png",
    text: "",
  },
  {
    image: "/images/games/sekiro.png",
    text: "",
  },
  {
    image: "/images/games/spider2.png",
    text: "",
  },
  {
    image: "/images/games/the-last-of-us-part1.png",
    text: "",
  },
  {
    image: "/images/games/the-last-of-us-part2.png",
    text: "",
  },
  {
    image: "/images/games/wolong.png",
    text: "",
  },
  {
    image: "/images/games/wukong.png",
    text: "",
  },
]);
</script>

<style scoped>
@keyframes tilt {
  0%,
  50%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(0.5deg);
  }
  75% {
    transform: rotate(-0.5deg);
  }
}

.animate-tilt {
  animation: tilt 10s infinite linear;
}

.group:hover .animate-tilt {
  animation: tilt 2s infinite linear;
}
</style>

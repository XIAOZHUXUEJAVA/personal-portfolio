<template>
  <section id="gaming" class="py-5 px-6">
    <div class="max-w-7xl mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2
          class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-green-600 to-yellow-500 bg-clip-text text-transparent"
          style="
            background-size: 200% 100%;
            animation: gradient-shift 3s ease-in-out infinite alternate;
          "
        >
          最近游玩
        </h2>
      </div>
      <!-- 毛玻璃容器 -->
      <div
        class="h-96 w-full bg-white/40 backdrop-blur-2xl rounded-2xl overflow-clip flex flex-col items-center justify-center border border-white/50 shadow-lg shadow-black/5 hover:bg-white/55 hover:shadow-xl hover:shadow-black/[0.08] transition-all duration-300"
      >
        <BendingGallery :items="items" :bend="2" :border-radius="0.1" />
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



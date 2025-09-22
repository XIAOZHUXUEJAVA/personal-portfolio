<template>
  <section id="gaming" class="py-5 px-6">
    <div class="max-w-7xl mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">最近游玩</h2>
      </div>
      <div class="relative group">
        <!-- 渐变边框容器 -->
        <div
          class="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
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
    image:
      "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    text: "",
  },
  {
    image:
      "https://images.pexels.com/photos/16245254/pexels-photo-16245254/free-photo-of-chatgpt-a-chatbot-for-your-website.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    text: "",
  },
  {
    image:
      "https://images.pexels.com/photos/1910236/pexels-photo-1910236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    text: "",
  },
  {
    image:
      "https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    text: "",
  },
  {
    image:
      "https://images.pexels.com/photos/2333293/pexels-photo-2333293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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

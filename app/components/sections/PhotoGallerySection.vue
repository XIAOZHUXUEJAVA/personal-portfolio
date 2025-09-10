<template>
  <section id="gallery" class="py-20 px-6 bg-muted/30">
    <div class="max-w-7xl mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">照片画廊</h2>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
          用镜头记录生活的美好瞬间，每一张照片都有它独特的故事
        </p>
      </div>

      <!-- Gallery Tabs -->
      <div class="flex justify-center mb-12">
        <div
          class="flex space-x-2 bg-background/50 backdrop-blur-sm rounded-full p-1 border border-border/50"
        >
          <button
            v-for="category in categories"
            :key="category"
            :class="[
              'px-6 py-2 rounded-full transition-all duration-300',
              activeCategory === category
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'text-muted-foreground hover:text-foreground',
            ]"
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Photo Gallery Component -->
      <div class="mb-12">
        <PhotoGallery :items="filteredPhotos" />
      </div>

      <!-- Expandable Gallery -->
      <div class="mt-16">
        <h3 class="text-2xl font-bold text-center mb-8">精选作品</h3>
        <ExpandableGallery :images="featuredImages" />
      </div>

      <!-- Featured Photos with Flip Cards -->
      <div class="mt-20">
        <h3 class="text-2xl font-bold text-center mb-8">精选照片</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FlipCard
            v-for="photo in photoGalleryData.slice(0, 3)"
            :key="photo.src"
            class="h-80 w-full"
          >
            <template #default>
              <img
                :src="photo.src"
                :alt="photo.title"
                class="size-full rounded-2xl object-cover shadow-2xl shadow-black/40"
              />
              <div
                class="absolute bottom-4 left-4 text-xl font-bold text-white"
              >
                {{ photo.title }}
              </div>
            </template>
            <template #back>
              <div
                class="flex min-h-full flex-col gap-2 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl"
              >
                <h1 class="text-xl font-bold text-white">
                  {{ photo.title }}
                </h1>
                <p
                  class="mt-1 border-t border-t-gray-200 py-4 text-base font-medium leading-normal text-gray-100"
                >
                  {{ photo.description }}
                </p>
                <div class="mt-2 space-y-2 text-sm text-gray-300">
                  <p>
                    <span class="font-medium">位置:</span>
                    {{ photo.location }}
                  </p>
                  <p>
                    <span class="font-medium">拍摄时间:</span>
                    {{ photo.date }}
                  </p>
                  <p>
                    <span class="font-medium">分类:</span>
                    {{ photo.category }}
                  </p>
                </div>
                <div class="flex gap-2 mt-auto pt-4">
                  <button
                    class="flex-1 px-3 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 transition-colors backdrop-blur-sm"
                    @click="viewFullPhoto(photo)"
                  >
                    查看原图
                  </button>
                  <button
                    class="flex-1 px-3 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 transition-colors backdrop-blur-sm"
                    @click="sharePhoto(photo)"
                  >
                    分享照片
                  </button>
                </div>
              </div>
            </template>
          </FlipCard>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PhotoGallery } from "~/components/ui/photo-gallery";
import { ExpandableGallery } from "~/components/ui/expandable-gallery";
import { FlipCard } from "~/components/ui/flip-card";
import { RotateCcw, Eye, Share2 } from "lucide-vue-next";
import { photoGalleryData } from "~/data/staticData";

// Categories for filtering
const categories = ["全部", "风景", "城市", "自然", "生活"];
const activeCategory = ref("全部");

// Filtered photos based on active category
const filteredPhotos = computed(() => {
  if (activeCategory.value === "全部") {
    return photoGalleryData.map((photo) => ({ src: photo.src }));
  }
  return photoGalleryData
    .filter((photo) => photo.category === activeCategory.value)
    .map((photo) => ({ src: photo.src }));
});

// Featured images for expandable gallery
const featuredImages = computed(() => {
  return photoGalleryData.slice(0, 4).map((photo) => photo.src);
});

// Photo interaction methods
const viewFullPhoto = (photo: any) => {
  // 可以实现图片预览功能
  window.open(photo.src, "_blank");
};

const sharePhoto = (photo: any) => {
  // 可以实现分享功能
  if (navigator.share) {
    navigator.share({
      title: photo.title,
      text: photo.description,
      url: photo.src,
    });
  } else {
    // 备用方案：复制链接到剪贴板
    navigator.clipboard.writeText(photo.src);
    console.log("照片链接已复制到剪贴板");
  }
};
</script>

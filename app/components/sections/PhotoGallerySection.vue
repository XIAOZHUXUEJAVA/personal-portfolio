<template>
  <section id="gallery" class="py-20 px-6">
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
          些许瞬间
        </h2>
        <!-- <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
          用镜头记录生活的美好瞬间，每一张照片都有它独特的故事
        </p> -->
      </div>

      <!-- Gallery Tabs -->
      <div class="flex justify-center mb-12">
        <div
          class="flex space-x-2 bg-gradient-to-r from-green-50/80 via-yellow-50/80 to-orange-50/80 backdrop-blur-md rounded-full p-1 border border-green-200/50 shadow-lg dark:from-green-950/60 dark:via-yellow-950/60 dark:to-orange-950/60 dark:border-green-700/30"
        >
          <button
            v-for="category in categories"
            :key="category"
            :class="[
              'px-6 py-2 rounded-full transition-all duration-300',
              activeCategory === category
                ? 'bg-gradient-to-r from-green-500 to-yellow-500 text-white shadow-lg hover:from-green-600 hover:to-yellow-600'
                : 'text-green-600/80 hover:text-green-700 hover:bg-green-100/50 dark:text-green-400/80 dark:hover:text-green-300 dark:hover:bg-green-800/30',
            ]"
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Photo Gallery Component -->
      <div class="mb-12">
        <ClientOnly>
          <PhotoGallery :items="filteredPhotos" />
          <template #fallback>
            <div class="flex justify-center items-center h-64">
              <div
                class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
              />
            </div>
          </template>
        </ClientOnly>
      </div>

      <!-- Expandable Gallery -->
      <!-- <div class="mt-16">
        <h3 class="text-2xl font-bold text-center mb-8">精选作品</h3>
        <ExpandableGallery :images="featuredImages" />
      </div> -->

      <!-- Featured Photos with Flip Cards -->
      <div class="mt-20">
        <h3
          class="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 via-green-600 to-yellow-500 bg-clip-text text-transparent"
          style="
            background-size: 200% 100%;
            animation: gradient-shift 3s ease-in-out infinite alternate;
          "
        >
          精选照片
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FlipCard
            v-for="photo in highlightPhotosData"
            :key="photo.src"
            class="h-80 w-full"
          >
            <template #default>
              <NuxtImg
                :src="photo.src"
                :alt="photo.title"
                class="size-full rounded-2xl object-cover shadow-2xl shadow-black/40"
                loading="lazy"
                :placeholder="[40, 40, 75, 5]"
                format="webp"
                quality="85"
                sizes="sm:300px md:400px lg:500px"
              />
              <div
                class="absolute bottom-4 left-4 text-xl font-bold text-white"
              >
                {{ photo.title }}
              </div>
            </template>
            <template #back>
              <div
                class="flex min-h-full flex-col gap-2 p-6 bg-gradient-to-br from-green-100/95 via-yellow-50/90 to-orange-100/95 rounded-2xl backdrop-blur-sm shadow-lg"
              >
                <h1 class="text-xl font-bold text-gray-800">
                  {{ photo.title }}
                </h1>
                <p
                  class="mt-1 border-t border-t-green-200/60 py-4 text-base font-medium leading-normal text-gray-700"
                >
                  {{ photo.description }}
                </p>
                <div class="mt-2 space-y-2 text-sm text-gray-600">
                  <p>
                    <span class="font-medium text-green-700">位置:</span>
                    {{ photo.location }}
                  </p>
                  <p>
                    <span class="font-medium text-green-700">拍摄时间:</span>
                    {{ photo.date }}
                  </p>
                  <p>
                    <span class="font-medium text-green-700">分类:</span>
                    {{ photo.category }}
                  </p>
                </div>
                <div class="flex gap-2 mt-auto pt-4">
                  <button
                    class="flex-1 px-3 py-2 bg-green-200/60 text-gray-800 rounded-lg text-sm font-medium hover:bg-green-300/70 transition-all duration-200 backdrop-blur-sm shadow-sm hover:shadow-md"
                    @click="viewFullPhoto(photo)"
                  >
                    查看原图
                  </button>
                  <button
                    class="flex-1 px-3 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 transition-colors backdrop-blur-sm"
                    @click="sharePhoto(photo)"
                  >
                    分享图片
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
import {
  photoGalleryData,
  featuredWorksData,
  highlightPhotosData,
} from "~/data/staticData";

// Categories for filtering
const categories = ["全部", "风景", "演唱会", "自然", "生活"];
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
  return featuredWorksData.map((photo) => photo.src);
});

// Photo interaction methods
const viewFullPhoto = (photo: any) => {
  // 可以实现图片预览功能
  window.open(photo.src, "_blank");
};

const sharePhoto = async (photo: any) => {
  try {
    // 获取基础URL
    const baseUrl = import.meta.client
      ? window.location.origin
      : "http://localhost:3000";

    // 确保图片链接是完整的绝对URL
    let fullImageUrl = photo.src;
    if (!photo.src.startsWith("http")) {
      // 如果src不是完整URL，则拼接域名
      fullImageUrl = photo.src.startsWith("/")
        ? `${baseUrl}${photo.src}`
        : `${baseUrl}/${photo.src}`;
    }

    // 直接复制图片URL到剪贴板
    await navigator.clipboard.writeText(fullImageUrl);
    showCopyToast("图片链接已复制到剪贴板");
  } catch (err) {
    console.error("复制图片链接失败:", err);
    showCopyToast("复制图片链接失败");
  }
};

// 显示复制成功提示
const showCopyToast = (message: string = "操作成功") => {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 9999;
    animation: slideIn 0.3s ease-out;
  `;

  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    }, 300);
  }, 3000);
};
</script>

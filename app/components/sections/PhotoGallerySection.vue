<template>
  <section id="gallery" class="py-20 px-6">
    <div class="max-w-7xl mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2
          class="text-4xl md:text-5xl font-bold mb-4 section-title"
        >
          些许瞬间
        </h2>
        <!-- <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
          用镜头记录生活的美好瞬间，每一张照片都有它独特的故事
        </p> -->
      </div>

      <!-- Gallery Tabs -->
      <div class="flex justify-center mb-12 overflow-x-auto px-2">
        <div
          ref="tabsContainer"
          class="relative inline-flex flex-nowrap gap-1 md:gap-2 bg-card rounded-full p-1 border border-border"
        >
          <!-- 滑动指示器：跟随选中项平滑移动 -->
          <div
            class="absolute top-1 bottom-1 rounded-full bg-primary pointer-events-none"
            :style="{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.width ? 1 : 0,
              transition:
                'left 500ms cubic-bezier(0.32, 0.72, 0, 1), width 500ms cubic-bezier(0.32, 0.72, 0, 1), opacity 200ms ease',
            }"
          />
          <button
            v-for="category in categories"
            :key="category"
            :ref="(el) => setTabRef(el, category)"
            :class="[
              'relative z-10 px-3 md:px-6 py-2 rounded-full transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 whitespace-nowrap text-sm md:text-base',
              activeCategory === category
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-primary',
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
          class="text-2xl font-bold text-center mb-8 section-title"
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
                class="size-full rounded-2xl object-cover shadow-sm"
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
              <!-- 使用不透明主题底色，确保翻转背面的文字清晰。 -->
              <div
                class="flex min-h-full flex-col gap-2 p-6 bg-card text-card-foreground"
              >
                <h1 class="text-xl font-bold text-foreground">
                  {{ photo.title }}
                </h1>
                <p
                  class="mt-1 border-t border-t-border py-4 text-base font-medium leading-normal text-muted-foreground"
                >
                  {{ photo.description }}
                </p>
                <div class="mt-2 space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span class="font-medium text-foreground">位置:</span>
                    {{ photo.location }}
                  </p>
                  <p>
                    <span class="font-medium text-foreground">拍摄时间:</span>
                    {{ photo.date }}
                  </p>
                  <p>
                    <span class="font-medium text-foreground">分类:</span>
                    {{ photo.category }}
                  </p>
                </div>
                <div class="flex gap-2 mt-auto pt-4">
                  <button
                    class="theme-button theme-button--primary flex-1 px-3 py-2 rounded-lg text-sm font-medium"
                    @click.stop="viewFullPhoto(photo)"
                  >
                    查看原图
                  </button>
                  <button
                    class="theme-button theme-button--secondary flex-1 px-3 py-2 rounded-lg text-sm font-medium"
                    @click.stop="sharePhoto(photo)"
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

// Tab 滑动指示器逻辑
const tabsContainer = ref<HTMLElement | null>(null);
const tabRefs = ref<Record<string, HTMLElement>>({});
const indicatorStyle = ref({ left: 0, width: 0 });

// 收集每个 tab 按钮的 DOM 引用
const setTabRef = (
  el: Element | ComponentPublicInstance | null,
  category: string,
) => {
  if (el instanceof HTMLElement) tabRefs.value[category] = el;
};

// 根据当前选中项计算指示器位置和宽度
const updateIndicator = () => {
  const el = tabRefs.value[activeCategory.value];
  if (el) {
    indicatorStyle.value = {
      left: el.offsetLeft,
      width: el.offsetWidth,
    };
  }
};

// 监听选中项变化，更新指示器
watch(activeCategory, () => nextTick(updateIndicator));

onMounted(() => {
  nextTick(updateIndicator);
  window.addEventListener("resize", updateIndicator);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateIndicator);
});

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
    background: var(--popover);
    color: var(--popover-foreground);
    border: 1px solid var(--border);
    box-shadow: var(--surface-shadow-hover);
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

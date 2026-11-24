<template>
  <section id="gallery" class="journal-section site-container">
    <div class="gallery-inner">
      <SectionHeading number="03" label="moments, collected" title="些许瞬间" description="有些时刻，想再多看一眼。" />

      <!-- Gallery Tabs -->
      <div class="gallery-tabs-wrap">
        <div
          ref="tabsContainer"
          class="gallery-tabs"
          role="group"
          aria-label="按照片分类筛选"
        >
          <!-- 滑动指示器：跟随选中项平滑移动 -->
          <div
            class="gallery-tabs-indicator"
            aria-hidden="true"
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
            type="button"
            class="gallery-tab"
            :aria-pressed="activeCategory === category"
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Photo Gallery Component -->
      <div class="gallery-paper-sheet paper-sheet mb-12">
        <span class="paper-tape" aria-hidden="true" />
        <div class="album-paper-label handdrawn-rule"><span>PHOTO ALBUM / 留住这一刻</span><span>{{ String(filteredPhotos.length).padStart(2, '0') }} PHOTOS</span></div>
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

      <!-- Featured Photos with Flip Cards -->
      <div class="selected-photos">
        <h3
          class="selected-photos-title"
        >
          精选照片
        </h3>
        <p class="stamp-collection-note">把走过的地方，寄给未来的自己。<span>悬停或点击，翻到背面 ↻</span></p>
        <div class="stamp-grid">
          <FlipCard
            v-for="(photo, index) in highlightPhotosData"
            :key="photo.src"
            class="stamp-flip h-[360px] w-full"
          >
            <template #default>
              <div class="stamp-front">
                <div class="stamp-topline"><span>XIAOZHU / LIFE POST</span><span>NO. {{ String(index + 1).padStart(2, '0') }}</span></div>
                <div class="stamp-picture">
                  <NuxtImg
                    :src="photo.src"
                    :alt="photo.title"
                    class="size-full object-cover"
                    loading="lazy"
                    :placeholder="[40, 40, 75, 5]"
                    format="webp"
                    quality="85"
                    sizes="sm:300px md:400px lg:500px"
                  />
                </div>
                <div class="stamp-caption"><span>{{ photo.title }}</span><span>{{ photo.location }}<small>生活影像 / {{ photo.category }}</small></span></div>
                <div class="stamp-postmark" aria-hidden="true">
                  <svg class="postmark-waves" viewBox="0 0 110 46" fill="none"><path d="M2 7 Q16 0 30 7 T58 7 T86 7 T114 7 M2 20 Q16 13 30 20 T58 20 T86 20 T114 20 M2 33 Q16 26 30 33 T58 33 T86 33 T114 33" stroke="currentColor" stroke-width="1" /></svg>
                  <span>{{ photo.location }}</span><span>{{ photo.date }}</span><span>记忆留存</span>
                </div>
              </div>
            </template>
            <template #back>
              <!-- 邮票背面沿用原组件的悬停与点击翻转。 -->
              <div
                class="stamp-back flex min-h-full flex-col gap-2 p-6 text-card-foreground"
              >
                <div class="stamp-back-topline"><span>来自 / {{ photo.location }}</span><span>NO. {{ String(index + 1).padStart(2, '0') }}</span></div>
                <h3 class="text-xl font-medium text-foreground">{{ photo.title }}</h3>
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
import SectionHeading from "~/components/layout/SectionHeading.vue";
import { PhotoGallery } from "~/components/ui/photo-gallery";
import { FlipCard } from "~/components/ui/flip-card";
import { RotateCcw, Eye, Share2 } from "lucide-vue-next";
import {
  photoGalleryData,
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

<style scoped>
.gallery-tabs-wrap {
  display: flex;
  overflow-x: auto;
  margin-bottom: 36px;
  padding: 6px 2px;
}
.gallery-tabs {
  position: relative;
  isolation: isolate;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 4px;
  margin-inline: auto;
  padding: 8px 10px;
  border: 0;
  background: transparent;
  box-shadow: none;
}
/* Match the Dock's paper surface without its floating position or magnification. */
.gallery-tabs::before,
.gallery-tabs::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: 24px;
  -webkit-mask-image: var(--paper-mask);
  mask-image: var(--paper-mask);
  -webkit-mask-size: var(--paper-mask-size);
  mask-size: var(--paper-mask-size);
  -webkit-mask-position: var(--paper-mask-position);
  mask-position: var(--paper-mask-position);
  -webkit-mask-repeat: var(--paper-mask-repeat);
  mask-repeat: var(--paper-mask-repeat);
}
.gallery-tabs::before {
  z-index: -2;
  background: color-mix(in srgb, var(--primary) 26%, var(--card));
}
.gallery-tabs::after {
  inset: 1px;
  z-index: -1;
  border-radius: 23px;
  background: var(--paper-back) url('/paper/article-paper-texture.svg');
}
.gallery-tabs-indicator {
  position: absolute;
  top: 8px;
  bottom: 8px;
  border-radius: 22px;
  background: var(--card);
  border: 1px solid color-mix(in srgb, var(--primary) 20%, var(--card));
  pointer-events: none;
}
.gallery-tab {
  position: relative;
  z-index: 1;
  min-width: 44px;
  min-height: 44px;
  padding: 8px 20px;
  border: 0;
  border-radius: 22px;
  background: transparent;
  color: var(--muted-foreground);
  font-size: 14px;
  white-space: nowrap;
  transition: color 180ms ease;
}
.gallery-tab:hover,
.gallery-tab[aria-pressed="true"] { color: var(--primary); }
.gallery-tab:focus-visible { outline-offset: 1px; }
.gallery-paper-sheet {
  --sheet-color: var(--paper-sheet);
  padding: 35px 35px 24px;
  margin-inline: 5px;
}
.album-paper-label {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 25px;
  padding-bottom: 14px;
  color: var(--muted-foreground);
  font-size: 10px;
  letter-spacing: 0.08em;
}
.selected-photos { margin-top: 48px; }
.selected-photos-title { margin-bottom: 10px; color: var(--foreground); font-size: 20px; font-weight: 400; letter-spacing: 0.06em; }
.stamp-collection-note { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 20px; margin: 0 0 28px; color: var(--muted-foreground); font-size: 11px; }
.stamp-collection-note > span { font-size: 10px; }
.stamp-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px; padding: 4px 5px 8px; }
.stamp-flip { --stamp-ink: var(--primary); transform: rotate(-1deg); }
.stamp-flip:nth-child(2) { --stamp-ink: #9a7650; transform: rotate(1deg); }
.stamp-flip:nth-child(3) { --stamp-ink: #637d89; transform: rotate(-0.6deg); }
/* Perforate only the two flat faces. Keep the 3D volume and all flip handlers intact. */
.stamp-flip :deep([class*="backface-visibility"]) {
  border: 0;
  border-radius: 0;
  background: var(--card) url('/paper/article-paper-texture.svg');
  box-shadow: none;
  -webkit-mask-image: radial-gradient(circle 4px at 8px 0, transparent 98%, #000 100%),
    radial-gradient(circle 4px at 8px 100%, transparent 98%, #000 100%),
    radial-gradient(circle 4px at 0 8px, transparent 98%, #000 100%),
    radial-gradient(circle 4px at 100% 8px, transparent 98%, #000 100%);
  mask-image: radial-gradient(circle 4px at 8px 0, transparent 98%, #000 100%),
    radial-gradient(circle 4px at 8px 100%, transparent 98%, #000 100%),
    radial-gradient(circle 4px at 0 8px, transparent 98%, #000 100%),
    radial-gradient(circle 4px at 100% 8px, transparent 98%, #000 100%);
  -webkit-mask-size: 16px 100%, 16px 100%, 100% 16px, 100% 16px;
  mask-size: 16px 100%, 16px 100%, 100% 16px, 100% 16px;
  -webkit-mask-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  mask-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
}
.stamp-front { position: relative; display: flex; flex-direction: column; height: 100%; padding: 20px 20px 18px; background: var(--card) url('/paper/article-paper-texture.svg'); }
.stamp-front::before { content: ""; position: absolute; inset: 10px; border: 1px solid color-mix(in srgb, var(--stamp-ink) 24%, transparent); pointer-events: none; }
.stamp-topline { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 4px 12px; padding-bottom: 12px; color: var(--stamp-ink); font-size: 10px; letter-spacing: 0.03em; }
.stamp-picture { flex: 1; min-height: 0; border: 1px solid color-mix(in srgb, var(--stamp-ink) 20%, transparent); padding: 3px; }
.stamp-caption { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding-top: 12px; color: var(--stamp-ink); }
.stamp-caption > span:first-child { font-size: 25px; font-weight: 500; letter-spacing: 0.12em; }
.stamp-caption > span:last-child { text-align: right; font-size: 12px; }
.stamp-caption small { display: block; margin-top: 3px; color: var(--muted-foreground); font-size: 10px; letter-spacing: 0.02em; }
.stamp-postmark { position: absolute; right: 26px; bottom: 65px; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 78px; height: 78px; gap: 2px; border: 3px double currentColor; border-radius: 50%; background: color-mix(in srgb, var(--card) 70%, transparent); color: var(--stamp-ink); opacity: 0.66; transform: rotate(-16deg); pointer-events: none; }
.stamp-postmark > span { font-size: 10px; line-height: 1.5; }
.stamp-postmark > span:nth-of-type(2) { padding-block: 2px; border-block: 1px solid currentColor; font-size: 9px; }
.postmark-waves { position: absolute; right: 61px; top: 15px; width: 85px; height: 42px; }
.stamp-back { padding: 25px 23px; background: url('/paper/article-paper-texture.svg'), repeating-linear-gradient(transparent 0 31px, color-mix(in srgb, var(--stamp-ink) 8%, transparent) 31px 32px), var(--card); }
.stamp-back-topline { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 4px 12px; margin-bottom: 7px; color: var(--stamp-ink); font-size: 10px; }
.stamp-back > p { padding-block: 10px; font-size: 13px; }
.stamp-back > .text-sm { font-size: 12px; }
.stamp-back .theme-button { padding-inline: 10px; font-size: 11px; }
@media (max-width: 1023px) { .stamp-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 640px) {
  .gallery-tabs { padding-inline: 8px; }
  .gallery-tab { padding-inline: 10px; font-size: 12px; }
  .gallery-paper-sheet { padding: 28px 12px 18px; margin-inline: 0; }
  .album-paper-label { flex-wrap: wrap; font-size: 10px; letter-spacing: 0.02em; gap: 8px; }
  .selected-photos { margin-top: 36px; }
  .stamp-grid { grid-template-columns: minmax(0, 1fr); gap: 30px; max-width: 360px; margin-inline: auto; }
  .stamp-collection-note { font-size: 10px; }
}
</style>

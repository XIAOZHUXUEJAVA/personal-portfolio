<template>
  <section id="featured-works" class="journal-section site-container">
    <div class="works-inner">
      <SectionHeading number="02" label="little corners of my life" title="我的小天地" />

      <!-- 3D Cards Grid -->
      <div class="works-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <ClientOnly>
          <CardContainer
            v-for="(work, index) in featuredWorks"
            :key="work.id"
            class="inter-var works-card-container"
            container-class="works-card-slot"
            :style="{ rotate: ['-0.5deg', '0.4deg', '-0.25deg'][index] }"
          >
            <CardBody
              class="surface-card paper-card works-card-body group/card relative w-full h-full p-5"
            >
              <span class="paper-tape" aria-hidden="true" />
              <!-- Title -->
              <CardItem
                :translate-z="50"
                class="text-xl font-medium text-foreground"
              >
                {{ work.title }}
              </CardItem>

              <!-- Description -->
              <CardItem
                as="p"
                :translate-z="60"
                class="works-description mt-2 max-w-sm text-base text-muted-foreground"
              >
                {{ work.description }}
              </CardItem>

              <!-- Main Image -->
              <CardItem :translate-z="100" class="mt-4 w-full">
                <!-- 统一使用 3:2 宽高比，保证三张图在任意屏幕宽度下展示框形状一致 -->
                <img
                  :src="work.image"
                  :alt="work.title"
                  loading="lazy"
                  class="aspect-[3/2] w-full rounded-sm object-cover group-hover/card:shadow-sm transition-shadow duration-300"
                >
              </CardItem>

              <!-- Tags -->
              <CardItem :translate-z="40" class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="tag in work.tags"
                  :key="tag"
                  class="theme-tag px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ tag }}
                </span>
              </CardItem>

              <!-- Action Buttons -->
              <div class="mt-3 flex items-center justify-between">
                <CardItem
                  :translate-z="20"
                  as="button"
                  class="theme-button theme-button--ghost rounded-xl px-4 py-2 text-sm font-normal"
                  @click="viewLargeImage(work.image, work.title)"
                >
                  查看大图 →
                </CardItem>

                <CardItem
                  v-if="work.sourceUrl"
                  :translate-z="20"
                  as="a"
                  :href="work.sourceUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="theme-button theme-button--primary rounded-xl px-4 py-2 text-sm font-medium"
                >
                  了解更多
                </CardItem>

                <!-- <CardItem
                  v-if="!work.sourceUrl && !work.demoUrl"
                  :translate-z="20"
                  as="button"
                  class="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
                  @click="showWorkDetails(work)"
                >
                  了解更多
                </CardItem> -->
              </div>
            </CardBody>
          </CardContainer>
        </ClientOnly>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from "~/components/layout/SectionHeading.vue";
import { CardContainer, CardBody, CardItem } from "~/components/ui/card-3d";

// Featured works data
const featuredWorks = [
  {
    id: 1,
    title: "个人桌面",
    description: "似乎也是有一点凌乱",
    image: "/images/desktop.jpg",
    tags: ["桌面", "生活"],
    demoUrl: "#gallery",
    sourceUrl: null,
  },
  {
    id: 2,
    title: "游玩游戏",
    description: "喜欢打会儿单机游戏",
    image: "/images/game.jpg",
    tags: ["游戏", "PlayStation"],
    demoUrl: "#gaming",
    sourceUrl: null,
  },
  {
    id: 6,
    title: "代码仓库",
    description: "毕业之后越来越懒了哈哈",
    image: "/images/github.jpg",
    tags: ["技术", "学习", "分享"],
    demoUrl: null,
    sourceUrl: "https://github.com/XIAOZHUXUEJAVA",
  },
];

// Methods
const viewLargeImage = (imageUrl: string, title: string) => {
  // 在新窗口中打开大图
  const newWindow = window.open("", "_blank");
  if (newWindow) {
    newWindow.document.write(`
      <html>
        <head>
          <title>${title} - 大图查看</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              background: #000;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              font-family: "LXGW WenKai", "Inter", Arial, sans-serif;
            }
            img {
              max-width: 100%;
              max-height: 100vh;
              object-fit: contain;
              border-radius: 8px;
              box-shadow: 0 4px 20px rgba(255,255,255,0.1);
            }
            .title {
              position: fixed;
              top: 20px;
              left: 20px;
              color: white;
              font-size: 18px;
              font-weight: bold;
              background: rgba(0,0,0,0.7);
              padding: 10px 15px;
              border-radius: 6px;
            }
            .close-btn {
              position: fixed;
              top: 20px;
              right: 20px;
              background: rgba(255,255,255,0.2);
              color: white;
              border: none;
              padding: 10px 15px;
              border-radius: 6px;
              cursor: pointer;
              font-size: 14px;
            }
            .close-btn:hover {
              background: rgba(255,255,255,0.3);
            }
          </style>
        </head>
        <body>
          <div class="title">${title}</div>
          <button class="close-btn" onclick="window.close()">关闭</button>
          <img src="${imageUrl}" alt="${title}" onclick="window.close()" style="cursor: pointer;" />
        </body>
      </html>
    `);
    newWindow.document.close();
  }
};
</script>

<style scoped>
.inter-var { font-family: var(--font-site); }
.works-grid {
  width: 100%;
  gap: var(--grid-gap);
}
.works-grid :deep(.works-card-slot) {
  min-width: 0;
  padding: 0;
}
.works-grid :deep(.works-card-container) {
  width: 100%;
  height: 100%;
  min-width: 0;
}
.works-description { line-height: 1.85; }
.works-card-body {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: var(--card-padding);
}
.works-card-body > :last-child {
  margin-top: auto;
  padding-top: var(--space-5);
  gap: var(--space-2);
  flex-wrap: wrap;
}
@media (min-width: 1024px) {
  .works-card-body { min-height: 27rem; }
}
</style>

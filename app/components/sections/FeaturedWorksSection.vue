<template>
  <section id="featured-works" class="py-20 px-6">
    <div class="max-w-7xl mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">我的小天地</h2>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto" />
      </div>

      <!-- 3D Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ClientOnly>
          <CardContainer
            v-for="(work, index) in featuredWorks"
            :key="work.id"
            class="inter-var"
          >
            <CardBody
              class="group/card relative w-full h-full rounded-xl border border-green-200/40 bg-gradient-to-br from-green-50/80 via-yellow-50/70 to-orange-50/80 p-6 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 dark:border-green-700/30 dark:bg-gradient-to-br dark:from-green-950/60 dark:via-yellow-950/50 dark:to-orange-950/60 dark:hover:shadow-2xl dark:hover:shadow-green-500/20"
            >
              <!-- Title -->
              <CardItem
                :translate-z="50"
                class="text-xl font-bold text-green-700 dark:text-green-300"
              >
                {{ work.title }}
              </CardItem>

              <!-- Description -->
              <CardItem
                as="p"
                :translate-z="60"
                class="mt-2 max-w-sm text-sm text-green-600/80 dark:text-green-400/80"
              >
                {{ work.description }}
              </CardItem>

              <!-- Main Image -->
              <CardItem :translate-z="100" class="mt-4 w-full">
                <img
                  :src="work.image"
                  :alt="work.title"
                  height="1000"
                  width="1000"
                  class="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl transition-shadow duration-300"
                />
              </CardItem>

              <!-- Tags -->
              <CardItem :translate-z="40" class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="tag in work.tags"
                  :key="tag"
                  class="px-3 py-1 bg-gradient-to-r from-green-100/70 to-yellow-100/70 text-green-700 rounded-full text-xs font-medium border border-green-200/50 shadow-sm"
                >
                  {{ tag }}
                </span>
              </CardItem>

              <!-- Action Buttons -->
              <div class="mt-6 flex items-center justify-between">
                <CardItem
                  :translate-z="20"
                  as="button"
                  class="rounded-xl px-4 py-2 text-xs font-normal text-green-600 hover:text-green-700 transition-colors dark:text-green-400 dark:hover:text-green-300"
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
                  class="rounded-xl bg-gradient-to-r from-green-600 to-yellow-600 px-4 py-2 text-xs font-bold text-white hover:from-green-700 hover:to-yellow-700 transition-all duration-300 shadow-md hover:shadow-lg dark:from-green-500 dark:to-yellow-500 dark:hover:from-green-400 dark:hover:to-yellow-400"
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
    demoUrl: "#timeline",
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
const showWorkDetails = (work: any) => {
  // 可以实现弹窗或跳转到详情页
  console.log("Show details for:", work.title);
};

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
.inter-var {
  font-family: "LXGW WenKai", "Inter", sans-serif;
}
</style>

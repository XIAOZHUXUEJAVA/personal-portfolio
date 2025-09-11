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
              class="group/card relative w-full h-full rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]"
            >
              <!-- Title -->
              <CardItem
                :translate-z="50"
                class="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {{ work.title }}
              </CardItem>

              <!-- Description -->
              <CardItem
                as="p"
                :translate-z="60"
                class="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
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
                  class="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                >
                  {{ tag }}
                </span>
              </CardItem>

              <!-- Action Buttons -->
              <div class="mt-6 flex items-center justify-between">
                <CardItem
                  :translate-z="20"
                  as="button"
                  class="rounded-xl px-4 py-2 text-xs font-normal text-neutral-600 hover:text-primary transition-colors dark:text-white"
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
                  class="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white hover:bg-gray-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-gray-200"
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
    tags: ["旅行", "文字", "分享"],
    demoUrl: "#timeline",
    sourceUrl: null,
  },
  {
    id: 3,
    title: "生活感悟集",
    description: "记录日常生活中的思考和感悟，用心感受生活的点点滴滴",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["思考", "感悟", "成长"],
    demoUrl: "#about",
    sourceUrl: null,
  },
  {
    id: 4,
    title: "创意设计项目",
    description: "探索视觉设计的无限可能，用创意表达内心的想法和情感",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["设计", "创意", "视觉"],
    demoUrl: null,
    sourceUrl: null,
  },
  {
    id: 5,
    title: "音乐与生活",
    description: "分享喜欢的音乐和它们背后的故事，音乐是生活中不可缺少的调味剂",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["音乐", "分享", "情感"],
    demoUrl: null,
    sourceUrl: null,
  },
  {
    id: 6,
    title: "代码仓库",
    description: "记录学习新技术的过程和心得，与同行分享经验和见解",
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
              font-family: Arial, sans-serif;
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
  font-family: "Inter", sans-serif;
}
</style>

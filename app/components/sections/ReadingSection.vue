<template>
  <section id="reading" class="py-5 px-6">
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
          最近在读
        </h2>
        <!-- <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
          阅读是与智者对话，每本书都是一次心灵的旅行
        </p> -->
      </div>

      <!-- Books Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center"
      >
        <Book
          v-for="book in booksData"
          :key="book.id"
          :color="book.color"
          :size="book.size"
          :radius="book.radius"
          :shadow-size="book.shadowSize"
          :duration="1200"
          class="cursor-pointer transform transition-all duration-300 hover:scale-105"
          @click="handleBookClick(book)"
        >
          <BookHeader class="mb-2">
            <span
              class="text-xs px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm"
            >
              {{ book.category }}
            </span>
            <span
              class="text-xs px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm"
            >
              {{ book.status }}
            </span>
          </BookHeader>

          <BookTitle class="text-lg leading-tight">
            {{ book.title }}
          </BookTitle>

          <BookDescription class="text-white/80 mb-4">
            {{ book.author }}
          </BookDescription>

          <div class="mt-auto">
            <div
              class="flex items-center justify-between text-xs text-white/70 mb-2"
            >
              <span>进度</span>
              <span>{{ book.progress }}%</span>
            </div>
            <div class="w-full bg-white/20 rounded-full h-1.5">
              <div
                class="bg-white/80 h-1.5 rounded-full transition-all duration-500"
                :style="{ width: `${book.progress}%` }"
              />
            </div>
          </div>
        </Book>
      </div>

      <!-- Reading Stats
      <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          class="text-center p-6 bg-background/50 backdrop-blur-sm rounded-2xl border border-border/50"
        >
          <div class="text-3xl font-bold text-primary mb-2">
            {{ readingStats.totalBooks }}
          </div>
          <div class="text-muted-foreground">本年阅读</div>
        </div>
        <div
          class="text-center p-6 bg-background/50 backdrop-blur-sm rounded-2xl border border-border/50"
        >
          <div class="text-3xl font-bold text-primary mb-2">
            {{ readingStats.currentlyReading }}
          </div>
          <div class="text-muted-foreground">正在阅读</div>
        </div>
        <div
          class="text-center p-6 bg-background/50 backdrop-blur-sm rounded-2xl border border-border/50"
        >
          <div class="text-3xl font-bold text-primary mb-2">
            {{ readingStats.favoriteGenre }}
          </div>
          <div class="text-muted-foreground">偏爱类型</div>
        </div>
      </div> -->

      <!-- Reading Quote -->
      <!-- <div class="mt-16 text-center">
        <blockquote
          class="text-2xl font-medium text-muted-foreground italic max-w-3xl mx-auto"
        >
          "{{ readingQuote.text }}"
        </blockquote>
        <cite class="text-lg text-muted-foreground/80 mt-4 block">
          —— {{ readingQuote.author }}
        </cite>
      </div> -->
    </div>

    <!-- Toast 提示 -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-if="showToast"
        class="fixed top-4 right-4 z-50 bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-lg p-4 max-w-sm"
      >
        <div class="flex items-center space-x-3">
          <div class="flex-shrink-0">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <p class="text-sm text-foreground">{{ toastMessage }}</p>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import {
  Book,
  BookHeader,
  BookTitle,
  BookDescription,
} from "~/components/ui/book";

// 假数据 - 最近在读的书籍
const booksData = ref([
  {
    id: 1,
    title: "泥潭",
    author: "刘楚昕",
    category: "文学",
    status: "在读",
    progress: 10,
    color: "blue" as const,
    size: "md" as const,
    radius: "md" as const,
    shadowSize: "lg" as const,
    reflectionUrl: "",
  },
  {
    id: 2,
    title: "霍乱时期的爱情",
    author: "加西亚·马尔克斯",
    category: "文学",
    status: "已读",
    progress: 100,
    color: "emerald" as const,
    size: "md" as const,
    radius: "md" as const,
    shadowSize: "lg" as const,
    reflectionUrl: null,
  },
  {
    id: 3,
    title: "步履不停",
    author: "是枝裕和",
    category: "文学",
    status: "已读",
    progress: 100,
    color: "purple" as const,
    size: "md" as const,
    radius: "md" as const,
    shadowSize: "lg" as const,
    reflectionUrl: null,
  },
  {
    id: 4,
    title: "金庸武侠小说",
    author: "金庸",
    category: "武侠",
    status: "已读",
    progress: 80,
    color: "red" as const,
    size: "md" as const,
    radius: "md" as const,
    shadowSize: "lg" as const,
    reflectionUrl: null,
  },
  {
    id: 5,
    title: "凤凰架构",
    author: "周志明",
    category: "技术",
    status: "在读",
    progress: 10,
    color: "yellow" as const,
    size: "md" as const,
    radius: "md" as const,
    shadowSize: "lg" as const,
    reflectionUrl: null, // 暂无阅读感悟
  },
  {
    id: 6,
    title: "代码整洁之道",
    author: "罗伯特·C·马丁",
    category: "技术",
    status: "计划",
    progress: 3,
    color: "gray" as const,
    size: "md" as const,
    radius: "md" as const,
    shadowSize: "lg" as const,
    reflectionUrl: null, // 暂无阅读感悟
  },
  {
    id: 7,
    title: "我与地坛",
    author: "史铁生",
    category: "文学",
    status: "重温",
    progress: 80,
    color: "green" as const,
    size: "md" as const,
    radius: "md" as const,
    shadowSize: "lg" as const,
    reflectionUrl: "",
  },
  {
    id: 8,
    title: "雍正王朝",
    author: "二月河",
    category: "文学",
    status: "已读",
    progress: 100,
    color: "orange" as const,
    size: "md" as const,
    radius: "md" as const,
    shadowSize: "lg" as const,
    reflectionUrl: "",
  },
]);

// Toast 提示状态
const showToast = ref(false);
const toastMessage = ref("");

// 显示 Toast 提示
const showToastMessage = (message: string) => {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

// 处理书籍点击事件
const handleBookClick = (book: any) => {
  if (book.reflectionUrl && book.reflectionUrl !== "") {
    // 在新窗口打开阅读感悟链接
    window.open(book.reflectionUrl, "_blank");
    showToastMessage(`正在打开《${book.title}》的阅读感悟...`);
  } else {
    // 如果没有阅读感悟链接，显示优雅的提示
    showToastMessage(`《${book.title}》的阅读感悟正在整理中，敬请期待 📚`);
  }
};
</script>

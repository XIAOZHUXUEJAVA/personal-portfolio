<template>
  <section id="reading" class="py-5 px-6">
    <div class="max-w-7xl mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-12">
        <h2
          class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-green-600 to-yellow-500 bg-clip-text text-transparent"
          style="
            background-size: 200% 100%;
            animation: gradient-shift 3s ease-in-out infinite alternate;
          "
        >
          最近在读
        </h2>
      </div>

      <!-- 书架展示 -->
      <Bookshelf>
        <!-- 第一层：书1竖立 + 书2竖立 + 书3斜靠 + 书4竖立 -->
        <template #book-1>
          <ShelfBook
            :title="book1.title"
            :author="book1.author"
            :color="book1.color"
            :progress="book1.progress"
            :status="book1.status"
            mode="upright"
            :thickness="42"
            :height="200"
            @click="handleBookClick(book1)"
          />
        </template>
        <template #book-2>
          <ShelfBook
            :title="book2.title"
            :author="book2.author"
            :color="book2.color"
            :progress="book2.progress"
            :status="book2.status"
            mode="upright"
            :thickness="48"
            :height="210"
            @click="handleBookClick(book2)"
          />
        </template>
        <template #book-3>
          <ShelfBook
            :title="book3.title"
            :author="book3.author"
            :color="book3.color"
            :progress="book3.progress"
            :status="book3.status"
            mode="leaning"
            :thickness="46"
            :height="195"
            :lean-angle="-8"
            class="ml-3 hidden md:block"
            @click="handleBookClick(book3)"
          />
        </template>
        <template #book-9>
          <ShelfBook
            :title="book9.title"
            :author="book9.author"
            :color="book9.color"
            :progress="book9.progress"
            :status="book9.status"
            mode="upright"
            :thickness="44"
            :height="202"
            class="hidden md:block"
            @click="handleBookClick(book9)"
          />
        </template>
        <template #book-4>
          <ShelfBook
            :title="book4.title"
            :author="book4.author"
            :color="book4.color"
            :progress="book4.progress"
            :status="book4.status"
            mode="upright"
            :thickness="46"
            :height="210"
            @click="handleBookClick(book4)"
          />
        </template>
        <template #book-14>
          <ShelfBook
            :title="book14.title"
            :author="book14.author"
            :color="book14.color"
            :progress="book14.progress"
            :status="book14.status"
            mode="upright"
            :thickness="44"
            :height="204"
            class="hidden md:block"
            @click="handleBookClick(book14)"
          />
        </template>
        <template #book-15>
          <ShelfBook
            :title="book15.title"
            :author="book15.author"
            :color="book15.color"
            :progress="book15.progress"
            :status="book15.status"
            mode="upright"
            :thickness="42"
            :height="200"
            class="hidden md:block"
            @click="handleBookClick(book15)"
          />
        </template>
        <template #book-11>
          <ShelfBook
            :title="book11.title"
            :author="book11.author"
            :color="book11.color"
            :progress="book11.progress"
            :status="book11.status"
            mode="upright"
            :thickness="46"
            :height="198"
            class="hidden md:block"
            @click="handleBookClick(book11)"
          />
        </template>

        <!-- 第二层：书5竖立 + 书6平放 + 书7斜靠 + 书8竖立 -->
        <template #book-5>
          <ShelfBook
            :title="book5.title"
            :author="book5.author"
            :color="book5.color"
            :progress="book5.progress"
            :status="book5.status"
            mode="upright"
            :thickness="44"
            :height="200"
            class="hidden md:block"
            @click="handleBookClick(book5)"
          />
        </template>
        <template #book-10>
          <ShelfBook
            :title="book10.title"
            :author="book10.author"
            :color="book10.color"
            :progress="book10.progress"
            :status="book10.status"
            mode="upright"
            :thickness="60"
            :height="220"
            @click="handleBookClick(book10)"
          />
        </template>
        <template #book-6>
          <ShelfBook
            :title="book6.title"
            :author="book6.author"
            :color="book6.color"
            :progress="book6.progress"
            :status="book6.status"
            mode="flat"
            :thickness="38"
            :height="190"
            :flat-height="34"
            class="mr-6 hidden md:block"
            @click="handleBookClick(book6)"
          />
        </template>
        <template #book-12>
          <ShelfBook
            :title="book12.title"
            :author="book12.author"
            :color="book12.color"
            :progress="book12.progress"
            :status="book12.status"
            mode="upright"
            :thickness="46"
            :height="204"
            class="hidden md:block"
            @click="handleBookClick(book12)"
          />
        </template>
        <template #book-7>
          <ShelfBook
            :title="book7.title"
            :author="book7.author"
            :color="book7.color"
            :progress="book7.progress"
            :status="book7.status"
            mode="leaning"
            :thickness="46"
            :height="192"
            :lean-angle="10"
            class="mr-4 hidden md:block"
            @click="handleBookClick(book7)"
          />
        </template>
        <template #book-13>
          <ShelfBook
            :title="book13.title"
            :author="book13.author"
            :color="book13.color"
            :progress="book13.progress"
            :status="book13.status"
            mode="upright"
            :thickness="44"
            :height="196"
            @click="handleBookClick(book13)"
          />
        </template>
        <template #book-8>
          <ShelfBook
            :title="book8.title"
            :author="book8.author"
            :color="book8.color"
            :progress="book8.progress"
            :status="book8.status"
            mode="upright"
            :thickness="50"
            :height="208"
            @click="handleBookClick(book8)"
          />
        </template>

        <!-- 新增 5 本（分散到第一、第二层）：连城诀、恶意入一层；阿勒泰、倾城、摆渡人入二层 -->
        <template #book-16>
          <ShelfBook
            :title="book16.title"
            :author="book16.author"
            :color="book16.color"
            :progress="book16.progress"
            :status="book16.status"
            mode="upright"
            :thickness="44"
            :height="200"
            @click="handleBookClick(book16)"
          />
        </template>
        <template #book-18>
          <ShelfBook
            :title="book18.title"
            :author="book18.author"
            :color="book18.color"
            :progress="book18.progress"
            :status="book18.status"
            mode="leaning"
            :thickness="46"
            :height="194"
            :lean-angle="-9"
            class="ml-2 hidden md:block"
            @click="handleBookClick(book18)"
          />
        </template>
        <template #book-17>
          <ShelfBook
            :title="book17.title"
            :author="book17.author"
            :color="book17.color"
            :progress="book17.progress"
            :status="book17.status"
            mode="upright"
            :thickness="42"
            :height="206"
            @click="handleBookClick(book17)"
          />
        </template>
        <template #book-19>
          <ShelfBook
            :title="book19.title"
            :author="book19.author"
            :color="book19.color"
            :progress="book19.progress"
            :status="book19.status"
            mode="upright"
            :thickness="46"
            :height="202"
            class="hidden md:block"
            @click="handleBookClick(book19)"
          />
        </template>
        <template #book-20>
          <ShelfBook
            :title="book20.title"
            :author="book20.author"
            :color="book20.color"
            :progress="book20.progress"
            :status="book20.status"
            mode="upright"
            :thickness="44"
            :height="198"
            class="hidden md:block"
            @click="handleBookClick(book20)"
          />
        </template>
      </Bookshelf>
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
import { Bookshelf, ShelfBook } from "~/components/ui/bookshelf";

// 书籍数据
const booksData = [
  {
    id: 1,
    title: "泥潭",
    author: "刘楚昕",
    category: "文学",
    status: "在读",
    progress: 10,
    color: "blue",
    reflectionUrl: "",
  },
  {
    id: 2,
    title: "霍乱时期的爱情",
    author: "加西亚·马尔克斯",
    category: "文学",
    status: "已读",
    progress: 100,
    color: "emerald",
    reflectionUrl: null,
  },
  {
    id: 3,
    title: "步履不停",
    author: "是枝裕和",
    category: "文学",
    status: "已读",
    progress: 100,
    color: "purple",
    reflectionUrl: null,
  },
  {
    id: 4,
    title: "天龙八部",
    author: "金庸",
    category: "武侠",
    status: "已读",
    progress: 100,
    color: "red",
    reflectionUrl: null,
  },
  {
    id: 5,
    title: "凤凰架构",
    author: "周志明",
    category: "技术",
    status: "在读",
    progress: 10,
    color: "yellow",
    reflectionUrl: null,
  },
  {
    id: 6,
    title: "代码整洁之道",
    author: "罗伯特·C·马丁",
    category: "技术",
    status: "计划",
    progress: 3,
    color: "gray",
    reflectionUrl: null,
  },
  {
    id: 7,
    title: "我与地坛",
    author: "史铁生",
    category: "文学",
    status: "重温",
    progress: 80,
    color: "green",
    reflectionUrl: "",
  },
  {
    id: 8,
    title: "雍正王朝",
    author: "二月河",
    category: "文学",
    status: "已读",
    progress: 100,
    color: "orange",
    reflectionUrl: "",
  },
  {
    id: 9,
    title: "挪威的森林",
    author: "村上春树",
    category: "文学",
    status: "已读",
    progress: 100,
    color: "orange",
    reflectionUrl: null,
  },
  {
    id: 10,
    title: "冰与火之歌",
    author: "乔治·R·R·马丁",
    category: "奇幻",
    status: "在读",
    progress: 45,
    color: "blue",
    reflectionUrl: null,
  },
  {
    id: 11,
    title: "杀死一只知更鸟",
    author: "哈珀·李",
    category: "文学",
    status: "已读",
    progress: 100,
    color: "yellow",
    reflectionUrl: null,
  },
  {
    id: 12,
    title: "穆斯林的葬礼",
    author: "霍达",
    category: "文学",
    status: "已读",
    progress: 100,
    color: "purple",
    reflectionUrl: null,
  },
  {
    id: 13,
    title: "麦田里的守望者",
    author: "J.D.塞林格",
    category: "文学",
    status: "已读",
    progress: 100,
    color: "red",
    reflectionUrl: null,
  },
  {
    id: 14,
    title: "倚天屠龙记",
    author: "金庸",
    category: "武侠",
    status: "已读",
    progress: 100,
    color: "gray",
    reflectionUrl: null,
  },
  {
    id: 15,
    title: "笑傲江湖",
    author: "金庸",
    category: "武侠",
    status: "已读",
    progress: 100,
    color: "green",
    reflectionUrl: null,
  },
  {
    id: 16,
    title: "连城诀",
    author: "金庸",
    category: "武侠",
    status: "已读",
    progress: 100,
    color: "red",
    reflectionUrl: null,
  },
  {
    id: 17,
    title: "我的阿勒泰",
    author: "李娟",
    category: "文学",
    status: "在读",
    progress: 60,
    color: "green",
    reflectionUrl: "",
  },
  {
    id: 18,
    title: "恶意",
    author: "东野圭吾",
    category: "推理",
    status: "已读",
    progress: 100,
    color: "gray",
    reflectionUrl: null,
  },
  {
    id: 19,
    title: "倾城之恋",
    author: "张爱玲",
    category: "文学",
    status: "已读",
    progress: 100,
    color: "purple",
    reflectionUrl: null,
  },
  {
    id: 20,
    title: "摆渡人",
    author: "克莱儿·麦克福尔",
    category: "文学",
    status: "已读",
    progress: 100,
    color: "blue",
    reflectionUrl: null,
  },
];

// 单独引用每本书，避免 TS 索引访问 undefined 警告
const book1 = booksData[0]!;
const book2 = booksData[1]!;
const book3 = booksData[2]!;
const book4 = booksData[3]!;
const book5 = booksData[4]!;
const book6 = booksData[5]!;
const book7 = booksData[6]!;
const book8 = booksData[7]!;
const book9 = booksData[8]!;
const book10 = booksData[9]!;
const book11 = booksData[10]!;
const book12 = booksData[11]!;
const book13 = booksData[12]!;
const book14 = booksData[13]!;
const book15 = booksData[14]!;
const book16 = booksData[15]!;
const book17 = booksData[16]!;
const book18 = booksData[17]!;
const book19 = booksData[18]!;
const book20 = booksData[19]!;

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
const handleBookClick = (book: (typeof booksData)[number]) => {
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

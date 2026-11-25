<template>
  <section id="reading" class="journal-section site-container" aria-labelledby="reading-title">
    <div class="reading-inner">
      <div ref="headingRef" class="reading-heading">
        <SectionHeading number="05" label="between the pages" title="最近在读" heading-id="reading-title" />
      </div>
      <div class="reading-sidenote"><span>BOOKS &amp; MARGINALIA</span><span>{{ booksData.length }} 本藏书 / 点击封面翻阅</span></div>

      <div id="reading-books" class="reading-grid">
        <article v-for="(book, index) in visibleBooks" :key="book.id" class="reading-item" :data-status="book.status">
          <div class="reading-book-wrap">
            <Book
              class="reading-book cursor-pointer"
              size="md"
              radius="md"
              shadow-size="sm"
              :duration="450"
              :cover-color="getCoverColor(book.color)"
              content-class="h-full"
              role="button"
              tabindex="0"
              aria-haspopup="dialog"
              :aria-label="`查看《${book.title}》详情，${book.author}，${book.status}`"
              @click="openedBook = book"
              @keydown.enter.prevent="openedBook = book"
              @keydown.space.prevent="openedBook = book"
            >
              <div class="reading-cover-content">
                <BookHeader class="reading-cover-header">
                  <span>{{ book.category }}</span>
                  <span class="reading-cover-number">{{ String(index + 1).padStart(2, '0') }}</span>
                </BookHeader>
                <div class="reading-cover-rule" aria-hidden="true" />
                <div class="reading-cover-copy">
                  <BookTitle class="reading-cover-title">{{ book.title }}</BookTitle>
                  <BookDescription class="reading-cover-author">{{ book.author }}</BookDescription>
                </div>
                <div class="reading-cover-footer" aria-hidden="true">
                  <span>阅读 · 随记</span>
                  <BookOpen :size="15" :stroke-width="1.3" />
                </div>
              </div>
            </Book>
          </div>

          <div class="reading-meta">
            <div class="reading-status-row">
              <span
                class="reading-status"
                :class="{
                  'is-reading': book.status === '在读' || book.status === '重温',
                  'is-done': book.status === '已读',
                  'is-planned': book.status === '计划',
                }"
              >
                <span class="reading-status-dot" aria-hidden="true" />
                {{ book.status }}
              </span>
              <span class="reading-category" :data-category="book.category">
                <span class="reading-category-dot" aria-hidden="true" />{{ book.category }}
              </span>
              <span class="reading-percentage">{{ book.progress }}%</span>
            </div>
            <div
              class="reading-progress"
              role="progressbar"
              :aria-label="`《${book.title}》阅读进度`"
              :aria-valuenow="book.progress"
              :aria-valuetext="`${book.status}，${book.progress}%`"
              :aria-valuemin="0"
              :aria-valuemax="100"
            >
              <span :style="{ width: book.progress + '%' }" />
            </div>
          </div>
        </article>
      </div>

      <div v-if="booksData.length > INITIAL_BOOK_COUNT" class="flex justify-center mt-12">
        <ThemeButton
          variant="secondary"
          :aria-expanded="expanded"
          aria-controls="reading-books"
          @click="toggleExpanded"
        >
          {{ expanded ? '收起书单' : `查看全部 ${booksData.length} 本` }}
          <ChevronUp v-if="expanded" :size="16" aria-hidden="true" />
          <ChevronDown v-else :size="16" aria-hidden="true" />
        </ThemeButton>
      </div>
    </div>

    <BookOpenModal :book="openedBook" @close="openedBook = null" />
  </section>
</template>

<script setup lang="ts">
import SectionHeading from "~/components/layout/SectionHeading.vue";
import { computed, nextTick, ref } from "vue";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-vue-next";
import { Book, BookHeader, BookTitle, BookDescription } from "~/components/ui/book";
import { BookOpenModal } from "~/components/ui/bookshelf";
import { ThemeButton } from "~/components/ui/theme-button";

// 保留原有书目、阅读进度和读后随笔。
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
    review:
      "一片泥泞里挣扎的众生相。文字沉得下去，也拎得起来，读的时候总想停下来喘口气。",
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
    review:
      "跨越半个世纪的等待。原来爱情可以是一场慢性病，也可以是一生的执念。",
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
    review:
      "人生路上的失之交臂，总是慢一拍。看完只想给家里打个电话。",
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
    review:
      "无人不冤，有情皆孽。乔峰的悲壮至今难忘，这是我心里的武侠天花板。",
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
    review:
      "从可靠性视角重新理解分布式系统，边读边点头。技术书里少有的清醒之作。",
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
    review:
      "列在书单顶端很久了。据说读完会忍不住回头重构自己所有的旧代码。",
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
    review:
      "关于生死与命运最温柔的答卷。每次重读，都能在字里行间被轻轻托住。",
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
    review:
      "孤臣心事有谁知。把一个勤勉又孤独的帝王写活了，权谋之下满是人的无奈。",
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
    review:
      "青春、迷惘与欲望。村上春树把孤独写得很轻，却压得人心底发疼。",
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
    review:
      "没有主角光环的残酷世界。每个人都活得真实，也死得突然，只好接着往下读。",
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
    review:
      "通过孩子的眼睛看偏见与良知。阿蒂克斯是我心里永远的体面与正直。",
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
    review:
      "两代人、两段爱与遗憾。美与悲剧交织，读完心里空了好一块。",
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
    review:
      "一个少年的叛逆与温柔。那份想接住所有孩子的愿望，意外地让人动容。",
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
    review:
      "人生在世，恩怨情仇终难两全。张无忌的优柔寡断，反而最像个真实的人。",
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
    review:
      "江湖不在刃光里，而在人心里。一曲《笑傲江湖》，道尽自由与无奈。",
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
    review:
      "金庸笔下最悲凉的一部。狄云的遭遇看得人心疼，人性之恶比武功更可怕。",
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
    review:
      "辽阔天地里的烟火气。李娟的文字干净又敏锐，读着像吹过一阵清风。",
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
    review:
      "真正让人发毛的不是手法，而是那句‘我就是看他不顺眼’。无由的恶意最寒。",
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
    review:
      "一座城的倾覆，成全了一段乱世姻缘。张爱玲的苍凉，藏在每一个细节里。",
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
    review:
      "如果命运是一条河，谁是你的摆渡人？一路冒险，其实是一场自我救赎。",
  },
];

const INITIAL_BOOK_COUNT = 8;
const expanded = ref(false);
const headingRef = ref<HTMLElement | null>(null);
const openedBook = ref<(typeof booksData)[number] | null>(null);
const visibleBooks = computed(() => expanded.value ? booksData : booksData.slice(0, INITIAL_BOOK_COUNT));

// 布面封皮与纸张背景搭配，保留每本书的独立色彩。
const coverColors: Record<string, string> = {
  blue: "#465b65",
  emerald: "#526450",
  purple: "#686071",
  red: "#795b54",
  yellow: "#776d4b",
  gray: "#535a56",
  green: "#66714c",
  orange: "#80694f",
};
const getCoverColor = (color: string) => coverColors[color] || coverColors.green;

const toggleExpanded = async () => {
  expanded.value = !expanded.value;
  if (!expanded.value) {
    await nextTick();
    headingRef.value?.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }
};
</script>

<style scoped>
.reading-heading { scroll-margin-top: 120px; }
.reading-sidenote { display: flex; flex-wrap: wrap; justify-content: space-between; gap: var(--space-3) var(--space-5); margin-bottom: var(--space-6); color: var(--muted-foreground); font-size: var(--text-small); }
.reading-sidenote > span:first-child { font-family: var(--font-hand); font-size: 1.125rem; letter-spacing: 0.04em; }
.reading-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: var(--grid-gap);
  row-gap: var(--space-7);
  padding-top: var(--space-3);
}

.reading-item { min-width: 0; padding-bottom: var(--space-5); }
.reading-book-wrap { position: relative; max-width: 208px; margin-inline: auto; }
.reading-book-wrap::after {
  content: ""; position: absolute; left: -10px; right: -10px; bottom: -8px; height: 7px;
  border-radius: 2px; pointer-events: none; opacity: 0.55;
  background: linear-gradient(color-mix(in oklab, var(--wood-fill) 90%, transparent), color-mix(in oklab, var(--wood-fill) 45%, transparent));
  box-shadow: 0 3px 5px rgb(31 35 40 / 8%);
}
.dark .reading-book-wrap::after { box-shadow: 0 3px 6px rgb(0 0 0 / 25%); }
.reading-book { width: 100%; }
.reading-book :deep(.book-volume) { display: grid; min-height: 19rem; aspect-ratio: auto; }
.reading-book :deep(.book-front) { position: relative; padding: var(--space-5) var(--space-4); }
.reading-cover-content {
  display: flex;
  height: 100%;
  flex-direction: column;
  color: #faf9f0;
  text-align: left;
}

.reading-cover-header {
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  font-size: var(--text-small);
  line-height: 1.5;
  letter-spacing: 0.06em;
}

.reading-cover-number { font-family: var(--font-site); font-size: var(--text-small); letter-spacing: 0.08em; }
.reading-cover-rule { height: 1px; margin-top: 14px; background: rgb(250 249 240 / 0.25); }
.reading-cover-copy { margin-block: auto; padding-block: 18px; }
.reading-cover-title {
  margin: 0;
  font-size: clamp(1.125rem, 0.875rem + 1vw, 1.5rem);
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.04em;
  overflow-wrap: anywhere;
}

.reading-cover-author { margin-top: var(--space-3); font-size: var(--text-small); line-height: 1.6; overflow-wrap: anywhere; }
.reading-cover-footer { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); font-size: var(--text-small); line-height: 1.5; letter-spacing: 0.04em; }
.reading-meta { max-width: 208px; margin: var(--space-6) auto 0; }
.reading-status-row { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-2); font-size: var(--text-small); line-height: 1.5; }
.reading-status { display: inline-flex; align-items: center; gap: 6px; color: var(--muted-foreground); }
.reading-status.is-reading { color: var(--primary); }
.reading-status.is-done { color: #5f7a5a; }
.reading-status.is-planned { color: var(--muted-foreground); }
.dark .reading-status.is-done { color: #9db797; }
.reading-status-dot { width: 5px; height: 5px; flex-shrink: 0; border-radius: 50%; background: currentColor; }
.reading-category { display: inline-flex; align-items: center; gap: 5px; color: var(--muted-foreground); font-size: var(--text-small); }
.reading-category-dot { width: 6px; height: 6px; flex-shrink: 0; border-radius: 50%; background: var(--cat-color, var(--muted-foreground)); }
.reading-category[data-category="文学"] { --cat-color: #b28c87; }
.reading-category[data-category="技术"] { --cat-color: #667d6d; }
.reading-category[data-category="武侠"] { --cat-color: #b6a683; }
.reading-category[data-category="推理"] { --cat-color: #9b91ad; }
.reading-category[data-category="奇幻"] { --cat-color: #8caaaf; }
.reading-percentage { margin-left: auto; color: var(--muted-foreground); font-variant-numeric: tabular-nums; }
.reading-progress { height: 3px; margin-top: 9px; border-radius: 2px; overflow: hidden; background: var(--border); }
.reading-progress > span { display: block; height: 100%; border-radius: inherit; background: var(--primary); transition: width 400ms ease; }
.reading-item[data-status="已读"] .reading-progress > span { background: #6f8f6a; }
.reading-item[data-status="计划"] .reading-progress > span { background: var(--muted-foreground); opacity: 0.45; }
.dark .reading-item[data-status="已读"] .reading-progress > span { background: #92ad8c; }

@media (min-width: 640px) {
  .reading-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .reading-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

@media (max-width: 639px) {
  .reading-book :deep(.book-front) { padding: var(--space-4) var(--space-3); }
  .reading-cover-copy { padding-block: var(--space-4); }
}

@media (max-width: 479px) {
  .reading-grid { grid-template-columns: minmax(0, 1fr); }
  .reading-book-wrap, .reading-meta { max-width: 15rem; width: 100%; }
}
</style>

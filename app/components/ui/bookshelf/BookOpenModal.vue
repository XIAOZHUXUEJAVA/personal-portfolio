<template>
  <Teleport to="body">
    <Transition name="book-modal">
      <div
        v-if="book"
        ref="dialogRef"
        class="book-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-modal-title"
        tabindex="-1"
        @click.self="close"
        @keydown.esc.stop.prevent="close"
        @keydown.tab="trapFocus"
      >
        <div
          class="book-stage"
          :class="`is-${phase}`"
          :style="bookThemeStyle"
          @click.stop
        >
          <button
            ref="closeButtonRef"
            type="button"
            class="close-button"
            aria-label="关闭书籍详情"
            @click="close"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M4 4 L14 14 M14 4 L4 14"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
          </button>

          <div class="book-3d">
            <div class="book-shadow" aria-hidden="true" />
            <div class="turn-shadow" aria-hidden="true" />

            <!-- 桌面端固定右页；移动端会扩展为完整的单页阅读卡片。 -->
            <article class="page page-right">
              <div class="page-inner right-page-inner">
                <div class="mobile-summary">
                  <div class="meta-row">
                    <span class="category-chip">{{ book.category }}</span>
                    <span class="status-chip">{{ book.status }}</span>
                  </div>
                  <h3 class="inside-title">{{ book.title }}</h3>
                  <p class="author">{{ book.author }}</p>

                  <div class="progress-row">
                    <div class="progress-track">
                      <div
                        class="progress-value"
                        :style="{ width: `${safeProgress}%` }"
                      />
                    </div>
                    <span>{{ safeProgress }}%</span>
                  </div>
                  <div class="ink-divider" aria-hidden="true" />
                </div>

                <div class="review-heading">
                  <span>读后随笔</span>
                  <svg viewBox="0 0 54 8" aria-hidden="true">
                    <path d="M1 5 Q14 1 27 5 Q40 8 53 3" />
                  </svg>
                </div>

                <blockquote class="review-copy">
                  {{ book.review || "这本书的读后感正在整理中，敬请期待。" }}
                </blockquote>

                <a
                  v-if="book.reflectionUrl"
                  :href="book.reflectionUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="reflection-link"
                >
                  阅读完整感悟
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path
                      d="M3 7.5 H12 M8 3.5 L12 7.5 L8 11.5"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>

                <svg
                  class="page-doodle"
                  viewBox="0 0 48 38"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M3 10 Q13 4 24 10 Q35 4 45 10 L45 31 Q35 25 24 31 Q13 25 3 31 Z" />
                  <path d="M24 10 V31" />
                </svg>
              </div>
            </article>

            <!-- 封面背面就是打开后的左页，避免空白背面遮住内容。 -->
            <div class="cover" @transitionend="handleCoverTransitionEnd">
              <div class="cover-face cover-front">
                <div class="cover-spine" aria-hidden="true" />
                <div class="cover-frame">
                  <span class="cover-category">{{ book.category }}</span>
                  <div class="cover-ornament" aria-hidden="true">
                    <span />
                    <svg viewBox="0 0 24 24">
                      <path d="M12 3 L14.4 9.6 L21 12 L14.4 14.4 L12 21 L9.6 14.4 L3 12 L9.6 9.6 Z" />
                    </svg>
                    <span />
                  </div>
                  <h2 id="book-modal-title" class="cover-title">
                    {{ book.title }}
                  </h2>
                  <p class="cover-author">{{ book.author }}</p>
                  <span class="cover-footnote">A READING NOTE</span>
                </div>
              </div>

              <article class="cover-face cover-back">
                <div class="page-inner left-page-inner">
                  <div class="meta-row">
                    <span class="category-chip">{{ book.category }}</span>
                    <span class="status-chip">{{ book.status }}</span>
                  </div>

                  <h3 class="inside-title">{{ book.title }}</h3>
                  <p class="author">{{ book.author }}</p>

                  <div class="progress-block">
                    <div class="progress-label">
                      <span>阅读进度</span>
                      <strong>{{ safeProgress }}%</strong>
                    </div>
                    <div class="progress-track">
                      <div
                        class="progress-value"
                        :style="{ width: `${safeProgress}%` }"
                      />
                    </div>
                  </div>

                  <div class="ink-divider" aria-hidden="true" />

                  <p class="margin-note">
                    每一本读过的书，都会在记忆里留下一枚小小的书签。
                  </p>

                  <a
                    v-if="book.reflectionUrl"
                    :href="book.reflectionUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="reflection-link"
                  >
                    阅读完整感悟
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path
                        d="M3 7.5 H12 M8 3.5 L12 7.5 L8 11.5"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue";
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";

export interface OpenBook {
  id: number;
  title: string;
  author: string;
  category: string;
  status: string;
  progress: number;
  color: string;
  reflectionUrl?: string | null;
  review?: string;
}

type BookPhase = "closed" | "opening" | "open" | "closing";

const props = defineProps<{ book: OpenBook | null }>();
const emit = defineEmits<{ close: [] }>();

const phase = ref<BookPhase>("closed");
const dialogRef = ref<HTMLElement | null>(null);
const closeButtonRef = ref<HTMLButtonElement | null>(null);

let firstFrame = 0;
let secondFrame = 0;
let coverHoldTimer: ReturnType<typeof setTimeout> | undefined;
let previousBodyOverflow = "";
let previousBodyPaddingRight = "";
let previousActiveElement: HTMLElement | null = null;
let bodyIsLocked = false;

const colorThemes = {
  blue: { cover: "#55759f", deep: "#304865", accent: "#c9d9eb" },
  emerald: { cover: "#4f7f70", deep: "#294f45", accent: "#c8dfd5" },
  purple: { cover: "#74618f", deep: "#463857", accent: "#ddd3ea" },
  red: { cover: "#985c58", deep: "#633936", accent: "#ead0cc" },
  yellow: { cover: "#a98042", deep: "#664b27", accent: "#ead9ad" },
  gray: { cover: "#67727b", deep: "#3f484f", accent: "#d7dde1" },
  green: { cover: "#617f58", deep: "#3a5135", accent: "#d3e1cc" },
  orange: { cover: "#a56849", deep: "#68402e", accent: "#ead1c1" },
} as const;

type ThemeKey = keyof typeof colorThemes;

const safeProgress = computed(() =>
  Math.min(100, Math.max(0, Math.round(props.book?.progress ?? 0))),
);

const bookThemeStyle = computed<CSSProperties>(() => {
  const key = props.book?.color as ThemeKey;
  const theme = colorThemes[key] || colorThemes.gray;

  return {
    "--cover-color": theme.cover,
    "--cover-deep": theme.deep,
    "--cover-accent": theme.accent,
  } as CSSProperties;
});

const prefersReducedMotion = () =>
  import.meta.client &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const cancelOpeningSchedule = () => {
  if (!import.meta.client) return;
  cancelAnimationFrame(firstFrame);
  cancelAnimationFrame(secondFrame);
  if (coverHoldTimer) {
    clearTimeout(coverHoldTimer);
    coverHoldTimer = undefined;
  }
};

const lockBody = () => {
  if (!import.meta.client || bodyIsLocked) return;

  previousBodyOverflow = document.body.style.overflow;
  previousBodyPaddingRight = document.body.style.paddingRight;

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  if (scrollbarWidth > 0) {
    const currentPadding = Number.parseFloat(
      window.getComputedStyle(document.body).paddingRight,
    );
    document.body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
  }

  document.body.style.overflow = "hidden";
  bodyIsLocked = true;
};

const unlockBody = () => {
  if (!import.meta.client || !bodyIsLocked) return;
  document.body.style.overflow = previousBodyOverflow;
  document.body.style.paddingRight = previousBodyPaddingRight;
  bodyIsLocked = false;
};

watch(
  () => props.book,
  async (book) => {
    cancelOpeningSchedule();

    if (!book) {
      phase.value = "closed";
      unlockBody();
      await nextTick();
      previousActiveElement?.focus({ preventScroll: true });
      previousActiveElement = null;
      return;
    }

    if (!bodyIsLocked && import.meta.client) {
      previousActiveElement = document.activeElement as HTMLElement | null;
    }

    phase.value = "closed";
    lockBody();
    await nextTick();
    dialogRef.value?.focus({ preventScroll: true });

    // 先让封面完整呈现一小段时间，再开始翻开，避免用户来不及看清封面。
    firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        coverHoldTimer = setTimeout(() => {
          coverHoldTimer = undefined;
          phase.value = prefersReducedMotion() ? "open" : "opening";
        }, 700);
      });
    });
  },
  { immediate: true },
);

const close = () => {
  if (!props.book || phase.value === "closing") return;
  cancelOpeningSchedule();

  if (prefersReducedMotion() || phase.value === "closed") {
    emit("close");
    return;
  }

  phase.value = "closing";
};

const handleCoverTransitionEnd = (event: TransitionEvent) => {
  if (event.target !== event.currentTarget || event.propertyName !== "transform") {
    return;
  }

  if (phase.value === "opening") {
    phase.value = "open";
  } else if (phase.value === "closing") {
    emit("close");
  }
};

const trapFocus = (event: KeyboardEvent) => {
  const dialog = dialogRef.value;
  if (!dialog) return;

  const focusable = Array.from(
    dialog.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute("aria-hidden"));

  if (!focusable.length) {
    event.preventDefault();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first?.focus();
  } else if (document.activeElement === dialog) {
    event.preventDefault();
    (event.shiftKey ? last : first)?.focus();
  }
};

onBeforeUnmount(() => {
  cancelOpeningSchedule();
  unlockBody();
});
</script>

<style scoped>
.book-modal-enter-active,
.book-modal-leave-active {
  transition:
    opacity 240ms ease,
    backdrop-filter 300ms ease;
}

.book-modal-enter-from,
.book-modal-leave-to {
  opacity: 0;
  backdrop-filter: blur(0);
}

.book-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 32px 24px;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 44%, rgb(75 63 48 / 18%), transparent 45%),
    rgb(20 18 16 / 68%);
  backdrop-filter: blur(8px) saturate(0.85);
  -webkit-backdrop-filter: blur(8px) saturate(0.85);
}

.book-stage {
  --paper: #fbf5e8;
  --paper-deep: #eee2cd;
  --ink: #34302a;
  --muted-ink: #756c60;
  --line: rgb(91 74 53 / 20%);
  position: relative;
  width: min(760px, calc(100vw - 48px));
  aspect-ratio: 1.55;
  perspective: 2400px;
  perspective-origin: 50% 46%;
  font-family: "LXGW WenKai", "PingFang SC", "Microsoft YaHei", sans-serif;
  isolation: isolate;
}

:global(.dark) .book-stage {
  --paper: #292824;
  --paper-deep: #1f1f1c;
  --ink: #eee9df;
  --muted-ink: #aaa295;
  --line: rgb(224 209 184 / 16%);
}

.book-3d {
  position: absolute;
  inset: 0;
  transform: translate3d(-25%, 14px, 0) scale(0.94);
  transform-style: preserve-3d;
  transition: transform 920ms cubic-bezier(0.2, 0.76, 0.18, 1);
  will-change: transform;
}

.is-opening .book-3d,
.is-open .book-3d {
  transform: translate3d(0, 0, 0) scale(1);
}

.is-closing .book-3d {
  transform: translate3d(-25%, 10px, 0) scale(0.95);
  transition-duration: 720ms;
  transition-timing-function: cubic-bezier(0.55, 0.05, 0.67, 0.34);
}

.book-shadow {
  position: absolute;
  z-index: -2;
  left: 5%;
  right: 5%;
  bottom: -5.5%;
  height: 12%;
  border-radius: 50%;
  background: rgb(0 0 0 / 42%);
  filter: blur(18px);
  opacity: 0.55;
  transform: translateX(27%) scaleX(0.5);
  transition:
    transform 920ms cubic-bezier(0.2, 0.76, 0.18, 1),
    opacity 500ms ease;
}

.is-opening .book-shadow,
.is-open .book-shadow {
  opacity: 0.48;
  transform: translateX(0) scaleX(1);
}

.is-closing .book-shadow {
  opacity: 0.54;
  transform: translateX(27%) scaleX(0.5);
  transition-duration: 720ms;
}

.turn-shadow {
  position: absolute;
  z-index: 8;
  top: 2%;
  bottom: 2%;
  left: 47%;
  width: 12%;
  border-radius: 50%;
  background: rgb(20 14 8 / 58%);
  filter: blur(18px);
  opacity: 0;
  pointer-events: none;
}

.is-opening .turn-shadow {
  animation: turn-shadow-open 920ms ease both;
}

.is-closing .turn-shadow {
  animation: turn-shadow-close 720ms ease both;
}

@keyframes turn-shadow-open {
  0%, 100% { opacity: 0; transform: translateX(25%) scaleX(0.25); }
  48% { opacity: 0.42; transform: translateX(-8%) scaleX(1); }
}

@keyframes turn-shadow-close {
  0%, 100% { opacity: 0; transform: translateX(-8%) scaleX(0.25); }
  48% { opacity: 0.36; transform: translateX(18%) scaleX(0.9); }
}

.page,
.cover {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
}

.page {
  color: var(--ink);
  background-color: var(--paper);
  background-image:
    radial-gradient(circle at 20% 15%, rgb(155 119 67 / 6%) 0 1px, transparent 1.5px),
    radial-gradient(circle at 75% 62%, rgb(155 119 67 / 5%) 0 1px, transparent 1.5px),
    linear-gradient(90deg, rgb(117 87 48 / 11%), transparent 10%);
  background-size: 21px 21px, 27px 27px, 100% 100%;
  border: 1px solid var(--line);
  border-radius: 3px 14px 14px 3px;
  box-shadow:
    inset 20px 0 34px rgb(81 58 31 / 12%),
    inset -5px 0 10px rgb(81 58 31 / 5%),
    8px 7px 0 -3px var(--paper-deep),
    12px 12px 22px rgb(20 15 10 / 20%);
}

.page-right {
  z-index: 1;
  opacity: 0;
  transform: translateZ(-1px);
  transition: opacity 260ms ease 120ms;
}

.is-opening .page-right,
.is-open .page-right {
  opacity: 1;
}

.is-closing .page-right {
  opacity: 0.35;
  transition-delay: 300ms;
}

.page-inner {
  position: relative;
  width: 100%;
  height: 100%;
  padding: clamp(24px, 4.4vw, 42px) clamp(22px, 3.8vw, 38px);
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--line) transparent;
}

.right-page-inner {
  display: flex;
  flex-direction: column;
}

.cover {
  z-index: 6;
  transform: rotateY(0deg);
  transform-origin: left center;
  transform-style: preserve-3d;
  transition: transform 920ms cubic-bezier(0.2, 0.76, 0.18, 1);
  will-change: transform;
}

.is-opening .cover,
.is-open .cover {
  transform: rotateY(-178deg);
}

.is-closing .cover {
  transform: rotateY(0deg);
  transition-duration: 720ms;
  transition-timing-function: cubic-bezier(0.55, 0.05, 0.67, 0.34);
}

.cover-face {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border: 1px solid rgb(24 20 16 / 45%);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.cover-front {
  display: grid;
  place-items: center;
  padding: clamp(18px, 3vw, 30px);
  color: #fffaf0;
  background:
    linear-gradient(115deg, transparent 0 52%, rgb(255 255 255 / 5%) 53%, transparent 66%),
    radial-gradient(circle at 72% 18%, rgb(255 255 255 / 13%), transparent 32%),
    linear-gradient(135deg, var(--cover-color), var(--cover-deep));
  border-radius: 3px 14px 14px 3px;
  box-shadow:
    inset 12px 0 22px rgb(0 0 0 / 24%),
    inset -2px 0 0 rgb(255 255 255 / 8%),
    10px 13px 30px rgb(0 0 0 / 34%);
}

.cover-front::after {
  position: absolute;
  inset: 0;
  content: "";
  pointer-events: none;
  opacity: 0.14;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.28'/%3E%3C/svg%3E");
  mix-blend-mode: soft-light;
}

.cover-spine {
  position: absolute;
  z-index: 2;
  inset: 0 auto 0 0;
  width: 9%;
  border-right: 1px solid rgb(255 255 255 / 12%);
  background: linear-gradient(90deg, rgb(0 0 0 / 30%), transparent);
  box-shadow: 5px 0 12px rgb(0 0 0 / 13%);
}

.cover-frame {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12%;
  text-align: center;
  border: 1px solid rgb(255 250 235 / 32%);
  border-radius: 2px 9px 9px 2px;
  box-shadow: inset 0 0 0 4px rgb(255 250 235 / 5%);
}

.cover-category {
  margin-bottom: 8%;
  color: var(--cover-accent);
  font-size: clamp(10px, 1.3vw, 12px);
  font-weight: 600;
  letter-spacing: 0.32em;
}

.cover-ornament {
  display: flex;
  width: min(78%, 190px);
  align-items: center;
  gap: 10px;
  margin-bottom: 7%;
  color: var(--cover-accent);
}

.cover-ornament span {
  height: 1px;
  flex: 1;
  background: currentColor;
  opacity: 0.55;
}

.cover-ornament svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.2;
}

.cover-title {
  max-width: 100%;
  color: #fffaf0;
  font-size: clamp(22px, 3.4vw, 36px);
  font-weight: 700;
  line-height: 1.28;
  letter-spacing: 0.02em;
  text-wrap: balance;
  text-shadow: 0 2px 8px rgb(0 0 0 / 22%);
}

.cover-author {
  margin-top: 7%;
  color: rgb(255 250 240 / 78%);
  font-size: clamp(12px, 1.7vw, 15px);
  letter-spacing: 0.08em;
}

.cover-footnote {
  position: absolute;
  bottom: 7%;
  color: rgb(255 250 240 / 46%);
  font-family: "Inter", sans-serif;
  font-size: 8px;
  letter-spacing: 0.24em;
}

.cover-back {
  color: var(--ink);
  background-color: var(--paper);
  background-image:
    radial-gradient(circle at 18% 20%, rgb(155 119 67 / 6%) 0 1px, transparent 1.5px),
    radial-gradient(circle at 72% 65%, rgb(155 119 67 / 5%) 0 1px, transparent 1.5px),
    linear-gradient(270deg, rgb(117 87 48 / 14%), transparent 11%);
  background-size: 23px 23px, 29px 29px, 100% 100%;
  border-radius: 14px 3px 3px 14px;
  box-shadow:
    inset -20px 0 34px rgb(81 58 31 / 13%),
    -7px 7px 0 -3px var(--paper-deep),
    -12px 12px 22px rgb(20 15 10 / 18%);
  transform: rotateY(180deg);
}

.left-page-inner {
  opacity: 0.2;
  transition: opacity 260ms ease;
}

.is-opening .left-page-inner,
.is-open .left-page-inner {
  opacity: 1;
  transition-delay: 430ms;
}

.is-closing .left-page-inner {
  opacity: 0.25;
  transition-delay: 0ms;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: clamp(14px, 2.4vw, 24px);
}

.category-chip,
.status-chip {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 2px 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
}

.category-chip {
  color: var(--muted-ink);
  background: rgb(118 101 79 / 10%);
  border: 1px solid var(--line);
}

.status-chip {
  color: var(--cover-deep);
  background: color-mix(in srgb, var(--cover-accent) 68%, transparent);
  border: 1px solid color-mix(in srgb, var(--cover-color) 24%, transparent);
}

:global(.dark) .status-chip {
  color: var(--cover-accent);
  background: color-mix(in srgb, var(--cover-deep) 58%, transparent);
}

.inside-title {
  color: var(--ink);
  font-size: clamp(22px, 3.2vw, 34px);
  font-weight: 700;
  line-height: 1.25;
  text-wrap: balance;
}

.author {
  margin-top: 7px;
  color: var(--muted-ink);
  font-size: 14px;
}

.progress-block {
  margin-top: clamp(24px, 4vw, 38px);
}

.progress-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  color: var(--muted-ink);
  font-size: 12px;
}

.progress-label strong {
  color: var(--cover-color);
  font-family: "Inter", sans-serif;
  font-size: 12px;
}

.progress-track {
  height: 7px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgb(112 94 72 / 10%);
  box-shadow: inset 0 1px 2px rgb(0 0 0 / 7%);
}

.progress-value {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--cover-deep), var(--cover-color));
  box-shadow: 0 0 8px color-mix(in srgb, var(--cover-color) 36%, transparent);
  transition: width 700ms cubic-bezier(0.22, 1, 0.36, 1) 420ms;
}

.ink-divider {
  width: 100%;
  height: 10px;
  margin: clamp(22px, 3.5vw, 34px) 0 18px;
  opacity: 0.48;
  background: no-repeat center / 100% 100%
    url("data:image/svg+xml,%3Csvg viewBox='0 0 240 10' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 6 Q60 1 120 5 Q180 9 238 4' fill='none' stroke='%23887967' stroke-width='1.2' stroke-linecap='round'/%3E%3C/svg%3E");
}

.margin-note {
  max-width: 92%;
  color: var(--muted-ink);
  font-size: clamp(12px, 1.7vw, 14px);
  line-height: 1.9;
}

.review-heading {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: clamp(22px, 3.5vw, 34px);
  color: var(--cover-color);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.24em;
}

.review-heading svg {
  width: 54px;
  height: 8px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1;
  opacity: 0.45;
}

.review-copy {
  position: relative;
  margin: 0;
  padding-left: clamp(18px, 2.5vw, 25px);
  color: var(--ink);
  font-size: clamp(15px, 2vw, 17px);
  line-height: 2;
  white-space: pre-line;
}

.review-copy::before {
  position: absolute;
  top: -18px;
  left: -4px;
  content: "“";
  color: var(--cover-color);
  font-family: Georgia, serif;
  font-size: 56px;
  line-height: 1;
  opacity: 0.22;
}

.reflection-link {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  padding-top: 24px;
  color: var(--cover-color);
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
}

.reflection-link:hover {
  color: var(--cover-deep);
}

.reflection-link svg {
  transition: transform 180ms ease;
}

.reflection-link:hover svg {
  transform: translateX(3px);
}

.page-doodle {
  position: absolute;
  right: 26px;
  bottom: 22px;
  width: 44px;
  color: var(--cover-color);
  opacity: 0.18;
  pointer-events: none;
}

.page-doodle path {
  stroke: currentColor;
  stroke-width: 1.2;
}

.mobile-summary {
  display: none;
}

.progress-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  color: var(--muted-ink);
  font-family: "Inter", sans-serif;
  font-size: 11px;
}

.progress-row .progress-track {
  flex: 1;
}

.close-button {
  position: absolute;
  z-index: 30;
  top: -15px;
  right: -15px;
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  color: var(--ink);
  cursor: pointer;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper);
  box-shadow: 0 7px 20px rgb(0 0 0 / 24%);
  opacity: 0;
  transform: translateY(6px) scale(0.9);
  transition:
    opacity 220ms ease,
    transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1),
    color 160ms ease,
    background-color 160ms ease;
}

.is-opening .close-button,
.is-open .close-button {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition-delay: 560ms, 560ms, 0ms, 0ms;
}

.is-closing .close-button {
  opacity: 0;
  transform: translateY(5px) scale(0.92);
  transition-delay: 0ms;
}

.close-button:hover {
  color: var(--cover-deep);
  background: var(--cover-accent);
  transform: rotate(6deg) scale(1.05);
}

.close-button:focus-visible,
.reflection-link:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--cover-accent) 72%, white);
  outline-offset: 3px;
}

@media (max-width: 640px) {
  .book-overlay {
    padding: 12px;
  }

  .book-stage {
    width: min(100%, 440px);
    height: min(720px, calc(100dvh - 24px));
    aspect-ratio: auto;
    perspective: 1800px;
  }

  .book-3d {
    overflow: hidden;
    border-radius: 16px;
    transform: translate3d(0, 14px, 0) scale(0.96);
  }

  .is-opening .book-3d,
  .is-open .book-3d {
    transform: translate3d(0, 0, 0) scale(1);
  }

  .is-closing .book-3d {
    transform: translate3d(0, 10px, 0) scale(0.97);
  }

  .page,
  .cover {
    left: 0;
    width: 100%;
  }

  .page-right {
    border-radius: 16px;
    background-image:
      radial-gradient(circle at 20% 15%, rgb(155 119 67 / 6%) 0 1px, transparent 1.5px),
      radial-gradient(circle at 75% 62%, rgb(155 119 67 / 5%) 0 1px, transparent 1.5px);
  }

  .cover-front,
  .cover-back {
    border-radius: 16px;
  }

  .is-opening .cover,
  .is-open .cover {
    transform: rotateY(-104deg);
  }

  .right-page-inner {
    padding: 30px 24px 26px;
  }

  .mobile-summary {
    display: block;
  }

  .review-heading {
    margin-bottom: 18px;
  }

  .review-copy {
    padding-left: 17px;
    font-size: 15px;
    line-height: 1.9;
  }

  .ink-divider {
    margin: 20px 0 18px;
  }

  .reflection-link {
    margin-top: 12px;
  }

  .page-doodle {
    right: 18px;
    bottom: 16px;
  }

  .close-button {
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
  }

  .book-shadow,
  .turn-shadow {
    display: none;
  }
}

@media (max-height: 560px) and (min-width: 641px) {
  .book-stage {
    width: min(680px, calc(100vw - 48px));
  }

  .page-inner {
    padding-top: 24px;
    padding-bottom: 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .book-modal-enter-active,
  .book-modal-leave-active,
  .book-3d,
  .book-shadow,
  .cover,
  .page-right,
  .left-page-inner,
  .close-button,
  .progress-value,
  .reflection-link svg {
    animation: none !important;
    transition-duration: 1ms !important;
    transition-delay: 0ms !important;
  }

  .turn-shadow {
    display: none;
  }
}
</style>

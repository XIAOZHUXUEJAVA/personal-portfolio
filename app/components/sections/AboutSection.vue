<template>
  <section id="about" class="journal-section site-container" aria-labelledby="about-title">
    <SectionHeading number="01" label="a little about me" title="关于我" heading-id="about-title" description="普通程序员，保持好奇，继续折腾。" />
    <div class="about-notes">
      <FloatingCard v-for="(item, index) in aboutData" :key="item.title" :rotate-depth="10" :translate-depth="8" class="about-note" :class="`about-note--${index}`">
        <span class="paper-tape" aria-hidden="true" />
        <div class="note-content">
          <div class="note-topline"><component :is="icons[index]" :size="23" :stroke-width="1.4" /><span>PERSONAL NOTE / 0{{ index + 1 }}</span></div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <div class="note-tags handdrawn-rule handdrawn-rule--top"><span v-for="tag in item.tags" :key="tag"># {{ tag }}</span></div>
        </div>
      </FloatingCard>
    </div>
    <blockquote v-if="currentQuote" class="personal-quote"><span aria-hidden="true">「</span> {{ currentQuote }} <span aria-hidden="true">」</span></blockquote>
  </section>
</template>

<script setup lang="ts">
import { Code2, Bike, Music2 } from "lucide-vue-next";
import SectionHeading from "~/components/layout/SectionHeading.vue";
import { FloatingCard } from "~/components/ui/floating-card";
import { aboutData, inspirationalQuotes } from "~/data/staticData";
const icons = [Code2, Bike, Music2];
const currentQuote = ref(inspirationalQuotes[0] || "");
onMounted(() => {
  if (inspirationalQuotes.length) currentQuote.value = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
});
</script>

<style scoped>
.about-notes { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 30px; padding: 12px 5px 0; }
.about-note { --note-color: var(--paper-blue); transform: rotate(-1deg); }
.about-note--1 { --note-color: var(--paper-yellow); --tape-color: var(--paper-rose); transform: rotate(0.8deg); margin-top: 18px; }
.about-note--2 { --note-color: var(--paper-rose); transform: rotate(-0.5deg); }
.about-note :deep(.floating-card__surface) { border-radius: 0; background: transparent; border: 0; box-shadow: none; }
.about-note :deep(.floating-card__surface)::before,
.about-note :deep(.floating-card__surface)::after {
  content: ""; position: absolute; pointer-events: none;
  mask-image: var(--paper-mask); mask-size: var(--paper-mask-size);
  mask-position: var(--paper-mask-position); mask-repeat: var(--paper-mask-repeat);
}
.about-note :deep(.floating-card__surface)::before {
  inset: 0; z-index: -1; background: var(--note-color) url('/paper/article-paper-texture.svg');
}
.about-note :deep(.floating-card__surface)::after {
  inset: 4px -2px -4px 3px; z-index: -2; background: var(--paper-back) url('/paper/nav-paper-texture.svg'); transform: rotate(-0.35deg);
}
.note-content { display: flex; flex-direction: column; height: 100%; padding: 30px 26px 25px; }
.note-topline { display: flex; justify-content: space-between; align-items: center; gap: 12px; color: var(--primary); }
.note-topline span { font-size: 10px; letter-spacing: 0.04em; }
.note-content h3 { margin-top: 26px; font-size: 19px; font-weight: 500; }
.note-content > p { margin-top: 13px; padding-bottom: 27px; font-size: 13px; line-height: 2; color: var(--muted-foreground); }
.note-tags { display: flex; flex-wrap: wrap; gap: 14px; margin-top: auto; padding-top: 16px; font-size: 10px; color: var(--primary); }
.personal-quote { margin: 36px auto 0; text-align: center; color: var(--muted-foreground); font-size: 13px; line-height: 2; }
.personal-quote span { color: var(--primary); }
@media (max-width: 800px) { .about-notes { gap: 20px; } .note-content { padding: 28px 20px 22px; } .note-topline { flex-wrap: wrap; gap: 8px; } }
@media (max-width: 640px) { .about-notes { grid-template-columns: 1fr; gap: 30px; padding-inline: 7px; } .about-note--1 { margin-top: 0; } .note-content h3 { margin-top: 18px; } .personal-quote { margin-top: 32px; font-size: 12px; } }
</style>

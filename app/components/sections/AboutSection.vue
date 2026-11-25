<template>
  <section id="about" class="journal-section site-container" aria-labelledby="about-title">
    <SectionHeading number="01" label="a little about me" title="关于我" heading-id="about-title" />
    <div class="about-notes">
      <FloatingCard v-for="(item, index) in aboutData" :key="item.title" :rotate-depth="10" :translate-depth="8" class="about-note" :class="`about-note--${index}`">
        <span class="paper-tape" aria-hidden="true" />
        <div class="note-content">
          <div class="note-topline"><component :is="icons[index]" :size="23" :stroke-width="1.4" /><span>PERSONAL NOTE / 0{{ index + 1 }}</span></div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <div class="note-tags"><span v-for="tag in item.tags" :key="tag"># {{ tag }}</span></div>
        </div>
      </FloatingCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Code2, Bike, Music2 } from "lucide-vue-next";
import SectionHeading from "~/components/layout/SectionHeading.vue";
import { FloatingCard } from "~/components/ui/floating-card";
import { aboutData } from "~/data/staticData";
const icons = [Code2, Bike, Music2];
</script>

<style scoped>
.about-notes { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--grid-gap); padding: var(--space-3) var(--space-1) 0; }
.about-note { --note-color: var(--paper-blue); transform: rotate(-1deg); transition: transform 360ms cubic-bezier(0.22, 0.61, 0.36, 1); }
.about-note--1 { --note-color: var(--paper-yellow); --tape-color: var(--paper-rose); transform: rotate(0.8deg); margin-top: 18px; }
.about-note--2 { --note-color: var(--paper-rose); transform: rotate(-0.5deg); }
@media (hover: hover) {
  .about-note:hover { transform: rotate(0deg) translateY(-6px); }
}
.about-note :deep(.floating-card__surface) { border-radius: 0; background: transparent; border: 0; box-shadow: none; }
.about-note :deep(.floating-card__surface)::before,
.about-note :deep(.floating-card__surface)::after {
  content: ""; position: absolute; pointer-events: none;
  mask-image: var(--paper-mask); mask-size: var(--paper-mask-size);
  mask-position: var(--paper-mask-position); mask-repeat: var(--paper-mask-repeat);
}
.about-note :deep(.floating-card__surface)::before {
  inset: 0; z-index: -1; background: var(--note-color) var(--paper-texture);
}
.about-note :deep(.floating-card__surface)::after {
  inset: 4px -2px -4px 3px; z-index: -2; background: var(--paper-back) var(--paper-back-texture); transform: rotate(-0.35deg); box-shadow: var(--surface-shadow);
}
.note-content { display: flex; flex-direction: column; height: 100%; padding: var(--card-padding); }
.note-topline { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: var(--space-3); color: var(--primary); }
.note-topline span { font-family: var(--font-hand); font-size: 1rem; line-height: 1.4; letter-spacing: 0.02em; }
.note-content h3 { margin-top: var(--space-5); font-size: var(--text-heading); font-weight: 500; }
.note-content > p { margin-top: var(--space-3); padding-bottom: var(--space-5); font-size: var(--text-body); line-height: 1.85; color: var(--muted-foreground); }
.note-tags { display: flex; flex-wrap: wrap; gap: var(--space-2); margin-top: auto; padding-top: var(--space-4); font-size: var(--text-small); color: var(--primary); }
.note-tags span {
  padding: 3px 10px; border-radius: 999px; line-height: 1.6;
  color: color-mix(in oklab, var(--primary) 78%, var(--foreground));
  background: color-mix(in oklab, var(--note-color) 72%, var(--card));
  border: 1px solid color-mix(in oklab, var(--note-color) 58%, var(--border));
}
@media (max-width: 1023px) { .about-notes { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 640px) { .about-notes { grid-template-columns: 1fr; } .about-note--1 { margin-top: 0; } }
</style>

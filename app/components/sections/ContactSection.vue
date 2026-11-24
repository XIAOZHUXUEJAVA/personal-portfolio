<template>
  <section id="contact" class="journal-section site-container">
    <div class="contact-inner">
      <SectionHeading number="06" label="a letter, perhaps" title="保持联系" description="这一页的最后，留一个可以找到我的地方。" />
      <div class="contact-cards">
        <CardSpotlight :gradient-size="180" class="contact-card" slot-class="w-full">
          <div class="contact-row">
            <span class="contact-icon theme-icon"><Mail :size="20" :stroke-width="1.5" /></span>
            <div class="contact-copy">
              <h3>邮箱联系</h3>
              <a :href="`mailto:${contactInfo.email}`">{{ contactInfo.email }}</a>
            </div>
            <ArrowUpRight :size="16" class="contact-arrow" aria-hidden="true" />
          </div>
        </CardSpotlight>
        <CardSpotlight :gradient-size="180" class="contact-card" slot-class="w-full">
          <div class="contact-row">
            <span class="contact-icon theme-icon"><Github :size="20" :stroke-width="1.5" /></span>
            <div class="contact-copy">
              <h3>GitHub</h3>
              <a :href="contactInfo.github" target="_blank" rel="noopener noreferrer">XIAOZHUXUEJAVA</a>
            </div>
            <ArrowUpRight :size="16" class="contact-arrow" aria-hidden="true" />
          </div>
        </CardSpotlight>
      </div>
      <div class="contact-back-top">
        <ThemeButton variant="ghost" @click="scrollToTop">回到顶部 <ArrowUp :size="14" /></ThemeButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from "~/components/layout/SectionHeading.vue";
import { ArrowUp, ArrowUpRight, Mail, Github } from "lucide-vue-next";
import { CardSpotlight } from "~/components/ui/card-spotlight";
import { ThemeButton } from "~/components/ui/theme-button";
import { contactInfo } from "~/data/staticData";
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style scoped>
.contact-cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
.contact-card { isolation: isolate; height: auto; min-height: 0; padding: 18px 22px; border: 0; border-radius: 0; background: transparent; box-shadow: none; }
.contact-card::before,
.contact-card::after {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  -webkit-mask-image: var(--paper-mask); -webkit-mask-size: var(--paper-mask-size);
  -webkit-mask-position: var(--paper-mask-position); -webkit-mask-repeat: var(--paper-mask-repeat);
  mask-image: var(--paper-mask); mask-size: var(--paper-mask-size);
  mask-position: var(--paper-mask-position); mask-repeat: var(--paper-mask-repeat);
}
.contact-card::before { z-index: -2; background: color-mix(in srgb, var(--primary) 24%, var(--card)); }
.contact-card::after { inset: 1px; z-index: -1; background: var(--paper-back) url('/paper/article-paper-texture.svg'); }
.contact-card:first-child { rotate: -0.35deg; }
.contact-card:last-child { rotate: 0.3deg; }
.contact-row { display: flex; align-items: center; gap: 15px; }
.contact-icon { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0; }
.contact-copy { min-width: 0; flex: 1; }
.contact-copy h3 { font-size: 14px; font-weight: 500; line-height: 1.6; }
.contact-copy a { display: inline-flex; align-items: center; min-height: 32px; max-width: 100%; font-size: 12px; color: var(--primary); overflow-wrap: anywhere; }
.contact-copy a:hover { text-decoration: underline; text-underline-offset: 4px; }
.contact-arrow { flex-shrink: 0; color: var(--muted-foreground); }
.contact-back-top { display: flex; justify-content: center; margin-top: 22px; }
@media (max-width: 640px) {
  .contact-cards { grid-template-columns: 1fr; gap: 12px; }
  .contact-card { padding: 15px 17px; }
  .contact-row { gap: 12px; }
  .contact-copy a { font-size: 11px; }
}
</style>

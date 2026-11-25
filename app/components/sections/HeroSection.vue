<template>
  <section id="hero" class="journal-hero site-container" aria-labelledby="intro-title">
    <p class="hero-edition">LIFE SCRAPBOOK <span>/ VOL. 01</span></p>
    <div class="hero-intro">
      <CardContainer class="mx-auto w-fit">
        <CardBody class="hero-avatar-card h-auto w-fit">
          <CardItem translate-z="50" class="w-full">
            <a href="#about" class="avatar-link" aria-label="认识一下 xiaozhu">
              <img :src="heroData.avatar" :alt="heroData.name" width="96" height="96" fetchpriority="high">
            </a>
          </CardItem>
        </CardBody>
      </CardContainer>
      <h1 id="intro-title"><TextReveal>Hi，我是 <span class="hero-name">{{ heroData.name }}</span><span class="wave" aria-hidden="true">👋</span></TextReveal></h1>
      <p class="hero-description">{{ heroData.description }}</p>
      <div class="hero-links">
        <button type="button" class="theme-button theme-button--primary hero-album-link" @click="scrollToSection('#gallery')">翻翻我的相册 <ArrowUpRight :size="17" aria-hidden="true" /></button>
        <a href="https://piggy-blog.vercel.app/" class="hero-link" target="_blank" rel="noopener noreferrer">去博客坐坐</a>
      </div>
      <nav class="hero-socials" aria-label="认识我与保持联系">
        <a :href="contactInfo.github" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github :size="18" :stroke-width="1.5" /></a>
        <a :href="`mailto:${contactInfo.email}`" aria-label="给我写信"><Mail :size="18" :stroke-width="1.5" /></a>
        <a href="#reading" aria-label="看看我的书单"><BookOpen :size="18" :stroke-width="1.5" /></a>
      </nav>
    </div>
    <div class="hero-margin-note" aria-hidden="true"><span class="paper-tape" /><span>留一点位置</span><span>给生活 :)</span><svg viewBox="0 0 80 44" fill="none"><path d="M5 5 Q42 1 61 29 M48 25 L63 32 L66 17" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" /></svg></div>
    <svg class="hero-flower" viewBox="0 0 90 110" fill="none" aria-hidden="true">
      <g class="flower-soil">
        <path d="M17 104 Q27 103 34 101 Q43 98 51 101 Q62 102 73 104 Q59 109 43 108 Q28 109 17 104Z" fill="currentColor" opacity="0.12" />
        <path d="M17 104 Q27 103 34 101 Q43 98 51 101 Q62 102 73 104" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.6" />
        <g fill="currentColor" opacity="0.45">
          <circle cx="31" cy="105" r="0.55" />
          <circle cx="49" cy="106" r="0.65" />
          <circle cx="60" cy="104" r="0.45" />
        </g>
      </g>
      <g stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
        <!-- The stem meets the notch between the two lower petals. -->
        <path d="M47 57 C45 70 40 86 44 102" />
        <path d="M43 87 Q34 75 22 79 Q24 91 43 89 M44 78 Q53 65 66 69 Q62 81 44 80" />
        <path d="M44 20 C49 7 65 11 63 24 C78 20 84 40 68 44 C78 57 60 73 47 57 C37 75 19 62 24 47 C8 47 8 26 26 25 C20 9 39 4 44 20Z" />
        <circle cx="44" cy="37" r="9" />
        <path d="M40 39 Q44 44 48 39" stroke-width="1.2" />
      </g>
    </svg>
  </section>
</template>

<script setup lang="ts">
import { ArrowUpRight, BookOpen, Github, Mail } from "lucide-vue-next";
import { CardContainer, CardBody, CardItem } from "~/components/ui/card-3d";
import { TextReveal } from "~/components/ui/text-reveal";
import { heroData, contactInfo } from "~/data/staticData";
const scrollToSection = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
};
</script>

<style scoped>
.journal-hero { position: relative; padding-top: 122px; padding-bottom: 30px; }
.hero-edition { display: flex; flex-wrap: wrap; gap: var(--space-3); justify-content: space-between; color: var(--muted-foreground); font-family: var(--font-hand); font-size: 1rem; letter-spacing: 0.04em; }
.hero-intro { max-width: 760px; margin: var(--space-7) auto var(--space-8); text-align: center; }
.hero-avatar-card { padding: 0; border: 0; border-radius: 50%; background: transparent; }
.avatar-link { display: flex; padding: 5px; border: 1px solid var(--border); border-radius: 50%; background: var(--accent); }
.avatar-link img { width: 92px; height: 92px; border-radius: 50%; object-fit: cover; }
.hero-intro h1 { margin-top: var(--space-6); font-size: clamp(1.875rem, 1.25rem + 2.5vw, 3rem); font-weight: 400; line-height: 1.5; letter-spacing: -0.045em; }
.hero-intro h1 :deep(.hero-name) { color: var(--primary); font-weight: 500; }
.wave { margin-left: 10px; font-size: 0.65em; vertical-align: 4px; }
.hero-description { max-width: 30em; margin: var(--space-4) auto 0; color: var(--foreground); font-size: clamp(1.125rem, 0.875rem + 1vw, 1.625rem); line-height: 1.8; text-wrap: balance; }
.hero-links { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: var(--space-5) var(--space-6); margin-top: var(--space-6); }
.hero-album-link { min-height: 3rem; padding: var(--space-3) var(--space-5); border-radius: 0.375rem 0.625rem 0.375rem 0.5rem; box-shadow: var(--surface-shadow); }
.hero-link {
  position: relative; padding: 2px 0; border: 0; background: none;
  color: var(--muted-foreground); font: inherit; font-size: var(--text-small); letter-spacing: 0.04em;
  cursor: pointer; transition: color 200ms ease;
}
.hero-link::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 1px;
  background: currentColor; opacity: 0.32; transition: opacity 200ms ease;
}
.hero-link:hover { color: var(--primary); }
.hero-link:hover::after { opacity: 0.65; }
.hero-link:focus-visible { outline: 1px solid var(--primary); outline-offset: 4px; border-radius: 2px; }
.hero-socials { display: flex; justify-content: center; gap: var(--space-3); margin-top: var(--space-5); }
.hero-socials a { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; color: var(--muted-foreground); }
.hero-socials a:hover { color: var(--primary); background: var(--accent); }
.hero-margin-note {
  position: absolute; left: 1.5%; top: 44%; width: 132px; padding: 22px 16px 14px;
  color: var(--primary); font-size: var(--text-small); line-height: 1.8;
  background: var(--paper-yellow) var(--paper-texture);
  box-shadow: var(--surface-shadow);
  transform: rotate(-6deg);
}
.hero-margin-note > span { display: block; }
.hero-margin-note svg { width: 62px; margin: 4px 0 0 28px; }
.hero-margin-note .paper-tape { top: -10px; width: 66px; height: 20px; }
.hero-flower { position: absolute; right: 3%; bottom: 128px; width: 70px; color: var(--primary); opacity: 0.65; }
.flower-soil { color: var(--wood-fill); }
@media (max-width: 1024px) { .hero-margin-note { display: none; } }
@media (max-width: 900px) { .hero-flower { width: 48px; right: 0; bottom: 112px; } }
@media (max-width: 640px) {
  .journal-hero { padding-top: 125px; padding-bottom: 12px; }
  .hero-intro { margin: var(--space-6) auto var(--space-7); }
  .hero-intro h1 { margin-top: var(--space-5); }
  .hero-links { gap: var(--space-4) var(--space-5); }
  .hero-flower { display: none; }
}
</style>

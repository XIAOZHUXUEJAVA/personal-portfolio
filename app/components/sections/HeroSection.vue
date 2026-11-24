<template>
  <section id="hero" class="journal-hero site-container" aria-labelledby="intro-title">
    <p class="hero-edition">LIFE SCRAPBOOK <span>/ VOL. 01</span></p>
    <div class="hero-intro">
      <CardContainer class="mx-auto w-fit">
        <CardBody class="hero-avatar-card h-auto w-fit">
          <CardItem translate-z="50" class="w-full">
            <a href="#about" class="avatar-link" aria-label="认识一下 xiaozhu">
              <img :src="heroData.avatar" :alt="heroData.name" width="96" height="96" fetchpriority="high" />
            </a>
          </CardItem>
        </CardBody>
      </CardContainer>
      <h1 id="intro-title"><TextReveal>Hi，我是 <span class="hero-name">{{ heroData.name }}</span><span class="wave" aria-hidden="true">👋</span></TextReveal></h1>
      <p class="hero-description">{{ heroData.description }}</p>
      <p class="hero-subtitle">写点代码，也收集屏幕之外的小小美好。</p>
      <div class="hero-links">
        <ThemeButton variant="secondary" @click="scrollToSection('#gallery')">翻翻我的相册 <ArrowDownRight :size="16" /></ThemeButton>
        <a href="https://piggy-blog.vercel.app/" class="hero-blog" target="_blank" rel="noopener noreferrer">去博客坐坐 <ArrowUpRight :size="15" /></a>
      </div>
      <nav class="hero-socials" aria-label="认识我与保持联系">
        <a :href="contactInfo.github" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github :size="18" :stroke-width="1.5" /></a>
        <a :href="`mailto:${contactInfo.email}`" aria-label="给我写信"><Mail :size="18" :stroke-width="1.5" /></a>
        <a href="#reading" aria-label="看看我的书单"><BookOpen :size="18" :stroke-width="1.5" /></a>
      </nav>
    </div>
    <div class="hero-margin-note" aria-hidden="true"><span>留一点位置</span><span>给生活 :)</span><svg viewBox="0 0 80 44" fill="none"><path d="M5 5 Q42 1 61 29 M48 25 L63 32 L66 17" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" /></svg></div>
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
import { ArrowDownRight, ArrowUpRight, BookOpen, Github, Mail } from "lucide-vue-next";
import { CardContainer, CardBody, CardItem } from "~/components/ui/card-3d";
import { TextReveal } from "~/components/ui/text-reveal";
import { ThemeButton } from "~/components/ui/theme-button";
import { heroData, contactInfo } from "~/data/staticData";
const scrollToSection = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
};
</script>

<style scoped>
.journal-hero { position: relative; padding-top: 122px; padding-bottom: 30px; }
.hero-edition { display: flex; justify-content: space-between; color: var(--muted-foreground); font-size: 10px; letter-spacing: 0.14em; }
.hero-edition span { opacity: 0.75; }
.hero-intro { max-width: 760px; margin: 46px auto 65px; text-align: center; }
.hero-avatar-card { padding: 0; border: 0; border-radius: 50%; background: transparent; }
.avatar-link { display: flex; padding: 5px; border: 1px solid var(--border); border-radius: 50%; background: var(--accent); }
.avatar-link img { width: 92px; height: 92px; border-radius: 50%; object-fit: cover; }
.hero-intro h1 { margin-top: 28px; font-size: clamp(30px, 4vw, 46px); font-weight: 400; line-height: 1.5; letter-spacing: -0.045em; }
.hero-intro h1 :deep(.hero-name) { color: var(--primary); font-weight: 500; }
.wave { margin-left: 10px; font-size: 0.65em; vertical-align: 4px; }
.hero-description { margin-top: 16px; color: var(--foreground); font-size: clamp(19px, 2.4vw, 28px); line-height: 1.8; text-wrap: balance; }
.hero-subtitle { margin-top: 12px; color: var(--muted-foreground); font-size: 13px; }
.hero-links { display: flex; align-items: center; justify-content: center; gap: 24px; margin-top: 34px; }
.hero-blog { display: inline-flex; align-items: center; gap: 6px; color: var(--primary); font-size: 12px; }
.hero-socials { display: flex; justify-content: center; gap: 12px; margin-top: 25px; }
.hero-socials a { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; color: var(--muted-foreground); }
.hero-socials a:hover { color: var(--primary); background: var(--accent); }
.hero-margin-note { position: absolute; left: 2%; top: 48%; color: var(--primary); font-size: 11px; line-height: 2; transform: rotate(-9deg); opacity: 0.7; }
.hero-margin-note span { display: block; }
.hero-margin-note svg { width: 70px; margin-left: 25px; }
.hero-flower { position: absolute; right: 3%; bottom: 128px; width: 70px; color: var(--primary); opacity: 0.65; }
.flower-soil { color: var(--wood-fill); }
@media (max-width: 900px) { .hero-margin-note { display: none; } .hero-flower { width: 48px; right: 0; bottom: 112px; } }
@media (max-width: 640px) {
  .journal-hero { padding-top: 125px; padding-bottom: 12px; }
  .hero-intro { margin: 38px auto 44px; }
  .hero-intro h1 { margin-top: 23px; }
  .hero-subtitle { font-size: 12px; max-width: 260px; margin-inline: auto; }
  .hero-links { gap: 17px; margin-top: 26px; }
  .hero-flower { display: none; }
}
</style>

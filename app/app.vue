<template>
  <div class="site-shell">
    <a class="skip-link" href="#main-content">跳到正文</a>
    <PaperBackground />
    <ParticlesBg
      class="fixed inset-0 z-0 opacity-20 pointer-events-none"
      :quantity="60"
      :ease="50"
      :color="isDark ? '#a4afa3' : '#667066'"
      :staticity="30"
      refresh
    />
    <NavigationDock />
    <main id="main-content" class="relative z-10">
      <HeroSection />
      <AboutSection />
      <FeaturedWorksSection />
      <PhotoGallerySection />
      <GamingSection />
      <ReadingSection />
      <ContactSection />
    </main>
    <Meteors :count="20" class="relative z-0 opacity-20 pointer-events-none" />
    <footer class="site-footer site-container handdrawn-rule handdrawn-rule--top">
      <span>xiaozhu / 生活剪贴簿</span>
      <span>慢慢生活，慢慢记录。</span>
      <a href="https://piggy-blog.vercel.app/" target="_blank" rel="noopener noreferrer">去博客坐坐 ↗</a>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { ParticlesBg } from "~/components/ui/particles-bg";
import { Meteors } from "~/components/ui/meteors";
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");
import PaperBackground from "~/components/layout/PaperBackground.vue";
import NavigationDock from "~/components/layout/NavigationDock.vue";
import HeroSection from "~/components/sections/HeroSection.vue";
import AboutSection from "~/components/sections/AboutSection.vue";
import FeaturedWorksSection from "~/components/sections/FeaturedWorksSection.vue";
import PhotoGallerySection from "~/components/sections/PhotoGallerySection.vue";
import GamingSection from "~/components/sections/GamingSection.vue";
import ReadingSection from "~/components/sections/ReadingSection.vue";
import ContactSection from "~/components/sections/ContactSection.vue";

useHead({
  title: "xiaozhu · 生活剪贴簿",
  htmlAttrs: { lang: "zh-CN" },
  meta: [
    { name: "description", content: "简简单单地记录生活的滴滴点点。这里收集照片、阅读、游戏，以及屏幕之外的生活。" },
    { name: "keywords", content: "个人主页, 生活分享, 照片, 阅读, 记录" },
    { property: "og:title", content: "xiaozhu · 生活剪贴簿" },
    { property: "og:description", content: "简简单单地记录生活的滴滴点点。" },
    { property: "og:type", content: "website" },
  ],
});
</script>

<style scoped>
.skip-link { position: fixed; top: -80px; left: 20px; padding: 10px 20px; background: var(--card); z-index: 100; }
.skip-link:focus { top: 12px; }
.site-footer { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 16px; padding-block: 28px 36px; color: var(--muted-foreground); font-size: 10px; }
.site-footer a { color: var(--primary); }
@media (max-width: 640px) { .site-footer { flex-direction: column; align-items: center; gap: 8px; } }
</style>

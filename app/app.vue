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
      <HeroSection data-reveal />
      <AboutSection data-reveal />
      <FeaturedWorksSection data-reveal />
      <PhotoGallerySection data-reveal />
      <GamingSection data-reveal />
      <ReadingSection data-reveal />
      <ContactSection data-reveal />
    </main>
    <div class="meteor-layer" aria-hidden="true">
      <Meteors :count="20" class="opacity-20" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import PaperBackground from "~/components/layout/PaperBackground.vue";
import NavigationDock from "~/components/layout/NavigationDock.vue";
import HeroSection from "~/components/sections/HeroSection.vue";
import AboutSection from "~/components/sections/AboutSection.vue";
import FeaturedWorksSection from "~/components/sections/FeaturedWorksSection.vue";
import PhotoGallerySection from "~/components/sections/PhotoGallerySection.vue";
import GamingSection from "~/components/sections/GamingSection.vue";
import ReadingSection from "~/components/sections/ReadingSection.vue";
import ContactSection from "~/components/sections/ContactSection.vue";
import { ParticlesBg } from "~/components/ui/particles-bg";
import { Meteors } from "~/components/ui/meteors";
import { useScrollReveal } from "~/composables/useScrollReveal";

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

useScrollReveal();

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
.meteor-layer { position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
.skip-link { position: fixed; top: -80px; left: 20px; padding: 10px 20px; background: var(--card); z-index: 100; }
.skip-link:focus { top: 12px; }
</style>

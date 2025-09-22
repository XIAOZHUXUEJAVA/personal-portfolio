<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Navigation Dock -->
    <NavigationDock />

    <!-- Main Content -->
    <main class="relative">
      <!-- Hero Section -->
      <HeroSection />

      <!-- About Section -->
      <AboutSection />

      <!-- Featured Works Section -->
      <FeaturedWorksSection />

      <!-- Photo Gallery Section -->
      <PhotoGallerySection />

      <GamingSection />

      <!-- Reading Section -->
      <ReadingSection />

      <!-- Timeline Section -->
      <TimelineSection />

      <!-- Contact Section -->
      <ContactSection />
    </main>

    <!-- Meteors Background Effect -->
    <Meteors :number="20" />
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from "@vueuse/core";

// Components
import NavigationDock from "~/components/layout/NavigationDock.vue";
import HeroSection from "~/components/sections/HeroSection.vue";
import AboutSection from "~/components/sections/AboutSection.vue";
import FeaturedWorksSection from "~/components/sections/FeaturedWorksSection.vue";
import PhotoGallerySection from "~/components/sections/PhotoGallerySection.vue";
import ReadingSection from "~/components/sections/ReadingSection.vue";
import TimelineSection from "~/components/sections/TimelineSection.vue";
import ContactSection from "~/components/sections/ContactSection.vue";
import { Meteors } from "~/components/ui/meteors";
import GamingSection from "./components/sections/GamingSection.vue";

// SEO Meta
useHead({
  title: "个人主页 - xiaozhu",
  meta: [
    {
      name: "description",
      content: "欢迎来到我的个人主页，在这里分享生活、照片、感悟和记录。",
    },
    { name: "keywords", content: "个人主页, 生活分享, 照片, 感悟, 记录" },
    { property: "og:title", content: "个人主页 - 分享生活的美好时光" },
    {
      property: "og:description",
      content: "欢迎来到我的个人主页，在这里分享生活、照片、感悟和记录。",
    },
    { property: "og:type", content: "website" },
  ],
});

// Color mode setup
const colorMode = useColorMode();
</script>

<style>
html {
  scroll-behavior: smooth;
}

body {
  font-family: "LXGW WenKai", "Inter", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, sans-serif;
}
</style>

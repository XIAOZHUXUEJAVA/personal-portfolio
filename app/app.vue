<template>
  <div class="relative min-h-screen bg-background text-foreground">
    <!-- Very Light Gradient Background -->
    <div class="fixed inset-0 bg-gradient-to-br from-green-100/20 via-orange-100/15 to-yellow-100/20 pointer-events-none z-0"/>
    
    <!-- Global Particles Background -->
    <ParticlesBg
      class="fixed inset-0 z-10"
      :quantity="60"
      :ease="50"
      :color="isDark ? '#ffffff' : '#000000'"
      :staticity="30"
      refresh
    />

    <!-- Navigation Dock -->
    <NavigationDock class="z-20" />

    <!-- Main Content -->
    <main class="relative z-10">
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
    <Meteors :number="20" class="relative z-5" />
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
import { ParticlesBg } from "~/components/ui/particles-bg";
import GamingSection from "./components/sections/GamingSection.vue";

// Color mode setup
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

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

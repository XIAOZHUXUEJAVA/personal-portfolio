<template>
  <div>
    <!-- Hero Section -->
    <HeroSection />

    <!-- About Section -->
    <AboutSection />

    <!-- Featured Works Section -->
    <FeaturedWorksSection />

    <!-- Photo Gallery Section -->
    <PhotoGallerySection />

    <!-- Reading Section -->
    <ReadingSection />

    <!-- Timeline Section -->
    <TimelineSection />

    <!-- Contact Section -->
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
// Import components
import HeroSection from "~/components/sections/HeroSection.vue";
import AboutSection from "~/components/sections/AboutSection.vue";
import FeaturedWorksSection from "~/components/sections/FeaturedWorksSection.vue";
import PhotoGallerySection from "~/components/sections/PhotoGallerySection.vue";
import ReadingSection from "~/components/sections/ReadingSection.vue";
import TimelineSection from "~/components/sections/TimelineSection.vue";
import ContactSection from "~/components/sections/ContactSection.vue";

// SEO Meta
useHead({
  title: "我的个人网站 - 摄影作品集",
  meta: [
    {
      name: "description",
      content:
        "欢迎来到我的个人网站，这里展示了我的摄影作品、生活记录和个人故事。",
    },
    {
      property: "og:title",
      content: "我的个人网站 - 摄影作品集",
    },
    {
      property: "og:description",
      content:
        "欢迎来到我的个人网站，这里展示了我的摄影作品、生活记录和个人故事。",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
});
</script>

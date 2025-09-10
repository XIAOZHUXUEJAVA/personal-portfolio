<template>
  <section id="gallery" class="py-20 px-6 bg-muted/30">
    <div class="max-w-7xl mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">照片画廊</h2>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
          用镜头记录生活的美好瞬间，每一张照片都有它独特的故事
        </p>
      </div>

      <!-- Gallery Tabs -->
      <div class="flex justify-center mb-12">
        <div
          class="flex space-x-2 bg-background/50 backdrop-blur-sm rounded-full p-1 border border-border/50"
        >
          <button
            v-for="category in categories"
            :key="category"
            :class="[
              'px-6 py-2 rounded-full transition-all duration-300',
              activeCategory === category
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'text-muted-foreground hover:text-foreground',
            ]"
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Photo Gallery Component -->
      <div class="mb-12">
        <PhotoGallery :items="filteredPhotos" />
      </div>

      <!-- Expandable Gallery -->
      <div class="mt-16">
        <h3 class="text-2xl font-bold text-center mb-8">精选作品</h3>
        <ExpandableGallery :images="featuredImages" />
      </div>

      <!-- Featured Photos Grid -->
      <div class="mt-20">
        <h3 class="text-2xl font-bold text-center mb-8">精选作品</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(photo, index) in photoGalleryData.slice(0, 6)"
            :key="photo.src"
            class="group relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:shadow-2xl transition-all duration-300"
          >
            <div class="aspect-[4/3] overflow-hidden">
              <img
                :src="photo.src"
                :alt="photo.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div class="p-6 space-y-3">
              <h4 class="text-xl font-semibold">{{ photo.title }}</h4>
              <p class="text-muted-foreground text-sm">
                {{ photo.description }}
              </p>
              <span
                class="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {{ photo.category }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PhotoGallery } from "~/components/ui/photo-gallery";
import { ExpandableGallery } from "~/components/ui/expandable-gallery";
import { photoGalleryData } from "~/data/staticData";

// Categories for filtering
const categories = ["全部", "风景", "城市", "自然", "生活"];
const activeCategory = ref("全部");

// Filtered photos based on active category
const filteredPhotos = computed(() => {
  if (activeCategory.value === "全部") {
    return photoGalleryData.map((photo) => ({ src: photo.src }));
  }
  return photoGalleryData
    .filter((photo) => photo.category === activeCategory.value)
    .map((photo) => ({ src: photo.src }));
});

// Featured images for expandable gallery
const featuredImages = computed(() => {
  return photoGalleryData.slice(0, 4).map((photo) => photo.src);
});
</script>

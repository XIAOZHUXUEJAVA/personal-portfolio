<template>
  <section id="about" class="py-20 px-6">
    <div class="max-w-6xl mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">关于我</h2>
        <!-- <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
          分享我的故事、兴趣和人生感悟
        </p> -->
      </div>

      <!-- About Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CardSpotlight
          v-for="(item, index) in aboutData"
          :key="index"
          :gradient-size="300"
          :gradient-color="item.gradientColor"
          :gradient-opacity="0.6"
          class="p-8 rounded-2xl border border-green-200/40 bg-gradient-to-br from-green-50/80 via-yellow-50/70 to-orange-50/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <div
                class="p-3 rounded-full bg-gradient-to-br from-green-100/80 to-yellow-100/80 shadow-md"
              >
                <component
                  :is="getIcon(item.icon)"
                  class="h-6 w-6 text-green-600"
                />
              </div>
              <h3 class="text-xl font-semibold">{{ item.title }}</h3>
            </div>

            <p class="text-muted-foreground leading-relaxed">
              {{ item.description }}
            </p>

            <!-- Skills/Tags -->
            <div v-if="item.tags" class="flex flex-wrap gap-2">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="px-3 py-1 text-sm bg-gradient-to-r from-green-100/70 to-yellow-100/70 rounded-full text-green-700 border border-green-200/50 shadow-sm"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </CardSpotlight>
      </div>

      <!-- Personal Quote -->
      <div class="mt-16 text-center">
        <blockquote
          class="text-2xl md:text-3xl font-medium italic text-muted-foreground max-w-3xl mx-auto"
        >
          "{{ currentQuote }}"
        </blockquote>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Camera, Palette, BookOpen } from "lucide-vue-next";
import { CardSpotlight } from "~/components/ui/card-spotlight";
import { aboutData, inspirationalQuotes } from "~/data/staticData";

// Icon mapping
const iconMap = {
  Camera,
  Palette,
  BookOpen,
};

const getIcon = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || Camera;
};

// Random quote selection
const currentQuote = ref<string>("");

onMounted(() => {
  if (inspirationalQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * inspirationalQuotes.length);
    currentQuote.value = inspirationalQuotes[randomIndex];
  }
});
</script>

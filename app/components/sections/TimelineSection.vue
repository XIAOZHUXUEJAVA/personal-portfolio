<template>
  <section id="timeline" class="py-20 px-6">
    <div class="max-w-4xl mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">时间线</h2>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
          记录生活中的重要时刻和美好回忆
        </p>
      </div>

      <!-- Timeline Component -->
      <Timeline
        :items="timelineItems"
        title="我的生活记录"
        description="每一个时刻都值得被记住"
        class="mb-16"
      />

      <!-- Detailed Timeline Cards -->
      <div class="mt-20">
        <h3 class="text-2xl font-bold text-center mb-12">详细时间线</h3>
        <div class="space-y-8">
          <div
            v-for="(item, index) in timelineData"
            :key="item.id"
            class="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-8 hover:shadow-xl transition-all duration-300"
          >
            <div class="flex flex-col md:flex-row gap-6">
              <!-- Image -->
              <div v-if="item.image" class="md:w-1/3">
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-full h-48 object-cover rounded-xl hover:scale-105 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer"
                />
              </div>

              <!-- Content -->
              <div class="flex-1 space-y-4">
                <div class="flex items-center space-x-3">
                  <span
                    class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {{ item.date }}
                  </span>
                </div>

                <h4 class="text-2xl font-bold">{{ item.title }}</h4>

                <p class="text-muted-foreground leading-relaxed">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Timeline } from "~/components/ui/timeline";
import { timelineData } from "~/data/staticData";

// Transform timeline data for Timeline component
const timelineItems = computed(() => {
  return timelineData.map((item) => ({
    id: item.id,
    label: item.label,
  }));
});
</script>

<template>
  <div
    class="group relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-8 hover:shadow-xl transition-all duration-300 cursor-pointer"
    @click="handleClick"
  >
    <!-- Timeline connector line for visual continuity -->
    <div
      v-if="index > 0"
      class="absolute -top-10 left-1/2 w-px h-10 bg-gradient-to-b from-border/50 to-transparent transform -translate-x-1/2"
    />

    <!-- Card content -->
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Image section -->
      <div v-if="item.image" class="md:w-1/3">
        <div class="relative overflow-hidden rounded-xl">
          <img
            :src="item.image"
            :alt="item.title"
            class="w-full h-48 object-cover transition-all duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <!-- Image overlay on hover -->
          <div
            class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </div>

      <!-- Content section -->
      <div class="flex-1 space-y-4">
        <!-- Date badge -->
        <div class="flex items-center space-x-3">
          <span
            class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
          >
            {{ item.date }}
          </span>
          <!-- Optional status indicator -->
          <div class="w-2 h-2 bg-primary rounded-full animate-pulse" />
        </div>

        <!-- Title -->
        <h4
          class="text-2xl font-bold group-hover:text-primary transition-colors duration-300"
        >
          {{ item.title }}
        </h4>

        <!-- Description -->
        <p class="text-muted-foreground leading-relaxed">
          {{ item.description }}
        </p>

        <!-- Interactive elements -->
        <div class="flex items-center justify-between pt-4">
          <!-- Tags or categories if available -->
          <div class="flex items-center space-x-2">
            <span class="text-xs text-muted-foreground">{{ item.label }}</span>
          </div>

          <!-- Action button -->
          <button
            class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary hover:text-primary/80 text-sm font-medium"
            @click.stop="handleViewMore"
          >
            查看详情 →
          </button>
        </div>
      </div>
    </div>

    <!-- Decorative elements -->
    <div
      class="absolute -inset-px bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
    />
  </div>
</template>

<script setup lang="ts">
import type { TimelineItem } from "~/data/staticData";

interface Props {
  item: TimelineItem;
  index: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  click: [itemId: string];
  viewMore: [item: TimelineItem];
}>();

const handleClick = () => {
  emit("click", props.item.id);
};

const handleViewMore = () => {
  emit("viewMore", props.item);
};
</script>

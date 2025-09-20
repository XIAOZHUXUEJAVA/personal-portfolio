<template>
  <section id="timeline" class="py-20 px-6">
    <div class="max-w-7xl mx-auto">
      <!-- Timeline Component with Custom Content -->
      <Timeline
        :items="timelineItems"
        title="Timeline"
        description="时间过得好快"
        class="mb-16"
      >
        <!-- Custom content for each timeline item -->
        <template v-for="item in timelineData" :key="item.id" #[item.id]>
          <div class="relative ml-8 pb-20">
            <TimelineCard
              :item="item"
              :index="timelineData.findIndex((t) => t.id === item.id)"
              @click="handleTimelineItemClick"
              @view-more="handleViewMore"
            />
          </div>
        </template>
      </Timeline>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Timeline } from "~/components/ui/timeline";
import TimelineCard from "~/components/ui/timeline/TimelineCard.vue";
import { timelineData, type TimelineItem } from "~/data/staticData";

// Transform timeline data for Timeline component
const timelineItems = computed(() => {
  return timelineData.map((item) => ({
    id: item.id,
    label: item.label,
  }));
});

// Handle timeline item click
const handleTimelineItemClick = (itemId: string) => {
  console.log("Timeline item clicked:", itemId);
  // Add your click handling logic here
  // For example, scroll to item or show modal
};

// Handle view more action
const handleViewMore = (item: TimelineItem) => {
  console.log("View more for item:", item);
  // Add your view more logic here
  // For example, open modal with detailed information
};
</script>

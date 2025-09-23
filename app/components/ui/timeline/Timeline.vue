<template>
  <div
    ref="timelineContainerRef"
    class="w-full bg-transparent font-sans md:px-10"
  >
    <div class="mx-auto max-w-7xl px-4 py-5 lg:px-10 md:px-8">
      <div class="text-center mb-1">
        <h2
          class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-green-500 to-yellow-500 bg-clip-text text-transparent"
        >
          {{ title }}
        </h2>
        <p
          v-if="description"
          class="text-xl text-green-600/80 max-w-2xl mx-auto dark:text-green-400/80"
        >
          {{ description }}
        </p>
      </div>
    </div>

    <div ref="timelineRef" class="relative z-0 mx-auto max-w-7xl pb-20">
      <div
        v-for="(item, index) in props.items"
        :key="item.id + index"
        class="flex justify-start pt-10 md:gap-10 md:pt-40"
      >
        <div
          class="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start lg:max-w-sm md:w-full md:flex-row"
        >
          <div
            class="absolute left-3 flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-yellow-100 shadow-md md:left-3 dark:bg-gradient-to-br dark:from-green-800 dark:to-yellow-800"
          >
            <div
              class="size-4 rounded-full border border-green-300 bg-green-200 p-2 dark:border-green-600 dark:bg-green-700"
            />
          </div>
          <h3
            class="hidden text-xl font-bold text-green-500/70 md:block md:pl-20 md:text-5xl dark:text-green-400/70"
          >
            {{ item.label }}
          </h3>
        </div>
        <slot :name="item.id" />
      </div>
      <div
        :style="{
          height: height + 'px',
        }"
        class="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% via-green-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8 dark:via-green-700"
      >
        <Motion
          as="div"
          :style="{
            height: heightTransform,
            opacity: opacityTransform,
          }"
          class="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-green-500 from-0% via-yellow-500 via-10% to-orange-400 to-20% to-transparent"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Motion, useScroll, useTransform } from "motion-v";
import type { HTMLAttributes } from "vue";

interface Props {
  containerClass?: HTMLAttributes["class"];
  class?: HTMLAttributes["class"];
  items?: {
    id: string;
    label: string;
  }[];
  title?: string;
  description?: string;
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
});

const timelineContainerRef = ref<HTMLElement | null>(null);
const timelineRef = ref<HTMLElement | null>(null);
const height = ref(0);

onMounted(async () => {
  await nextTick();
  if (timelineRef.value) {
    const rect = timelineRef.value.getBoundingClientRect();
    height.value = rect.height;
  }
});

const { scrollYProgress } = useScroll({
  target: timelineRef,
  offset: ["start 10%", "end 50%"],
});

const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
const heightTransform = ref(useTransform(scrollYProgress, [0, 1], [0, 0]));

watch(height, (newHeight) => {
  heightTransform.value = useTransform(scrollYProgress, [0, 1], [0, newHeight]);
});
</script>

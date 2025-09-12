<template>
  <div
    class="gallery"
    :class="cn('mb-[var(--size)] grid grid-cols-6 gap-1', props.containerClass)"
  >
    <div
      v-for="(image, index) in props.items"
      :key="index"
      class="gallery-item"
      :class="
        cn(
          'size-[calc(var(--size)*2)] rounded overflow-hidden transition-[clip-path,filter] duration-300 will-change-transform',
          props.class
        )
      "
    >
      <NuxtImg
        :src="image.src"
        :alt="`image+${index}`"
        class="gallery-img w-full h-full object-cover"
        loading="lazy"
        :placeholder="[40, 40, 75, 5]"
        format="webp"
        quality="80"
        sizes="sm:200px md:300px lg:400px"
        preload
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
  containerClass?: string;
  class?: string;
  items: {
    src: string;
  }[];
}
const props = defineProps<Props>();
</script>

<style scoped>
.gallery {
  --size: 100px;
  grid-auto-rows: var(--size);
  transform: translateZ(0); /* 启用硬件加速 */

  &:has(:hover) .gallery-item:not(:hover),
  &:has(:focus) .gallery-item:not(:focus) {
    filter: brightness(0.5) contrast(0.5);
    transition: filter 0.3s ease;
  }

  .gallery-item {
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    grid-column: auto / span 2;
    transform: translateZ(0); /* 启用硬件加速 */
    backface-visibility: hidden; /* 优化渲染 */

    &:nth-child(5n-1) {
      grid-column: 2 / span 2;
    }

    &:hover,
    &:focus {
      clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 0);
      z-index: 1;
      transition: clip-path 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        filter 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      filter: saturate(150%) brightness(1.1);
      transform: translateZ(0) scale(1.02);
    }

    &:focus {
      outline: 3px solid rgba(59, 130, 246, 0.5);
      outline-offset: 2px;
    }

    .gallery-img {
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: transform;
    }

    &:hover .gallery-img {
      transform: scale(1.05);
    }
  }
}

/* 响应式优化 */
@media (max-width: 768px) {
  .gallery {
    --size: 80px;
    grid-cols: 4;
  }
}

@media (max-width: 480px) {
  .gallery {
    --size: 60px;
    grid-cols: 3;
  }
}
</style>

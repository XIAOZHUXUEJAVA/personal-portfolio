<template>
  <!-- 点击切换翻转状态：兼容移动端（触摸设备上 Tailwind v4 的 hover 变体不生效） -->
  <div
    :class="cn('group h-72 w-56 cursor-pointer [perspective:1000px]', props.class)"
    @click="isFlipped = !isFlipped"
  >
    <div
      :class="
        cn(
          'relative h-full rounded-2xl transition-all duration-500 [transform-style:preserve-3d]',
          rotation[0],
          isFlipped && rotation[1]
        )
      "
    >
      <!-- Front -->
      <div
        class="absolute size-full overflow-hidden rounded-2xl border [backface-visibility:hidden]"
      >
        <slot />
      </div>

      <!-- Back：只保留结构样式，背景由插槽内容自行提供，避免双层半透明叠加导致发雾 -->
      <div
        :class="
          cn(
            'absolute h-full w-full overflow-hidden rounded-2xl border [backface-visibility:hidden]',
            rotation[1]
          )
        "
      >
        <slot name="back" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";
import { computed, ref } from "vue";

interface FlipCardProps {
  rotate?: "x" | "y";
  class?: string;
}

const props = withDefaults(defineProps<FlipCardProps>(), {
  rotate: "y",
});

// 点击翻转状态（移动端唯一的翻转途径，桌面端与 hover 共存）
const isFlipped = ref(false);
const rotationClass = {
  x: ["group-hover:[transform:rotateX(180deg)]", "[transform:rotateX(180deg)]"],
  y: ["group-hover:[transform:rotateY(180deg)]", "[transform:rotateY(180deg)]"],
};

const rotation = computed(() => rotationClass[props.rotate]);
</script>

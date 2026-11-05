<template>
  <component
    :is="as"
    :type="as === 'button' ? type : undefined"
    :class="cn('theme-button', `theme-button--${variant}`, props.class)"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

const props = withDefaults(defineProps<{
  as?: "button" | "a";
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "ghost";
  class?: HTMLAttributes["class"];
}>(), {
  as: "button",
  type: "button",
  variant: "primary",
});
</script>

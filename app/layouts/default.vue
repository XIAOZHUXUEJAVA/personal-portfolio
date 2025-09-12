<template>
  <div class="min-h-screen bg-background text-foreground">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Global layout setup
useHead({
  htmlAttrs: {
    lang: "zh-CN",
  },
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
});
</script>

<style>
html {
  scroll-behavior: smooth;
}

body {
  font-family: "LXGW WenKai", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
}
</style>

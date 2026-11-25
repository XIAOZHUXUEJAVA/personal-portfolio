<template>
  <nav class="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50" aria-label="页面导航">
    <Dock
      direction="middle"
      class="paper-dock bg-transparent backdrop-blur-none border-0 rounded-full px-2 shadow-none"
    >
      <DockIcon
        v-for="item in navigationItems"
        :key="item.id"
        class="dock-icon cursor-pointer text-muted-foreground hover:text-primary hover:bg-accent transition-colors duration-200"
        :class="{ 'is-active': activeId === item.id }"
        :aria-current="activeId === item.id ? 'page' : undefined"
        @click="scrollToSection(item.href, item.id)"
      >
        <component
          :is="item.icon"
          class="h-4 w-4 sm:h-5 sm:w-5 transition-colors"
        />
        <span class="sr-only">{{ item.label }}</span>
      </DockIcon>

      <DockSeparator />

      <DockIcon class="cursor-pointer text-muted-foreground hover:text-primary hover:bg-accent transition-colors duration-200" @click="toggleColorMode">
        <Sun
          v-if="isDark"
          class="h-4 w-4 sm:h-5 sm:w-5 transition-colors"
        />
        <Moon
          v-else
          class="h-4 w-4 sm:h-5 sm:w-5 transition-colors"
        />
      </DockIcon>
    </Dock>
  </nav>
</template>

<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import {
  Home,
  User,
  Briefcase,
  Camera,
  Mail,
  Sun,
  Moon,
} from "lucide-vue-next";
import { Dock, DockIcon, DockSeparator } from "~/components/ui/dock";

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

const navigationItems = [
  { id: "home", label: "首页", href: "#hero", icon: Home },
  { id: "about", label: "关于", href: "#about", icon: User },
  { id: "works", label: "作品", href: "#featured-works", icon: Briefcase },
  { id: "gallery", label: "照片", href: "#gallery", icon: Camera },
  { id: "contact", label: "联系", href: "#contact", icon: Mail },
];

// 游戏和书单不在 Dock 里，经过这两个区块时暂时不高亮任何图标。
const scrollTargets = [
  { id: "home", href: "#hero" },
  { id: "about", href: "#about" },
  { id: "works", href: "#featured-works" },
  { id: "gallery", href: "#gallery" },
  { id: "", href: "#gaming" },
  { id: "", href: "#reading" },
  { id: "contact", href: "#contact" },
];

const activeId = ref("home");
let frame = 0;

const updateActive = () => {
  const marker = window.innerHeight * 0.35;
  let current = scrollTargets[0].id;
  for (const target of scrollTargets) {
    const element = document.querySelector<HTMLElement>(target.href);
    if (element && element.getBoundingClientRect().top <= marker) {
      current = target.id;
    }
  }
  activeId.value = current;
};

const scheduleActiveUpdate = () => {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(updateActive);
};

const scrollToSection = (href: string, id: string) => {
  activeId.value = id;
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
  document.querySelector(href)?.scrollIntoView({ behavior });
};

onMounted(() => {
  updateActive();
  window.addEventListener("scroll", scheduleActiveUpdate, { passive: true });
  window.addEventListener("resize", scheduleActiveUpdate);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  window.removeEventListener("scroll", scheduleActiveUpdate);
  window.removeEventListener("resize", scheduleActiveUpdate);
});

const toggleColorMode = () => {
  colorMode.value = colorMode.value === "dark" ? "light" : "dark";
};
</script>

<style scoped>
/* Shape only the paper backing so magnified Dock icons remain free to overflow. */
.paper-dock { position: relative; z-index: 0; background: transparent; border: 0; box-shadow: none; backdrop-filter: none; }
.paper-dock::before,
.paper-dock::after {
  content: ""; position: absolute; pointer-events: none; border-radius: 24px;
  mask-image: var(--paper-mask); mask-size: var(--paper-mask-size);
  mask-position: var(--paper-mask-position); mask-repeat: var(--paper-mask-repeat);
}
.paper-dock::before { inset: 0; z-index: -1; background: var(--card) url('/paper/article-paper-texture.svg'); }
.paper-dock::after { inset: 3px 4px -2px 4px; z-index: -2; background: var(--paper-back) url('/paper/nav-paper-texture.svg'); }
.dock-icon.is-active {
  color: var(--primary);
  background: var(--accent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary) 22%, transparent);
}
</style>

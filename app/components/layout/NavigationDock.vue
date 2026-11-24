<template>
  <div class="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50">
    <Dock
      direction="middle"
      class="paper-dock bg-transparent backdrop-blur-none border-0 rounded-full px-2 shadow-none"
    >
      <DockIcon
        v-for="item in navigationItems"
        :key="item.id"
        class="cursor-pointer text-muted-foreground hover:text-primary hover:bg-accent transition-colors duration-200"
        @click="scrollToSection(item.href)"
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
  </div>
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

const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

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
</style>

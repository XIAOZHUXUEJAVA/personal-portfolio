<template>
  <div class="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
    <Dock
      direction="middle"
      class="bg-gradient-to-r from-green-50/90 via-yellow-50/90 to-orange-50/90 backdrop-blur-md border border-green-200/60 rounded-full px-2 shadow-lg shadow-green-100/50 dark:from-green-950/80 dark:via-yellow-950/80 dark:to-orange-950/80 dark:border-green-700/40 dark:shadow-green-900/30"
    >
      <DockIcon
        v-for="item in navigationItems"
        :key="item.id"
        class="cursor-pointer transition-all duration-300 hover:scale-110"
        @click="scrollToSection(item.href)"
      >
        <component
          :is="item.icon"
          class="h-5 w-5 text-green-600/80 hover:text-green-700 transition-colors dark:text-green-400/80 dark:hover:text-green-300"
        />
        <span class="sr-only">{{ item.label }}</span>
      </DockIcon>

      <DockSeparator />

      <DockIcon class="cursor-pointer" @click="toggleColorMode">
        <Sun
          v-if="isDark"
          class="h-5 w-5 text-yellow-600/80 hover:text-yellow-700 transition-colors dark:text-yellow-400/80 dark:hover:text-yellow-300"
        />
        <Moon
          v-else
          class="h-5 w-5 text-orange-600/80 hover:text-orange-700 transition-colors dark:text-orange-400/80 dark:hover:text-orange-300"
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
  Clock,
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
  { id: "timeline", label: "时间线", href: "#timeline", icon: Clock },
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

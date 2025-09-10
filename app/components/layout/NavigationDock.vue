<template>
  <div class="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
    <Dock
      direction="middle"
      class="bg-background/80 backdrop-blur-md border border-border/50 rounded-full px-2"
    >
      <DockIcon
        v-for="item in navigationItems"
        :key="item.id"
        class="cursor-pointer transition-all duration-300 hover:scale-110"
        @click="scrollToSection(item.href)"
      >
        <component
          :is="item.icon"
          class="h-5 w-5 text-foreground/70 hover:text-foreground transition-colors"
        />
        <span class="sr-only">{{ item.label }}</span>
      </DockIcon>

      <DockSeparator />

      <DockIcon class="cursor-pointer" @click="toggleColorMode">
        <Sun
          v-if="isDark"
          class="h-5 w-5 text-foreground/70 hover:text-foreground transition-colors"
        />
        <Moon
          v-else
          class="h-5 w-5 text-foreground/70 hover:text-foreground transition-colors"
        />
      </DockIcon>
    </Dock>
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { Home, User, Camera, Clock, Mail, Sun, Moon } from "lucide-vue-next";
import { Dock, DockIcon, DockSeparator } from "~/components/ui/dock";

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

const navigationItems = [
  { id: "home", label: "首页", href: "#hero", icon: Home },
  { id: "about", label: "关于", href: "#about", icon: User },
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

<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center justify-center overflow-hidden"
  >
    <!-- Particles Background -->
    <ParticlesBg
      class="absolute inset-0"
      :quantity="80"
      :ease="50"
      :color="isDark ? '#ffffff' : '#000000'"
      :staticity="30"
      refresh
    />

    <!-- Hero Content -->
    <div class="relative z-10 text-center max-w-4xl mx-auto px-6">
      <div class="space-y-8">
        <!-- Avatar with 3D Card Effect -->
        <CardContainer class="mx-auto w-fit">
          <CardBody
            class="relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] border-transparent border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-6 border"
          >
            <CardItem translate-z="50" class="w-full">
              <img
                :src="heroData.avatar"
                :alt="heroData.name"
                class="h-32 w-32 object-cover rounded-full mx-auto border-4 border-white/20"
              />
            </CardItem>
          </CardBody>
        </CardContainer>

        <!-- Name and Title with Text Reveal -->
        <div class="space-y-4">
          <TextReveal
            :text="heroData.name"
            class="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          />

          <p
            class="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {{ heroData.description }}
          </p>
        </div>

        <!-- CTA Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <RainbowButton class="px-8 py-3" @click="scrollToSection('#about')">
            了解更多
          </RainbowButton>

          <button
            class="px-8 py-3 rounded-full border border-border bg-background/50 backdrop-blur-sm hover:bg-accent transition-colors"
            @click="scrollToSection('#gallery')"
          >
            查看作品
          </button>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
    >
      <ChevronDown class="h-6 w-6 text-muted-foreground" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { ChevronDown } from "lucide-vue-next";
import { ParticlesBg } from "~/components/ui/particles-bg";
import { CardContainer, CardBody, CardItem } from "~/components/ui/card-3d";
import { TextReveal } from "~/components/ui/text-reveal";
import { RainbowButton } from "~/components/ui/rainbow-button";
import { heroData } from "~/data/staticData";

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

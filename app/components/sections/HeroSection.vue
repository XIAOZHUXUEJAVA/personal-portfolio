<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center justify-center overflow-hidden"
  >
    <!-- Hero Content -->
    <div class="relative z-10 text-center max-w-4xl mx-auto px-6">
      <div class="space-y-8">
        <!-- Avatar with 3D Card Effect -->
        <CardContainer class="mx-auto w-fit">
          <CardBody
            class="relative group/card bg-card/60 border-border shadow-sm w-auto sm:w-[20rem] h-auto rounded-xl p-6 border"
          >
            <CardItem translate-z="50" class="w-full">
              <img
                :src="heroData.avatar"
                :alt="heroData.name"
                class="h-32 w-32 object-cover rounded-full mx-auto border-4 border-card"
              />
            </CardItem>
          </CardBody>
        </CardContainer>

        <!-- Name and Title with Text Reveal -->
        <div class="space-y-4">
          <TextReveal
            class="text-5xl md:text-7xl font-bold text-foreground"
          >
            {{ heroData.name }}
          </TextReveal>

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
          <ThemeButton class="px-8 py-3" @click="scrollToSection('#about')">
            了解更多
          </ThemeButton>
          <ThemeButton variant="secondary" class="px-8 py-3" @click="scrollToSection('#gallery')">
            点点滴滴
          </ThemeButton>
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
import { ChevronDown } from "lucide-vue-next";
import { CardContainer, CardBody, CardItem } from "~/components/ui/card-3d";
import { TextReveal } from "~/components/ui/text-reveal";
import { ThemeButton } from "~/components/ui/theme-button";
import { heroData } from "~/data/staticData";

const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

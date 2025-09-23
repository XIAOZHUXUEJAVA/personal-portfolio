<template>
  <section id="contact" class="py-20 px-6">
    <div class="max-w-4xl mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">联系我</h2>
        <!-- <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
          很高兴认识你，让我们一起分享生活的美好
        </p> -->
      </div>

      <!-- Contact Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <!-- Email Card -->
        <CardSpotlight
          :gradient-size="250"
          gradient-color="#3b82f6"
          :gradient-opacity="0.5"
          class="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm h-64 flex items-center justify-center"
        >
          <div class="text-center space-y-4">
            <div class="p-4 rounded-full bg-blue-500/10 w-fit mx-auto">
              <Mail class="h-8 w-8 text-blue-500" />
            </div>
            <h3 class="text-xl font-semibold">邮箱联系</h3>
            <p class="text-muted-foreground">
              有任何问题或想法，欢迎通过邮箱与我联系
            </p>
            <a
              :href="`mailto:${contactInfo.email}`"
              class="inline-block px-6 py-2 bg-blue-500/10 text-blue-500 rounded-full hover:bg-blue-500/20 transition-colors"
            >
              {{ contactInfo.email }}
            </a>
          </div>
        </CardSpotlight>

        <!-- GitHub Card -->
        <CardSpotlight
          :gradient-size="250"
          gradient-color="#6b7280"
          :gradient-opacity="0.5"
          class="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm h-64 flex items-center justify-center"
        >
          <div class="text-center space-y-4">
            <div class="p-4 rounded-full bg-gray-500/10 w-fit mx-auto">
              <Github class="h-8 w-8 text-gray-500" />
            </div>
            <h3 class="text-xl font-semibold">GitHub</h3>
            <p class="text-muted-foreground">查看我的代码仓库和开源项目</p>
            <a
              :href="contactInfo.github"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block px-6 py-2 bg-gray-500/10 text-gray-500 rounded-full hover:bg-gray-500/20 transition-colors"
            >
              访问 GitHub
            </a>
          </div>
        </CardSpotlight>
      </div>

      <!-- Call to Action -->
      <div class="text-center">
        <div class="space-y-6">
          <!-- <h3 class="text-2xl font-bold">让我们保持联系</h3>
          <p class="text-muted-foreground max-w-2xl mx-auto">
            如果你喜欢我的作品或想要交流摄影心得，随时欢迎与我联系。
            我很乐意与志同道合的朋友分享经验和想法。
          </p> -->
          <RainbowButton class="px-8 py-3" @click="scrollToTop">
            回到顶部
          </RainbowButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Mail, Github } from "lucide-vue-next";
import { CardSpotlight } from "~/components/ui/card-spotlight";
import { RainbowButton } from "~/components/ui/rainbow-button";
import { contactInfo } from "~/data/staticData";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

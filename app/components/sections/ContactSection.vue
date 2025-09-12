<template>
  <section id="contact" class="py-20 px-6 bg-muted/30">
    <div class="max-w-4xl mx-auto">
      <!-- Section Title -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">联系我</h2>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
          很高兴认识你，让我们一起分享生活的美好
        </p>
      </div>

      <!-- Contact Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <!-- Email Card -->
        <CardSpotlight
          :gradient-size="250"
          gradient-color="#3b82f6"
          :gradient-opacity="0.5"
          class="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
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

        <!-- Social Media Card -->
        <CardSpotlight
          :gradient-size="250"
          gradient-color="#8b5cf6"
          :gradient-opacity="0.5"
          class="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
        >
          <div class="text-center space-y-4">
            <div class="p-4 rounded-full bg-purple-500/10 w-fit mx-auto">
              <Share2 class="h-8 w-8 text-purple-500" />
            </div>
            <h3 class="text-xl font-semibold">社交媒体</h3>
            <p class="text-muted-foreground">关注我的社交媒体，获取最新动态</p>
            <div class="flex justify-center space-x-4">
              <a
                :href="contactInfo.github"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2 rounded-full bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 transition-colors"
              >
                <Github class="h-5 w-5" />
              </a>
              <!-- <a
                :href="contactInfo.twitter"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2 rounded-full bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-colors"
              >
                <Twitter class="h-5 w-5" />
              </a>
              <a
                :href="contactInfo.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2 rounded-full bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 transition-colors"
              >
                <Linkedin class="h-5 w-5" />
              </a> -->
            </div>
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
import { Mail, Share2, Github, Twitter, Linkedin } from "lucide-vue-next";
import { CardSpotlight } from "~/components/ui/card-spotlight";
import { RainbowButton } from "~/components/ui/rainbow-button";
import { contactInfo } from "~/data/staticData";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

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
          gradient-color="rgba(34, 197, 94, 0.4)"
          :gradient-opacity="0.6"
          class="p-8 rounded-2xl border border-green-200/40 bg-gradient-to-br from-green-50/80 via-yellow-50/70 to-orange-50/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 h-64 flex items-center justify-center"
        >
          <div class="text-center space-y-4">
            <div
              class="p-4 rounded-full bg-gradient-to-br from-green-100/80 to-yellow-100/80 shadow-md w-fit mx-auto"
            >
              <Mail class="h-8 w-8 text-green-600" />
            </div>
            <h3 class="text-xl font-semibold">邮箱联系</h3>
            <p class="text-muted-foreground">
              有任何问题或想法，欢迎通过邮箱与我联系
            </p>
            <a
              :href="`mailto:${contactInfo.email}`"
              class="inline-block px-6 py-2 bg-gradient-to-r from-green-100/70 to-yellow-100/70 text-green-700 rounded-full hover:from-green-200/80 hover:to-yellow-200/80 transition-all duration-300 border border-green-200/50 shadow-sm"
            >
              {{ contactInfo.email }}
            </a>
          </div>
        </CardSpotlight>

        <!-- GitHub Card -->
        <CardSpotlight
          :gradient-size="250"
          gradient-color="rgba(251, 191, 36, 0.4)"
          :gradient-opacity="0.6"
          class="p-8 rounded-2xl border border-yellow-200/40 bg-gradient-to-br from-yellow-50/80 via-orange-50/70 to-green-50/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 h-64 flex items-center justify-center"
        >
          <div class="text-center space-y-4">
            <div
              class="p-4 rounded-full bg-gradient-to-br from-yellow-100/80 to-orange-100/80 shadow-md w-fit mx-auto"
            >
              <Github class="h-8 w-8 text-yellow-600" />
            </div>
            <h3 class="text-xl font-semibold">GitHub</h3>
            <p class="text-muted-foreground">查看我的代码仓库和开源项目</p>
            <a
              :href="contactInfo.github"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-block px-6 py-2 bg-gradient-to-r from-yellow-100/70 to-orange-100/70 text-yellow-700 rounded-full hover:from-yellow-200/80 hover:to-orange-200/80 transition-all duration-300 border border-yellow-200/50 shadow-sm"
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

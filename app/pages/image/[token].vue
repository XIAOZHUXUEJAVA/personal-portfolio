<template>
  <div
    v-if="loading"
    class="min-h-screen bg-black flex items-center justify-center"
  >
    <div class="text-white text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"
      ></div>
      <p>加载图片中...</p>
    </div>
  </div>

  <div
    v-else-if="error"
    class="min-h-screen bg-black flex items-center justify-center"
  >
    <div class="text-white text-center">
      <div class="mb-4">
        <svg
          class="w-16 h-16 mx-auto text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h2 class="text-2xl font-bold mb-2">图片加载失败</h2>
      <p class="text-gray-300 mb-6">{{ error }}</p>
      <NuxtLink
        to="/"
        class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
      >
        返回首页
      </NuxtLink>
    </div>
  </div>

  <div
    v-else-if="imageData"
    class="min-h-screen bg-black flex items-center justify-center p-4"
  >
    <div class="max-w-full max-h-full">
      <img
        :src="imageData.src"
        :alt="imageData.title || 'Shared Image'"
        class="max-w-full max-h-screen object-contain rounded-lg shadow-2xl"
        @load="onImageLoad"
        @error="onImageError"
      />

      <!-- 图片信息悬浮层 -->
      <div
        v-if="imageData.title"
        class="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm"
      >
        <h3 class="font-semibold">{{ imageData.title }}</h3>
        <p v-if="imageData.description" class="text-sm text-gray-300 mt-1">
          {{ imageData.description }}
        </p>
      </div>

      <!-- 操作按钮 -->
      <div class="absolute bottom-4 right-4 flex gap-2">
        <button
          @click="downloadImage"
          class="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-sm transition-colors"
          title="下载图片"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </button>
        <button
          @click="copyImageUrl"
          class="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-sm transition-colors"
          title="复制图片链接"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const loading = ref(true);
const error = ref<string | null>(null);
const imageData = ref<any>(null);

// SEO Meta
useHead({
  title: computed(() =>
    imageData.value ? `${imageData.value.title || "分享图片"}` : "图片分享"
  ),
  meta: [
    {
      name: "description",
      content: computed(() =>
        imageData.value
          ? imageData.value.description || "分享的图片"
          : "图片分享"
      ),
    },
    {
      property: "og:title",
      content: computed(() =>
        imageData.value ? `${imageData.value.title || "分享图片"}` : "图片分享"
      ),
    },
    {
      property: "og:description",
      content: computed(() =>
        imageData.value
          ? imageData.value.description || "分享的图片"
          : "图片分享"
      ),
    },
    {
      property: "og:image",
      content: computed(() =>
        imageData.value ? getAbsoluteUrl(imageData.value.src) : ""
      ),
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
});

// 解密token并获取图片数据
onMounted(async () => {
  try {
    const token = route.params.token as string;
    if (!token) {
      throw new Error("缺少图片token");
    }

    const { SimpleCrypto } = await import("~/utils/crypto");
    imageData.value = SimpleCrypto.decrypt(token);
    loading.value = false;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "未知错误";
    error.value = `无法加载图片: ${errorMessage}`;
    loading.value = false;
  }
});

// 获取绝对URL
const getAbsoluteUrl = (src: string) => {
  if (src.startsWith("http")) {
    return src;
  }
  const baseUrl = import.meta.client
    ? window.location.origin
    : "http://localhost:3000";
  return `${baseUrl}${src.startsWith("/") ? src : "/" + src}`;
};

// 图片加载成功
const onImageLoad = () => {
  // 可以添加一些加载成功的逻辑
};

// 图片加载失败
const onImageError = () => {
  error.value = "图片加载失败，可能图片不存在或已被删除";
};

// 下载图片
const downloadImage = () => {
  if (!imageData.value) return;

  const link = document.createElement("a");
  link.href = getAbsoluteUrl(imageData.value.src);
  link.download = `${imageData.value.title || "image"}.jpg`;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("开始下载图片");
};

// 复制图片链接
const copyImageUrl = async () => {
  if (!imageData.value) return;

  try {
    const absoluteUrl = getAbsoluteUrl(imageData.value.src);
    await navigator.clipboard.writeText(absoluteUrl);
    showToast("图片链接已复制到剪贴板");
  } catch (error) {
    console.error("复制失败:", error);
    showToast("复制失败，请手动复制");
  }
};

// 显示提示信息
const showToast = (message: string) => {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 9999;
    animation: slideIn 0.3s ease-out;
  `;

  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    }, 300);
  }, 3000);
};
</script>

<style scoped>
.absolute {
  position: absolute;
}
</style>

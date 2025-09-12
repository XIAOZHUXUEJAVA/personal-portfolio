<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4"
  >
    <div
      v-if="photoData"
      class="max-w-4xl w-full bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl"
    >
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <h1 class="text-2xl md:text-3xl font-bold mb-2">
          {{ photoData.title }}
        </h1>
        <p class="text-blue-100 opacity-90">分享自我的摄影作品集</p>
      </div>

      <!-- Image Display -->
      <div class="p-6">
        <div
          class="relative rounded-xl overflow-hidden mb-6 bg-gray-100 dark:bg-gray-800"
        >
          <NuxtImg
            :src="photoData.src"
            :alt="photoData.title"
            class="w-full h-auto max-h-[70vh] object-contain"
            loading="eager"
            format="webp"
            quality="90"
          />
        </div>

        <!-- Photo Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-semibold mb-2">作品信息</h3>
              <div class="space-y-2 text-gray-300">
                <p>
                  <span class="font-medium text-white">标题:</span>
                  {{ photoData.title }}
                </p>
                <p v-if="photoData.description">
                  <span class="font-medium text-white">描述:</span>
                  {{ photoData.description }}
                </p>
                <p v-if="photoData.location">
                  <span class="font-medium text-white">位置:</span>
                  {{ photoData.location }}
                </p>
                <p v-if="photoData.date">
                  <span class="font-medium text-white">拍摄时间:</span>
                  {{ photoData.date }}
                </p>
                <p v-if="photoData.category">
                  <span class="font-medium text-white">分类:</span>
                  {{ photoData.category }}
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-semibold mb-2">分享操作</h3>
              <div class="space-y-3">
                <button
                  class="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                  @click="copyImageUrl"
                >
                  复制图片链接
                </button>
                <button
                  class="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
                  @click="copyShareUrl"
                >
                  复制分享链接
                </button>
                <button
                  class="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                  @click="downloadImage"
                >
                  下载图片
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Back Button -->
        <div class="mt-8 text-center">
          <NuxtLink
            to="/#gallery"
            class="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
          >
            ← 返回相册
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="text-center text-white">
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
      <h2 class="text-2xl font-bold mb-2">无法加载图片信息</h2>
      <p class="text-gray-300 mb-6">分享链接可能已过期或格式不正确</p>
      <NuxtLink
        to="/"
        class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
      >
        返回首页
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO Meta
useHead({
  title: computed(() =>
    photoData.value ? `${photoData.value.title} - 摄影分享` : "图片分享"
  ),
  meta: [
    {
      name: "description",
      content: computed(() =>
        photoData.value
          ? photoData.value.description || "精美摄影作品分享"
          : "图片分享页面"
      ),
    },
    {
      property: "og:title",
      content: computed(() =>
        photoData.value ? `${photoData.value.title} - 摄影分享` : "图片分享"
      ),
    },
    {
      property: "og:description",
      content: computed(() =>
        photoData.value
          ? photoData.value.description || "精美摄影作品分享"
          : "图片分享页面"
      ),
    },
    {
      property: "og:image",
      content: computed(() =>
        photoData.value ? getAbsoluteUrl(photoData.value.src) : ""
      ),
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
});

const route = useRoute();
const photoData = ref<any>(null);

// 解码URL参数中的图片数据
onMounted(() => {
  try {
    const encodedData = route.query.data as string;
    if (encodedData) {
      const decodedData = decodeURIComponent(encodedData);
      photoData.value = JSON.parse(decodedData);
    }
  } catch (error) {
    console.error("解码图片数据失败:", error);
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

// 复制图片链接
const copyImageUrl = async () => {
  if (!photoData.value) return;

  try {
    const absoluteUrl = getAbsoluteUrl(photoData.value.src);
    await navigator.clipboard.writeText(absoluteUrl);
    showToast("图片链接已复制到剪贴板");
  } catch (error) {
    console.error("复制失败:", error);
    showToast("复制失败，请手动复制");
  }
};

// 复制分享链接
const copyShareUrl = async () => {
  try {
    const currentUrl = window.location.href;
    await navigator.clipboard.writeText(currentUrl);
    showToast("分享链接已复制到剪贴板");
  } catch (error) {
    console.error("复制失败:", error);
    showToast("复制失败，请手动复制");
  }
};

// 下载图片
const downloadImage = () => {
  if (!photoData.value) return;

  const link = document.createElement("a");
  link.href = getAbsoluteUrl(photoData.value.src);
  link.download = `${photoData.value.title || "image"}.jpg`;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("开始下载图片");
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

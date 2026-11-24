// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/eslint", "@nuxt/image", "shadcn-nuxt"],
  // 组件自动导入只扫描 .vue 文件，避免 ui 目录下的 index.ts 聚合入口被误注册为组件（撞名警告）
  components: [
    {
      path: "~/components",
      extensions: [".vue"],
    },
  ],
  app: {
    head: {
      htmlAttrs: { lang: "zh-CN" },
      meta: [{ name: "theme-color", content: "#fdfdf9" }],
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * Nuxt 4 的源码目录在 app/ 下，需指向实际路径
     */
    componentDir: "./app/components/ui",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

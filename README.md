# 个人主页项目

基于 Nuxt 4 构建的个人主页网站，包含个人介绍、照片展示、生活时间线等功能。

在线预览：https://piggyportfolio.netlify.app/

## 项目功能

- **个人介绍** - 展示基本信息和个人描述
- **照片画廊** - 多种展示模式的照片集合
- **生活时间线** - 记录重要时刻和经历
- **联系方式** - 提供邮箱和社交媒体链接
- **响应式设计** - 适配移动端和桌面端

## 技术栈

- **框架**: Nuxt 4.1.1 + Vue 3.5.21 + TypeScript
- **样式**: Tailwind CSS 4.1.13 + shadcn-nuxt
- **动画**: GSAP 3.13.0 + Motion-v 1.7.1
- **3D 效果**: Three.js 0.180.0 + OGL 1.0.11
- **图标**: Lucide Vue Next
- **工具**: ESLint + Nuxt Image + VueUse

## 项目结构

```
app/
├── components/
│   ├── layout/           # 布局组件
│   ├── sections/         # 页面区块组件
│   └── ui/              # UI 组件库
├── data/                # 静态数据
├── pages/               # 页面文件
├── composables/         # 组合式函数
└── utils/               # 工具函数
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境

```bash
npm run dev
```

访问 http://localhost:3000 查看项目

### 构建部署

```bash
npm run build
```

## 自定义配置

修改 `app/data/staticData.ts` 文件来更新：

- 个人信息
- 照片数据
- 时间线内容
- 联系方式

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

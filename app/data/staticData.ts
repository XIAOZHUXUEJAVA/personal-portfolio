export interface HeroData {
  name: string
  description: string
  avatar: string
}

export interface AboutItem {
  title: string
  description: string
  icon: string
  gradientColor: string
  tags?: string[]
}

export interface PhotoItem {
  src: string
  title: string
  category: string
  description?: string
}

export interface TimelineItem {
  id: string
  label: string
  date: string
  title: string
  description: string
  image?: string
}

export interface ContactInfo {
  email: string
  github: string
  twitter: string
  linkedin: string
}

// Hero Section Data
export const heroData: HeroData = {
  name: "张小明",
  description: "热爱生活的摄影师与设计师，用镜头记录世界的美好，用文字分享内心的感悟。在这里，我与你分享我的生活点滴、创作灵感和人生思考。",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
}

// About Section Data
export const aboutData: AboutItem[] = [
  {
    title: "摄影爱好者",
    description: "用镜头捕捉生活中的美好瞬间，从街头巷尾到山川湖海，每一张照片都承载着独特的故事和情感。",
    icon: "Camera",
    gradientColor: "#3b82f6",
    tags: ["风景摄影", "人像摄影", "街拍", "后期处理"]
  },
  {
    title: "设计师",
    description: "专注于用户体验设计和视觉设计，相信好的设计能够改变世界，让生活变得更加美好和便利。",
    icon: "Palette",
    gradientColor: "#8b5cf6",
    tags: ["UI/UX", "平面设计", "品牌设计", "插画"]
  },
  {
    title: "生活记录者",
    description: "喜欢用文字记录生活的点点滴滴，分享旅行见闻、读书心得和人生感悟，希望能与更多人产生共鸣。",
    icon: "BookOpen",
    gradientColor: "#06b6d4",
    tags: ["写作", "阅读", "旅行", "思考"]
  }
]

// Photo Gallery Data
export const photoGalleryData: PhotoItem[] = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    title: "山间晨雾",
    category: "风景",
    description: "清晨的山间，薄雾缭绕，仿佛仙境一般"
  },
  {
    src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop",
    title: "城市夜景",
    category: "城市",
    description: "华灯初上的城市，霓虹闪烁，充满生机"
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    title: "森林小径",
    category: "自然",
    description: "阳光透过树叶洒在小径上，静谧而美好"
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    title: "海边日落",
    category: "风景",
    description: "夕阳西下，海天一色，美得令人窒息"
  },
  {
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&h=600&fit=crop",
    title: "咖啡时光",
    category: "生活",
    description: "午后的咖啡时光，享受片刻的宁静"
  },
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
    title: "雪山远景",
    category: "风景",
    description: "远山如黛，雪峰巍峨，大自然的鬼斧神工"
  }
]

// Timeline Data
export const timelineData: TimelineItem[] = [
  {
    id: "2024-01",
    label: "新的开始",
    date: "2024年1月",
    title: "开启个人博客之旅",
    description: "决定开始记录生活，分享摄影作品和人生感悟。这是一个全新的开始，希望能够通过文字和图片与更多人产生连接。",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop"
  },
  {
    id: "2024-03",
    label: "春日踏青",
    date: "2024年3月",
    title: "樱花季的京都之行",
    description: "春天的京都，樱花盛开，粉色的花瓣如雪花般飘落。在这里感受到了日本文化的深厚底蕴，也拍摄了许多珍贵的照片。",
    image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&h=300&fit=crop"
  },
  {
    id: "2024-06",
    label: "夏日回忆",
    date: "2024年6月",
    title: "海边的夏日时光",
    description: "炎热的夏天，来到海边度假。蔚蓝的大海、金色的沙滩、温暖的阳光，这些都成为了美好的回忆。",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop"
  },
  {
    id: "2024-09",
    label: "秋日感悟",
    date: "2024年9月",
    title: "金秋时节的思考",
    description: "秋天是收获的季节，也是思考的季节。在这个时候，我开始反思过去的一年，思考未来的方向。",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop"
  }
]

// Contact Information
export const contactInfo: ContactInfo = {
  email: "hello@example.com",
  github: "https://github.com/username",
  twitter: "https://twitter.com/username",
  linkedin: "https://linkedin.com/in/username"
}

// Quotes for inspiration
export const inspirationalQuotes = [
  "生活不是等待暴风雨过去，而是学会在雨中跳舞。",
  "每一个不曾起舞的日子，都是对生命的辜负。",
  "世界那么大，我想去看看。",
  "用心感受生活，用镜头记录美好。"
]
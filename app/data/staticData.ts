export interface HeroData {
  name: string;
  description: string;
  avatar: string;
}

export interface AboutItem {
  title: string;
  description: string;
  icon: string;
  gradientColor: string;
  tags?: string[];
}

export interface PhotoItem {
  src: string;
  title: string;
  category: string;
  description?: string;
  location?: string;
  date?: string;
}

export interface TimelineItem {
  id: string;
  label: string;
  date: string;
  title: string;
  description: string;
  image?: string;
}

export interface ContactInfo {
  email: string;
  github: string;
  twitter: string;
  linkedin: string;
}

// Hero Section Data
export const heroData: HeroData = {
  name: "xiaozhu",
  description: "简简单单地记录生活的滴滴点点~",
  avatar: "/avatar/avatar.jpg",
};

// About Section Data
export const aboutData: AboutItem[] = [
  {
    title: "程序开发人员",
    description:
      "会点后端(潦潦草草)，懂点前端(全靠AI)，摸点运维(全靠运气)， 喜欢折腾(闲不下来)",
    icon: "Camera",
    gradientColor: "#3b82f6",
    tags: ["职业", "技术"],
  },
  {
    title: "摩托杀手",
    description:
      "练习时长10年+（小时候偷偷骑），但仅限于正常骑行，最近正在骑巡航",
    icon: "Palette",
    gradientColor: "#8b5cf6",
    tags: ["爱好", "骑行"],
  },
  {
    title: "喜欢单曲循环",
    description:
      "喜欢听音乐，喜欢邓紫棋，喜欢单曲循环某一首歌，最近在听 ‘像中枪一样’",
    icon: "BookOpen",
    gradientColor: "#06b6d4",
    tags: ["音乐", "邓紫棋"],
  },
];

// Photo Gallery Data
export const photoGalleryData: PhotoItem[] = [
  {
    src: "/images/dengziqi1.jpg",
    title: "绝顶",
    category: "演唱会",
    description: "清晨的山间，薄雾缭绕，仿佛仙境一般",
    location: "泰山",
    date: "2023-08-06",
  },
  {
    src: "/images/dengziqi2.jpg",
    title: "城市夜景",
    category: "演唱会",
    description: "华灯初上的城市，霓虹闪烁，充满生机",
    location: "上海外滩",
    date: "2024-05-20",
  },
  {
    src: "/images/dengziqi3.jpg",
    title: "森林小径",
    category: "演唱会",
    description: "阳光透过树叶洒在小径上，静谧而美好",
    location: "九寨沟",
    date: "2024-04-10",
  },
  {
    src: "/images/dengziqi4.jpg",
    title: "海边日落",
    category: "演唱会",
    description: "夕阳西下，海天一色，美得令人窒息",
  },
  {
    src: "/images/dengziqi5.jpg",
    title: "咖啡时光",
    category: "演唱会",
    description: "午后的咖啡时光，享受片刻的宁静",
  },
  // {
  //   // src: "/images/dengziqi6.jpg",
  //   // title: "雪山远景",
  //   // category: "演唱会",
  //   // description: "远山如黛，雪峰巍峨，大自然的鬼斧神工",
  // },
];

// 精选作品数据 - 用于 ExpandableGallery
export const featuredWorksData: PhotoItem[] = [
  {
    src: "/images/liushui.jpg",
    title: "星空银河",
    category: "风景",
    description: "璀璨的银河横跨夜空，星光点点如钻石般闪耀",
    location: "内蒙古草原",
    date: "2024-08-15",
  },
  {
    src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop",
    title: "古镇水乡",
    category: "城市",
    description: "江南水乡的古朴韵味，小桥流水人家",
    location: "乌镇",
    date: "2024-04-22",
  },
  {
    src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop",
    title: "云海奇观",
    category: "自然",
    description: "云海翻腾，山峰若隐若现，宛如仙境",
    location: "泰山",
    date: "2024-05-01",
  },
  {
    src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop",
    title: "田园风光",
    category: "自然",
    description: "金黄的麦田在夕阳下闪闪发光，丰收的喜悦",
    location: "河南",
    date: "2024-06-30",
  },
];

// 精选照片数据 - 用于 FlipCard
export const highlightPhotosData: PhotoItem[] = [
  {
    src: "/images/taishan.jpg",
    title: "绝顶",
    category: "风景",
    description: "时隔三年，再次登临泰山之巅",
    location: "泰山",
    date: "2023-08-06",
  },
  {
    src: "/images/qianfoshan.jpg",
    title: "日落",
    category: "自然",
    description: "千佛山的落日似乎也能打动人心",
    location: "千佛山",
    date: "2024-03-28",
  },
  {
    src: "/images/qingdao.png",
    title: "看海",
    category: "风景",
    description: "就算大雨让这座城市倾倒",
    location: "青岛",
    date: "2025-08-21",
  },
];

// Timeline Data
export const timelineData: TimelineItem[] = [
  {
    id: "2022-01",
    label: "学习编程",
    date: "2022年1月",
    title: "开启代码学习之路",
    description:
      "22年的新年，开始认真的学习编程，选择的语言是Java。还算认真的去学习，似乎还没找到真正的编程之道",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
  },
  {
    id: "2023-06",
    label: "实习工作",
    date: "2023年6月",
    title: "第一份实习工作",
    description: "几个月左右的实习工作，似乎也让我明白了什么是职场",
    image:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&h=300&fit=crop",
  },
  {
    id: "2024-07",
    label: "木牛流马",
    date: "2024年7月",
    title: "正式参加工作",
    description: "工作至今，尽量让自己保持学习的状态，不断探索最新的技术",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
  },
  // {
  //   id: "2024-09",
  //   label: "秋日感悟",
  //   date: "2024年9月",
  //   title: "金秋时节的思考",
  //   description:
  //     "秋天是收获的季节，也是思考的季节。在这个时候，我开始反思过去的一年，思考未来的方向。",
  //   image:
  //     "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
  // },
];

// Contact Information
export const contactInfo: ContactInfo = {
  email: "xiaozhuzhulzq@163.com",
  github: "https://github.com/XIAOZHUXUEJAVA",
  twitter: "https://twitter.com/username",
  linkedin: "https://linkedin.com/in/username",
};

// Quotes for inspiration
export const inspirationalQuotes = [
  "Actions > Words",
  // "每一个不曾起舞的日子，都是对生命的辜负。",
  // "世界那么大，我想去看看。",
  // "用心感受生活，用镜头记录美好。",
];

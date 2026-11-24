# Maple Mono 英文字体

使用与参考站点相同的 `@fontsource/maple-mono@5.3.0`，直接保留其 Latin WOFF2 文件，包含 400、500、600、700 四个常规字重。字体由 `next/font/local` 自托管，无需请求第三方字体服务，也不新增运行时依赖。

- 原字体项目：https://github.com/subframe7536/maple-font
- 文件来源：https://registry.npmjs.org/@fontsource/maple-mono/-/maple-mono-5.3.0.tgz
- 许可：SIL Open Font License 1.1，见本目录 `OFL.txt`。

`app/layout.tsx` 定义 `--font-maple-mono`；`css/paper-theme.css` 将它与中文字体组合为 `--font-site`。Tailwind 的 sans、serif、mono 和各组件的显式字体规则共用这份配置，统一标题、正文、界面及代码的字体。

Next.js 的自动回退字体已关闭，以确保 Maple Mono 不包含的中文字形继续匹配寒蝉半圆体。浏览器按使用到的字重加载字体，使用 `font-display: swap`。

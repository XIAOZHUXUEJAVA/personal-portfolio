# 中文网页字体

本目录的 `Piggy Chinese` 是寒蝉半圆体 **ChillRoundM 1.805 Regular** 的中文 WOFF2 分片，字形与参考站点使用的字体一致。为了遵守原字体的保留名称约定，子集的内部字体名称改为 `Piggy Chinese`。

- 原字体项目：https://github.com/Warren2060/ChillRound
- 本次使用的源文件：https://github.com/dodolalorc/digital-site/blob/5eafc2df464e1d45a017c38146a1cc49d005d7c1/public/fonts/ChillRoundM.ttf
- 许可：SIL Open Font License 1.1，见本目录 `OFL.txt`；字体内部保留原作者版权和许可信息。
- Copyright 2021 The Zen Maru Gothic Authors (https://github.com/googlefonts/zen-marugothic)
- © 2023 ChillType, with Reserved Font Name 'ChillRoundF' 'ChillRoundM'.

`css/chinese-fonts.css` 通过 `unicode-range` 限制为汉字、中文标点、注音及相关兼容字符，不含拉丁字母、数字和 ASCII 标点。这些字符统一使用 Maple Mono。中文标点中的全角标点使用此字体，共用的西文引号、省略号等由 Maple Mono 处理。正文、标题、界面和代码共用 `--font-site` 字体栈。

23 个分片共覆盖源字体中的 11,378 个中文相关字符，约 2.48 MiB。浏览器只请求页面实际使用的分片；常用站点字符按出现频率集中，以减少首屏下载。源字体之外的生僻字依然回退到系统字体。只包含原字体的 400 字重，粗体由浏览器合成。

资源和 CSS 已提交，日常开发、构建和新增文章不需要 Python，也不需要重新生成字体。CSS 使用相对资源路径，经 Next.js 打包为带哈希的同源文件，兼容 `BASE_PATH`。

如需调整分片策略或升级字体，可在独立 Python 环境中安装工具后生成：

```sh
python -m pip install "fonttools[woff]==4.61.1"
python scripts/fonts/subset-chinese.py "/path/to/ChillRoundM.ttf"
yarn prettier --write css/chinese-fonts.css
```

生成脚本会检查每个分片的字符映射，确保没有重叠、丢字或误含英文。源 TTF 不参与网站运行，也不需要放入仓库。

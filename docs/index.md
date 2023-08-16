---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "YikUi"
  text: "使用说明"
  tagline: 💰封装一些小众组件,用于在项目中快速接入💰
  actions:
    - theme: brand
      text: 开始使用
      link: /start
    - theme: alt
      text: 安装
      link: /start

features:
  - title: 📝电子签名组件
    details: 用于签名场景的组件，可调整线条粗细以及背景图颜色等.基于 Canvas 实现。
  - title: 🧾滚动加载
    details: 瀑布流滚动加载，用于展示长列表，当列表即将滚动到底部时，会触发事件并加载更多列表项
  - title: 🚀无缝滚动
    details: 常用场景:公告栏滚动播报、轮播图无缝切换 在滚动元素
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #1a89fa);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(72px);
  }
}
</style>

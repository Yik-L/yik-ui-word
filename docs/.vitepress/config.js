/*
 * @Author: 刘岩
 * @Date: 2023-08-03 09:03:52
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-08-04 09:10:07
 * @FilePath: \yik-ui-word\docs\.vitepress\config.js
 * @Description:
 */
import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "YikUi",
  base: "/yik-ui-word/",
  description: "YikUi说明文档",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "组件", link: "/start" },
    ],
    search: {
      provider: "local",
    },
    sidebar: [
      {
        text: "组件",
        items: [
          { text: "快速开始", link: "/start" },
          { text: "大屏适配组件", link: "/max-view" },
          { text: "无缝滚动", link: "/marquee" },
          { text: "滚动加载", link: "/scroll" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});

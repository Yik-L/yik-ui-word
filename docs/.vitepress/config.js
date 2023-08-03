/*
 * @Author: 刘岩
 * @Date: 2023-08-03 09:03:52
 * @LastEditors: 刘岩
 * @LastEditTime: 2023-08-03 09:19:01
 * @FilePath: \yik-ui\docs\.vitepress\config.js
 * @Description:
 */
import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "YikUi",
  // base: ".",
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
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});

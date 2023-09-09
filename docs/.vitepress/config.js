/*
 * @Author: 刘岩
 * @Date: 2023-08-03 09:03:52
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-09-09 23:34:39
 * @FilePath: /yik-ui-word/docs/.vitepress/config.js
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
      { text: "脚手架", link: "/yik-cli" },
      { text: "组合式 API", link: "/useWatchDom_" },
    ],
    search: {
      provider: "local",
    },
    sidebar: [
      {
        text: "组件",
        items: [
          { text: "快速开始", link: "/start" },
          { text: "大屏适配", link: "/max-view" },
          { text: "无缝滚动", link: "/marquee" },
          { text: "滚动加载", link: "/scroll" },
          { text: "电子签名", link: "/sign" },
          { text: "监听键盘", link: "/keyboard" },
          { text: "图片预览", link: "/view-image" },
          { text: "横屏", link: "/horizontal-screen" },
          { text: "标签页", link: "/tabs" },
        ],
      },
      {
        text: "yik-cli",
        items: [{ text: "快速开始", link: "/yik-cli" }],
      },
      {
        text: "组合式 API",
        items: [
          { text: "监听dom变化", link: "/useWatchDom_" },
          { text: "监听dom可视区域内", link: "/useWatchViewArea_" },
          { text: "全局总线", link: "/useMitt_" },
          { text: "改变元素的宽高", link: "/useResize_" },
          { text: "防抖", link: "/useDebounce_" },
          { text: "节流", link: "/useThrottle_" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://gitee.com/yan_one/vite-press" },
    ],
  },
});

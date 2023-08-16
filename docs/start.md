<!--
 * @Author: 刘岩 15136056318@163.com
 * @Date: 2023-08-03 09:43:07
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-08-16 17:09:23
 * @FilePath: \yik-ui-word\docs\start.md
 * @Description:
-->

# 快速开始 <Badge type="tip" text="^1.1.0" />

## 安装

```sh
npm i @yik_l/ui -S
```

## 用法

### 完整引入

_不用在乎依赖包的大小，没有多少 KB。 大胆引入 😂_

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import { YikUi } from "@yik_l/ui";
import "@yik_l/ui/style.css";
const app = createApp(App);
app.use(YikUi);
app.mount("#app");
```

### 按需导入

_注意：如果时按需导入，在结尾一定要带下划线_

```vue
<template>
  <YikHorizontalScreen_></YikHorizontalScreen_>
</template>
<script setup>
import { YikHorizontalScreen_ } from "@yik_l/ui";
</script>
```

## 开始使用

现在你可以启动项目了。 具体每个组件的使用方法, 请查阅 [每个组件的独立文档](./max-view.md).

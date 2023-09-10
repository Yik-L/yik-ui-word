<!--
 * @Author: 刘岩 15136056318@163.com
 * @Date: 2023-08-03 09:43:07
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-09-09 23:00:50
 * @FilePath: /yik-ui-word/docs/start.md
 * @Description:
-->

# 快速开始

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

```vue
<template>
  <YikHorizontalScreen></YikHorizontalScreen>
</template>
<script setup>
import { YikHorizontalScreen } from "@yik_l/ui";
</script>
```

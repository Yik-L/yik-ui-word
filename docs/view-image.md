<!--
 * @Author: 刘岩 15136056318@163.com
 * @Date: 2023-08-05 19:52:32
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-08-05 20:06:11
 * @FilePath: /yik-ui/docs/view-image.md
 * @Description:
-->
<script setup>
  import ViewImage from './comps/ViewImage.vue'
</script>

# 图片预览

图片放大预览

## 基础用法

<ViewImage></ViewImage>

## 示例代码

```vue
<template>
  <button @click="show = true">图片预览</button>
  <YikViewImage v-model:show="show" :imgs="imgs" :index="1"></YikViewImage>
</template>
<script setup>
import YikUi from "./yik-ui.js";
import { reactive, toRefs } from "vue";
const { YikViewImage } = YikUi;
console.log(YikViewImage);
const state = reactive({
  show: false,
  imgs: [
    "https://img0.baidu.com/it/u=1604010673,2427861166&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
    "https://img1.baidu.com/it/u=1458656822,2078909008&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750",
  ],
});
const { show, imgs } = toRefs(state);
</script>
<style lang="less" scoped>
button {
  padding: 5px 10px;
  background-color: #1a89fa;
  font-size: 14px;
  color: #fff;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
```

## 属性

| **属性名**   | **说明**                                                    | **类型** | **默认值** |
| ------------ | ----------------------------------------------------------- | -------- | ---------- |
| v-model:show | 是否展示图片预览                                            | boolean  | false      |
| isClickMask  | 是否点击遮罩层关闭                                          | boolean  | true       |
| isAutoSize   | 超过视口自动缩放图片大小                                    | boolean  | true       |
| pct          | 自定义缩放比例图片大小（当 isAutoSize 为 false 时，生效。） | Number   | 100        |
| imgs         | 图片组                                                      | Array    | []         |
| index        | 默认打开第几张图片（数组的下标）                            | Number   | 0          |

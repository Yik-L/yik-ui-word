<!--
 * @Author: 刘岩 15136056318@163.com
 * @Date: 2023-08-16 16:59:31
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-08-18 10:50:52
 * @FilePath: \yik-ui-word\docs\useWatchViewArea_.md
 * @Description:
-->

## useWatchViewArea\_

**_监听 Dom 是否在可视区域内,基于 IntersectionObserver 对象实现_**

## 基本用法

```vue
<template>
  <div ref="domRef"></div>
</template>
<script setup>
import { useWatchViewArea_ } from "@yik_l/ui";
import { ref } from "vue";
const domRef = ref(null);
useWatchViewArea_(
  (intersectionObserver, { entries, observer }) => {
    console.log(intersectionObserver, { entries, observer });
  },
  domRef.value,
  {
    //root 指定根元素，用于检查目标的可见性。必须是目标元素的父级元素。如果未指定或者为null，则默认为浏览器视窗。
    //rootMargin 根元素的外边距，类似于 CSS 中的margin属性。
    //threshold 目标元素与根元素的交叉比例，可以是单一的 number 也可以是 number 数组，比如，[0, 0.25, 0.5, 0.75, 1]就表示当目标元素 0%、25%、50%、75%、100% 可见时，会触发回调函数。
  }
);
</script>
```

## 参数

| **参数** | **说明**     | **类型** | **默认值**   |
| -------- | ------------ | -------- | ------------ |
| callback | 回调函数，   | Fun      | -            |
| el       | dom 元素     | -        | -            |
| options  | 可选的配置项 | options  | 以上都有标注 |

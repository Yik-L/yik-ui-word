<!--
 * @Author: 刘岩 15136056318@163.com
 * @Date: 2023-08-16 16:59:31
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-09-09 23:06:12
 * @FilePath: /yik-ui-word/docs/useWatchDom_.md
 * @Description:
-->

## useWatchDom

**_监听 Dom 元素的变化,基于 MutationObserver 对象实现_**

## 基本用法

```vue
<template>
  <div ref="domRef"></div>
</template>
<script setup>
import { useWatchDom } from "@yik_l/ui";
import { ref } from "vue";
const domRef = ref(null);
useWatchDom(
  (mutationObserver, { mutationList, observer }) => {
    console.log(mutationObserver, { mutationList, observer });
  },
  domRef.value,
  {
    childList: true, // 观察目标子节点的变化，是否有添加或者删除
    attributes: true, // 观察属性变动
    subtree: true, // 观察后代节点，默认为
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

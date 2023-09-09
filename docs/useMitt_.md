<!--
 * @Author: 刘岩 15136056318@163.com
 * @Date: 2023-08-30 20:38:15
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-09-09 23:01:54
 * @FilePath: /yik-ui-word/docs/useMitt_.md
 * @Description:
-->

## useMitt

**_全局总线，实现发布订阅功能_**

## 基本用法

```vue
<template></template>
<script setup>
import { useMitt } from "@yik_l/ui";
import { ref } from "vue";
const domRef = ref(null);
// 这里我们可以理解为初始化一个变量
const test = useMitt_("test");
setTimeout(() => {
  // 触发
  test.value = "变化";
}, 2000);

// 监听，一旦变量值发生变化，会触发回调函数
useMitt_("test", (val, old) => {
  console.log(val, old);
});
</script>
```

## 参数

| **参数** | **说明** | **类型** | **默认值** |
| -------- | -------- | -------- | ---------- |
| any      | 变量     | string   | ““         |
| callback | 回调     | Fun      | -          |

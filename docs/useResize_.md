<!--
 * @Author: 刘岩 15136056318@163.com
 * @Date: 2023-08-22 14:47:54
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-08-22 14:56:16
 * @FilePath: \yik-ui-word\docs\useResize_.md
 * @Description:
-->
<script setup>
  import UseResize from './comps/UseResize.vue'
</script>

## useResize\_

**_拖拽的方式改变元素的宽高_**

### 基本用法

<UseResize></UseResize>

```vue
<template>
  <div ref="divRef" class="div-ref"></div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useResize_ } from "@yik_l/ui";
const divRef = ref(null);
onMounted(() => {
  useResize_({
    el: divRef.value,
    onChange: (e) => {},
    onStart: (e) => {},
    onEnd: (e) => {},
  });
});
</script>
```

## 参数

| **参数** | **说明**           | **类型** | **默认值** |
| -------- | ------------------ | -------- | ---------- |
| el       | dom 元素           | -        | -          |
| gap      | 距离边界线多少触发 | -        | -          |
| onChange | 拖拽中回调         | Fun      | -          |
| onStart  | 开始时回调         | Fun      | -          |
| onEnd    | 结束时回调         | Fun      | -          |

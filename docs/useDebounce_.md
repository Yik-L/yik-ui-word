<!--
 * @Author: 刘岩 15136056318@163.com
 * @Date: 2023-09-06 21:05:17
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-09-09 23:01:47
 * @FilePath: /yik-ui-word/docs/useDebounce_.md
 * @Description:
-->
<script setup>
  import UseDebounce from './comps/UseDebounce.vue'
</script>

# useDebounce

**_防抖函数，始终最后一次触发_**

## 基本用法

<UseDebounce></UseDebounce>

```vue
<template>
  <input style="border: 1px solid #12b981" placeholder="防抖" @input="input" />
  <br /><br />
  {{ desc }}
</template>
<script setup>
import { useDebounce } from "@/yik_l/ui";
import { shallowRef } from "vue";
const desc = shallowRef("");
const input = useDebounce((e) => {
  desc.value = e.target.value;
}, 1000);
</script>
```

## 参数

| **参数** | **说明**       | **类型** | **默认值** |
| -------- | -------------- | -------- | ---------- |
| fun      | 回调函数       | -        | -          |
| wait     | 触发时间，毫秒 | -        | -          |

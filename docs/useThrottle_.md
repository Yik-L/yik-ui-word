<!--
 * @Author: 刘岩 15136056318@163.com
 * @Date: 2023-09-06 21:15:33
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-09-06 21:19:31
 * @FilePath: /yik-ui-word/docs/useThrottle_.md
 * @Description:
-->
<script setup>
  import UseThrottle from './comps/UseThrottle.vue'
</script>

# useDebounce

**_节流函数，每隔几秒出发一次_**

## 基本用法

<UseThrottle></UseThrottle>

```vue
<template>
  <input style="border: 1px solid #12b981" placeholder="防抖" @input="input" />
  <br /><br />
  {{ desc }}
</template>
<script setup>
import { useThrottle_ } from "./yik-ui.js";
import { shallowRef } from "vue";
const desc = shallowRef("");
const input = useThrottle_((e) => {
  desc.value = e.target.value;
}, 1000);
</script>
```

## 参数

| **参数** | **说明**       | **类型** | **默认值** |
| -------- | -------------- | -------- | ---------- |
| fun      | 回调函数       | -        | -          |
| wait     | 触发时间，毫秒 | -        | -          |

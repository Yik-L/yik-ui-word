<script setup>
  import UseDebounce from './comps/UseDebounce.vue'
</script>

# useDebounce\_

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
import { useDebounce_ } from "./yik-ui.js";
import { shallowRef } from "vue";
const desc = shallowRef("");
const input = useDebounce_((e) => {
  desc.value = e.target.value;
}, 1000);
</script>
```

## 参数

| **参数** | **说明**       | **类型** | **默认值** |
| -------- | -------------- | -------- | ---------- |
| fun      | 回调函数       | -        | -          |
| wait     | 触发时间，毫秒 | -        | -          |

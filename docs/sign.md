<script setup>
  import Sign from './comps/Sign.vue'
</script>

# 电子签名

用于签名场景的组件，基于 Canvas 实现

## 基础用法

<Sign></Sign>

## 示例代码

```vue
<template>
  <button @click="handleSave">获取电子签名</button>
  <button @click="handleClear">清空内容</button>
  <YikSign
    ref="yikSignRef"
    :width="w"
    :height="h"
    style="border: 1px solid rgb(14, 190, 234)"
  ></YikSign>
  <img v-if="src" style="border: 1px solid rgb(14, 190, 234)" :src="src" />
</template>
<script setup>
import { YikSign } from "@yik_l/ui";
import { reactive, toRefs, ref } from "vue";
const yikSignRef = ref(null);
const state = reactive({
  w: 500,
  h: 300,
  src: "",
});
const { w, h, src } = toRefs(state);
const handleSave = () => {
  state.src = yikSignRef.value.save();
};
const handleClear = () => {
  yikSignRef.value.clear();
  state.src = "";
};
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

| **属性名** | **说明**       | **类型** | **默认值** |
| ---------- | -------------- | -------- | ---------- |
| width      | 宽度           | number   | 500        |
| height     | 高度           | number   | 300        |
| color      | 线条颜色       | string   | #000       |
| lineWidth  | 线条粗细       | number   | 3          |
| bg         | 背景色         | string   | #fff       |
| value      | 回显路径位置值 | array    | []         |

## 方法

通过 ref 可以获取到 Form 实例并调用实例方法

| **方法名** | **说明**       | **参数** | **返回值** |
| ---------- | -------------- | -------- | ---------- |
| save       | 获取图片       | -        | base64     |
| clear      | 清楚绘制       | -        | -          |
| getLine    | 获取路径位置值 | -        | array      |

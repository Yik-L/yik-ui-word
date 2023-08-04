<script setup>
  import Sign from './comps/Sign.vue'
</script>

# 电子签名

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

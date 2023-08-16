<!--
 * @Author: 刘岩 15136056318@163.com
 * @Date: 2023-08-04 09:36:55
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-08-16 16:27:13
 * @FilePath: \yik-ui-word\docs\comps\Sign.vue
 * @Description: 
-->
<template>
  <button @click="handleSave">获取电子签名</button>
  <button @click="handleClear">清空内容</button>
  <button @click="color = '#5f1bf3'">线条颜色</button>
  <button @click="lineWidth = 5">线条粗细</button>
  <button @click="bg = '#d0c0f3'">设置背景色</button>
  <button
    @click="
      () => {
        bg = '#fff';
        lineWidth = 3;
        color = '#000';
      }
    "
  >
    重置
  </button>
  <YikSign
    ref="yikSignRef"
    :width="w"
    :height="h"
    :color="color"
    :lineWidth="lineWidth"
    :bg="bg"
    style="border: 1px solid rgb(16, 185, 129)"
  ></YikSign>
  <img v-if="src" style="border: 1px solid rgb(16, 185, 129)" :src="src" />
</template>
<script setup>
import YikUi from "./yik-ui.js";
import { reactive, toRefs, ref } from "vue";
const { YikSign } = YikUi;
const yikSignRef = ref(null);
const state = reactive({
  w: 520,
  h: 300,
  src: "",
  color: "#000",
  lineWidth: 3,
  bg: "#fff",
});
const { w, h, src, color, lineWidth, bg } = toRefs(state);
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
  background-color: #10b981;
  font-size: 14px;
  color: #fff;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>

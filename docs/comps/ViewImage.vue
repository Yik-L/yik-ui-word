<!--
 * @Author: 刘岩 15136056318@163.com
 * @Date: 2023-08-05 19:54:14
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-09-09 22:56:20
 * @FilePath: /yik-ui-word/docs/comps/ViewImage.vue
 * @Description: 
-->
<template>
  <button @click="show = true">图片预览</button>
  <YikViewImage v-model:show="show" :imgs="imgs" :index="1"></YikViewImage>
</template>
<script setup>
import { YikViewImage } from "./yik-ui.js";
import { reactive, toRefs } from "vue";
const state = reactive({
  show: false,
  imgs: [
    "https://img0.baidu.com/it/u=1604010673,2427861166&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889",
    "https://img1.baidu.com/it/u=1458656822,2078909008&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=750",
  ],
});
const { show, imgs } = toRefs(state);
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

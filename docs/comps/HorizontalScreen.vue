<!--
 * @Author: 刘岩 15136056318@163.com
 * @Date: 2023-08-16 13:56:43
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-08-16 16:28:00
 * @FilePath: \yik-ui-word\docs\comps\HorizontalScreen.vue
 * @Description: 
-->
<template>
  <div style="display: flex; justify-content: space-between">
    <YikHorizontalScreen
      style="border: 1px solid #10b981"
      width="260px"
      height="375px"
      direction="right"
    >
      YikHorizontalScreen
    </YikHorizontalScreen>
    <YikHorizontalScreen
      style="border: 1px solid #10b981"
      width="260px"
      height="375px"
      direction="left"
    >
      YikHorizontalScreen
    </YikHorizontalScreen>
  </div>
</template>
<script setup>
import YikUi from "./yik-ui.js";
const { YikHorizontalScreen } = YikUi;
import "./style.css";
</script>
<style lang="less" scoped></style>

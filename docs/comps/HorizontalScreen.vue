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
    <YikHorizontalScreen_
      style="border: 1px solid #10b981"
      width="260px"
      height="375px"
      direction="right"
    >
      YikHorizontalScreen
    </YikHorizontalScreen_>
    <YikHorizontalScreen_
      style="border: 1px solid #10b981"
      width="260px"
      height="375px"
      direction="left"
    >
      YikHorizontalScreen
    </YikHorizontalScreen_>
  </div>
</template>
<script setup>
import { YikHorizontalScreen_ } from "./yik-ui.js";
import "./style.css";
</script>
<style lang="less" scoped></style>

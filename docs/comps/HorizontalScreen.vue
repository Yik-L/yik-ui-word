<template>
  <div style="display: flex; justify-content: space-between">
    <YikHorizontalScreen
      style="border: 1px solid #1a89fa"
      width="260px"
      height="375px"
      direction="right"
    >
      YikHorizontalScreen
    </YikHorizontalScreen>
    <YikHorizontalScreen
      style="border: 1px solid #1a89fa"
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

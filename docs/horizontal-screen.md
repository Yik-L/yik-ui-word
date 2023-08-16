<script setup>
  import HorizontalScreen from './comps/HorizontalScreen.vue'
</script>

# 横屏

移动端可以横屏展示内容,例如:表格 图表等等。

## 基础用法

<HorizontalScreen></HorizontalScreen>

## 示例代码

```vue
<template>
  <YikHorizontalScreen width="375px" height="375px" direction="right">
    YikHorizontalScreen
  </YikHorizontalScreen>
</template>
<script setup></script>
<style lang="less" scoped></style>
```

## 属性

| **属性名** | **说明** | **类型** | **默认值**                       |
| ---------- | -------- | -------- | -------------------------------- |
| direction  | 方向     | string   | 默认：right， 可选：(right,left) |
| width      | 方向     | string   | 默认：100vw                      |
| height     | 方向     | string   | 默认：100vh                      |

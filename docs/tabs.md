<!--
 * @Author: 刘岩 15136056318@163.com
 * @Date: 2023-08-30 20:38:55
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-08-30 21:21:16
 * @FilePath: /yik-ui-word/docs/tabs.md
 * @Descri
-->
<script setup>
  import Tabs from './comps/Tabs.vue'
</script>

# 标签页

**_选项卡组件，用于在不同的内容区域之间进行切换_**

<p style="color:red;font-weight:bold">注意：没有样式，只有能力。样式需要自己美化</p>

## 基础用法

<Tabs></Tabs>

## 示例代码

```vue
<template>
  <YikTabs
    classNameActive="tabs-active"
    class="tabs"
    v-model:active="active"
    @onchange="onTabChange"
  >
    <YikTab class="tab"> 测试1 </YikTab>
    <YikTab class="tab"> 测试2 </YikTab>
    <YikTab class="tab"> 测试3 </YikTab>
  </YikTabs>
  {{ active }}
</template>
<script setup>
import { ref } from "vue";
const active = ref(1);
</script>
<style lang="less" scoped>
.center {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}
.tabs {
  display: flex;
  height: 40px;
  background: #4f86f0;
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.1);
  border-radius: 40px 40px 40px 40px;
  opacity: 1;
}
.tab {
  width: 150px;
  height: 100%;
  color: #ffffff;
  font-size: 1.4815vh;
  cursor: pointer;
  .center();
}
.tabs-active {
  background: #ffffff;
  box-shadow: 0px 0px 16px 0px rgba(0, 88, 247, 0.2);
  border-radius: 40px 40px 40px 40px;
  color: #3c73e4;
  .center();
}
</style>
```

## 属性

| **属性名**      | **说明**                 | **类型** | **默认值** |
| --------------- | ------------------------ | -------- | ---------- |
| duration        | 动画时间（毫秒）         | Number   | 3000       |
| v-model:active  | 绑定当前选中标签的标识符 | Number   | 0          |
| classNameActive | 给选中的标签设置类名     | String   | -          |

## 事件

| **事件名** | **说明**                 | **回调参数** |
| ---------- | ------------------------ | ------------ |
| onclick    | 点击标签时触发           | 自己打印     |
| onchange   | 当前激活的标签改变时触发 | 自己打印     |

## 插槽

| **名称** | **说明**                               |
| -------- | -------------------------------------- |
| default  | 只接受 YikTab 组件                     |
| active   | 自定义标识符（作用域插槽，有参数传递） |

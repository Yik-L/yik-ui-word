<!--
 * @Author: 刘岩 15136056318@163.com
 * @Date: 2023-08-30 20:41:37
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-08-30 21:21:43
 * @FilePath: /yik-ui-word/docs/comps/Tabs.vue
 * @Description: 
-->
<template>
  <YikTabs_
    classNameActive="tabs-active"
    class="tabs"
    v-model:active="active"
    @onchange="onTabChange"
  >
    <YikTab_ class="tab"> 测试1 </YikTab_>
    <YikTab_ class="tab"> 测试2 </YikTab_>
    <YikTab_ class="tab"> 测试3 </YikTab_>
  </YikTabs_>
  {{ active }}
</template>
<script setup>
import "./style.css";
import { YikTabs_, YikTab_ } from "./yik-ui.js";
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

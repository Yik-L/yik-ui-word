<!--
 * @Author: 刘岩 15136056318@163.com
 * @Date: 2023-08-03 17:16:10
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-08-03 17:31:31
 * @FilePath: \yik-ui\docs\comps\marquee.vue
 * @Description: 
-->
<template>
  <YikScroll
    @onWatch="watch"
    style="width: 500px; height: 100px; border: 10px solid red"
  >
    <div class="content" v-for="item in 5"></div>
    <template #loading>
      <span v-show="loading == 1">加载中...</span>
      <span v-show="loading == 2">没有更多了</span>
    </template>
  </YikScroll>
</template>
<script setup>
import YikUi from "@yik_l/ui";
console.log(YikUi);
const { YikScroll } = YikUi;
const watch = (e) => {
  console.log(e);
};
</script>
<style lang="less" scoped>
.content {
  height: 50px;
  margin-bottom: 10px;
}
</style>

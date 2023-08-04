<!--
 * @Author: 刘岩 15136056318@163.com
 * @Date: 2023-08-03 17:16:10
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-08-04 10:18:40
 * @FilePath: \yik-ui-word\docs\comps\Scroll.vue
 * @Description: 
-->
<template>
  <button @click="scroll = 100">100</button>
  <button @click="scroll = 200">200</button>
  <YikScroll
    :scroll="scroll"
    @onBottom="handleBottom"
    @onTop="handleTop"
    @onWatch="handleWatch"
    style="height: 100px; border: 1px solid rgb(14, 190, 234)"
  >
    <p class="p" v-for="item in 5">
      {{ item }}
    </p>
    <template #loading>
      <span v-show="loading == 1">加载中...</span>
      <span v-show="loading == 2">没有更多了</span>
    </template>
  </YikScroll>
  <br />
  <div ref="content" class="console">
    <p v-for="(item, index) in list" :key="index">{{ item }}</p>
  </div>
</template>
<script setup>
import { YikScroll } from "@yik_l/ui";
import { ref, nextTick, reactive, toRefs } from "vue";
const content = ref(null);
const state = reactive({
  list: [],
  loading: 0,
  scroll: 10,
});
const { list, loading, scroll } = toRefs(state);
const handleBottom = () => {
  state.list.push("bottom");
  state.loading = 1;
  setTimeout(() => {
    state.loading = 2;
  }, 3000);
  setTop();
};
const handleTop = () => {
  state.list.push("top");
  setTop();
};
const handleWatch = (_data) => {
  state.list.push(JSON.stringify(_data));
  setTop();
};
const setTop = () => {
  nextTick(() => {
    content.value.scrollTop = content.value.scrollHeight;
  });
};
</script>
<style lang="less" scoped>
.p {
  height: 50px;
  margin-bottom: 10px;
}
.console {
  height: 100px;
  overflow: auto;
  background-color: #000;
  color: #00db12;
}
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

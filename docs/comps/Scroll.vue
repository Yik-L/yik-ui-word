<!--
 * @Author: 刘岩 15136056318@163.com
 * @Date: 2023-08-03 17:16:10
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-08-16 16:26:50
 * @FilePath: \yik-ui-word\docs\comps\Scroll.vue
 * @Description: 
-->
<template>
  <button @click="scrollRef.setScroll(100)">100</button>
  <button @click="scrollRef.setScroll(200)">200</button>
  <YikScroll
    ref="scrollRef"
    :loading="loading"
    @onBottom="handleBottom"
    @onTop="handleTop"
    @onWatch="handleWatch"
    style="height: 100px; border: 1px solid rgb(16, 185, 129)"
  >
    <p class="p" v-for="item in 5">
      {{ item }}
    </p>
  </YikScroll>
  <br />
  <div ref="content" class="console">
    <p v-for="(item, index) in list" :key="index">{{ item }}</p>
  </div>
</template>
<script setup>
import "./style.css";
import { YikScroll } from "./yik-ui.js";
import { ref, nextTick, reactive, toRefs } from "vue";
const scrollRef = ref(null);
const content = ref(null);
const state = reactive({
  list: [],
  loading: true,
  scroll: 10,
});
const { list, loading, scroll } = toRefs(state);
const handleBottom = () => {
  state.list.push("bottom");
  setTimeout(() => {
    state.loading = false;
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
  background-color: #10b981;
  font-size: 14px;
  color: #fff;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>

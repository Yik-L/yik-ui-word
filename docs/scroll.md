<!--
 * @Author: 刘岩 15136056318@163.com
 * @Date: 2023-08-03 21:26:00
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-08-04 09:39:52
 * @FilePath: \yik-ui-word\docs\scroll.md
 * @Description:
-->
<script setup>
  import Scroll from './comps/Scroll.vue'
</script>

# 滚动加载

瀑布流滚动加载，用于展示长列表，当列表即将滚动到底部时，会触发事件并加载更多列表项。

## 基础用法

<Scroll></Scroll>

## 示例代码

```vue
<template>
  <button @click="scroll = 100">100</button>
  <button @click="scroll = 200">200</button>
  <br />
  <br />
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
import YikUi from "@yik_l/ui";
const { YikScroll } = YikUi;
import { ref, nextTick, reactive, toRefs } from "vue";
const content = ref(null);
const state = reactive({
  list: [],
  loading: 0,
  scroll: 0,
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
  padding: 10px 20px;
  background-color: #1a89fa;
  font-size: 16px;
  color: #fff;
  border-radius: 10px;
  margin-right: 20px;
}
</style>
```

## 属性

| **属性名** | **说明**       | **类型** | **默认值** |
| ---------- | -------------- | -------- | ---------- |
| scroll     | 设置滚动条位置 | number   | 0          |

## 事件

| **事件名** | **说明**       | **回调参数**     |
| ---------- | -------------- | ---------------- |
| onBottom   | 滚动到底部触发 | undefine         |
| onTop      | 滚动到顶部触发 | undefine         |
| onWatch    | 滚动时触发     | 示例中有返回参数 |

## 插槽

| **名称名** | **说明**           |
| ---------- | ------------------ |
| default    | 列表内容           |
| loading    | 插入到列表内容最后 |

<!--
 * @Author: 刘岩 15136056318@163.com
 * @Date: 2023-08-03 21:26:00
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-08-11 15:25:27
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
  <button @click="scrollRef.setScroll(100)">100</button>
  <button @click="scrollRef.setScroll(200)">200</button>
  <YikScroll
    ref="scrollRef"
    :loading="loading"
    @onBottom="handleBottom"
    @onTop="handleTop"
    @onWatch="handleWatch"
    style="height: 100px; border: 1px solid rgb(14, 190, 234)"
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
import YikUi from "./yik-ui.js";
import { ref, nextTick, reactive, toRefs } from "vue";
const { YikScroll } = YikUi;
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
  background-color: #1a89fa;
  font-size: 14px;
  color: #fff;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
```

## 属性

| **属性名** | **说明**         | **类型** | **默认值** |
| ---------- | ---------------- | -------- | ---------- |
| loading    | 是否处于加载状态 | Number   | true       |

## 事件

| **事件名** | **说明**       | **回调参数**     |
| ---------- | -------------- | ---------------- |
| onBottom   | 滚动到底部触发 | -                |
| onTop      | 滚动到顶部触发 | -                |
| onWatch    | 滚动时触发     | 示例中有返回参数 |

## 插槽

| **名称** | **说明**                   |
| -------- | -------------------------- |
| default  | 列表内容                   |
| loading  | 自定义底部加载中提示       |
| finished | 自定义加载完成后的提示文案 |

## 方法

| **名称**  | **说明**   | **参数**                                                                | **返回值** |
| --------- | ---------- | ----------------------------------------------------------------------- | ---------- |
| setScroll | 设置滚动值 | （scrollValue, autoLoadScroll = false）：（滚动条值，是否自动开启请求） | -          |
| getScroll | 获取滚动值 | -                                                                       | Number     |

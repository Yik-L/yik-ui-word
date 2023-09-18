<!--
 * @Author: 刘岩 15136056318@163.com
 * @Date: 2023-09-09 21:14:53
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-09-18 15:02:00
 * @FilePath: \yik-ui-word\docs\comps\use-auth\index.vue
 * @Description
-->
<template>
  <Auth
    :ref="
      (e) =>
        array.push({
          ref: e,
          power: [10, 11],
        })
    "
  ></Auth>
  <div
    :ref="
      (e) =>
        array.push({
          ref: e,
          power: [20],
        })
    "
  >
    我是dom元素
  </div>
  <div ref="noArray">不通过数组实现</div>
  <button @click="handleAuth">执行权限</button>
</template>
<script setup>
import Auth from "./Auth.vue";
import { useAuth, global } from "../yik-ui.js";
import { ref } from "vue";
global({
  auth: [1, 2, 3, 4, 5, 6, 7, 8, 9],
});
const array = ref([]);
const noArray = ref(null);
const handleAuth = () => {
  // 第一种
  useAuth(array, {
    ref: "ref",
    power: "power",
  });
  // 第二种
  useAuth(noArray, 10);
  // 第三种
  // useAuth(noArray, [11,1]);
};
</script>
<style lang="less" scoped>
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

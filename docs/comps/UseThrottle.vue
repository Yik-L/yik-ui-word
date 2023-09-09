<!--
 * @Author: 刘岩 15136056318@163.com
 * @Date: 2023-09-06 21:06:12
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-09-09 22:56:13
 * @FilePath: /yik-ui-word/docs/comps/UseThrottle.vue
 * @Description: 
-->
<template>
  <input style="border: 1px solid #12b981" placeholder="节流" @input="input" />
  {{ desc }}
</template>
<script setup>
import { useThrottle } from "./yik-ui.js";
import { shallowRef } from "vue";
const desc = shallowRef("");
const input = useThrottle((e) => {
  desc.value = e.target.value;
}, 1000);
</script>
<style lang="less" scoped></style>

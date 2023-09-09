<!--
 * @Author: 刘岩 15136056318@163.com
 * @Date: 2023-08-30 20:38:15
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-09-09 22:56:01
 * @FilePath: /yik-ui-word/docs/comps/UseResize.vue
 * @Description: 
-->
<template>
  <br />
  <div
    style="position: relative"
    :style="{ height: data.height + 'px', width: data.width + 'px' }"
  >
    <div ref="divRef" class="div-ref"></div>
    <span class="height">高度：{{ data.height }}px</span>
    <span class="width">宽度：{{ data.width }}px</span>
  </div>
  <br />
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useResize } from "./yik-ui.js";
const divRef = ref(null);
const data = ref({
  height: 200,
  width: 200,
});
onMounted(() => {
  useResize({
    el: divRef.value,
    onChange: (e) => {
      data.value = e;
    },
    onStart: (e) => {},
    onEnd: (e) => {},
  });
});
</script>
<style lang="less" scoped>
.div-ref {
  width: 200px;
  height: 200px;
  border: 2px solid #10b981;
  cursor: se-resize;
}
.height {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.width {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
</style>

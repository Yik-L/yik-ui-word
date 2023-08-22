<template>
  <div ref="divRef" class="div-ref"></div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useResize_ } from "./yik-ui.js";
const divRef = ref(null);
onMounted(() => {
  useResize_({
    el: divRef.value,
    onChange: (e) => {},
    onStart: (e) => {},
    onEnd: (e) => {},
  });
});
</script>
<style lang="less" scoped>
.div-ref {
  width: 100px;
  height: 100px;
  border: 2px solid #10b981;
  cursor: se-resize;
}
</style>

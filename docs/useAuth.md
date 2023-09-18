<script setup>
  import UseAuth from './comps/use-auth/index.vue'
</script>

# useAuth

## 基本用法

<UseAuth></UseAuth>

```vue
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
import { useAuth, global } from "@yik_l/ui";
import { ref } from "vue";
//设置全部权限
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
```

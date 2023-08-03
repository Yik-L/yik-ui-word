<!--
 * @Author: 刘岩 
 * @Date: 2023-08-03 09:43:07
 * @LastEditors: 刘岩 
 * @LastEditTime: 2023-08-03 09:56:32
 * @FilePath: \yik-ui\docs\vue\MaxView.vue
 * @Description: 
-->
<template>
  <ClientOnly>
    <YikMaxView> </YikMaxView>
  </ClientOnly>
</template>
<script setup>
import * as YikUi from "@yik_l/ui";
const YikMaxView = YikUi.YikMaxView;
</script>
<style lang="less"></style>

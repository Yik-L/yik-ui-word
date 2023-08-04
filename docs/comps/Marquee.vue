<!--
 * @Author: 刘岩 15136056318@163.com
 * @Date: 2023-08-04 13:51:35
 * @LastEditors: 刘岩 15136056318@163.com
 * @LastEditTime: 2023-08-04 13:51:41
 * @FilePath: \yik-ui-word\docs\comps\Marquee.vue
 * @Description: 
-->
<template>
  <div>
    <YikMarquee
      direction="Y"
      style="height: 100px; border: 1px solid rgb(14, 190, 234)"
    >
      <div>
        <p v-for="item in 20">{{ item }}</p>
      </div>
    </YikMarquee>
    <br />
    <YikMarquee
      :speed="1"
      direction="X"
      style="border: 1px solid rgb(14, 190, 234)"
    >
      <div>
        <p>
          1、就我个人来说, 随机一段废话对我的意义, 不能不说非常重大. 一般来讲,
          我们都必须务必慎重的考虑考虑. 随机一段废话的发生, 到底需要如何做到,
          不随机一段废话的发生, 又会如何产生. 随机一段废话因何而发生?现在,
          解决随机一段废话的问题, 是非常非常重要的. 所以,
          对我个人而言，随机一段废话不仅仅是一个重大的事件，还可能会改变我的人生.
          带着这些问题, 我们来审视一下随机一段废话.
        </p>
      </div>
    </YikMarquee>
  </div>
</template>
<script setup>
import YikUi from "@yik_l/ui";
const { YikMarquee } = YikUi;
</script>

<template>
  <swiper :interval="3000">
    <swiper-item v-for="(item, index) in swipeImgs" :key="index">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper/index.js";

export default {
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    swipeImgs: Array,
  },
};
</script>

<style lang="scss" scoped>
</style>
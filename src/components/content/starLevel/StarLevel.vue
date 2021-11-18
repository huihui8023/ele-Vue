<template>
  <div class="star">
    <i
      class="fa"
      v-for="(item, index) in itemClasses"
      :key="index"
      :class="item"
    ></i>
  </div>
</template>

<script>
// 星星长度
const LENGTH = 5;
// 星星对应的class
const CLS_ON = "fa-star";
const CLS_HALF = "fa-star-half-empty";
const CLS_OFF = "fa-star-o";

export default {
  props: {
    rating: Number,
  },
  computed: {
    itemClasses() {
      //  如果4.8 则4个全星 一个半星
      let result = [];
      // 得到分数
      let score = Math.floor(this.rating * 2) / 2;
      // 得到小数 小数只有一个
      let haveDecimal = score % 1 !== 0;
      // 得到整数
      let integer = Math.floor(score);
      // 全星放入数组
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      // 判断是否有半星
      if (haveDecimal) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    },
  },
};
</script>

<style scoped>
.star {
  margin-right: 1.066667vw;
  color: #ffbe00;
  display: inline-block;
}
</style>
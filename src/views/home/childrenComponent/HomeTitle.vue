<template>
  <!-- 推荐商家 -->
  <div class="shoplist-title">推荐商家</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";

.shoplist-title {
  display: flex;
  align-items: flex;
  justify-content: center;
  height: 9.6vw;
  line-height: 9.6vw;
  font-size: 16px;
  color: #333;
  background: #fff;
  &:after,
  &:before {
    display: block;
    content: "一";
    width: 5.333333vw;
    height: 0.266667vw;
    color: #999;
  }
  &:after {
    margin-left: 3.466667vw;
  }
  &:before {
    margin-right: 3.466667vw;
  }
}
</style>
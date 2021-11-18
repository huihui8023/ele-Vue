<template>
  <div class="search" :class="{ fixedview: isShow }">
    <div class="search_content">
      <i class="el-icon-search"></i>
      搜索商家 商家名称
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";

.search {
  width: 100%;
  background-color: $blue;
  height: 45px;
  color: $gray;
  text-align: center;
  @include font(16px, 30px);
  overflow: hidden;
  z-index: 99;
  .search_content {
    margin-top: 7.5px;
    width: 85%;
    height: 30px;
    background-color: #fff;
    @include borderRadius(5px);
    margin-left: 50%;
    transform: translateX(-50%);
  }
}

.fixedview {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
}
</style>
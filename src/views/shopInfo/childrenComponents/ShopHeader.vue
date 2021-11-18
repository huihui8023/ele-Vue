<template>
  <div class="header">
    <div class="header_bg">
      <img :src="shopInfoData.scheme" alt="" />
    </div>
    <div class="header_back">
      <i class="fa fa-chevron-left" @click="$router.push('/home')"></i>
    </div>
    <div class="shop_image">
      <img :src="shopInfoData.image_path" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopHeader",
  props: {
    shopInfoData: Object,
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;

  .header_bg {
    img {
      width: 100%;
      height: 26.666667vw;
    }
  }

  .header_back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 26.666667vw;
    background: rgba(0, 0, 0, 0.5);

    i {
      color: #fff;
      font-size: 1.3rem;
      margin-left: 1.333333vw;
      margin-top: 1.333333vw;
    }
  }

  .shop_image {
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -10vw;
    margin-top: 11vw;
    img {
      width: 20vw;
      height: 20vw;
      border-radius: 0.8vw;
    }
  }
}
</style>
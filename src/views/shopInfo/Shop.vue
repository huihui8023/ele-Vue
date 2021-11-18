<template>
  <div class="shop">
    <shop-header
      v-if="shopInfoData"
      :shopInfoData="shopInfoData.rst"
    ></shop-header>
    <!-- 商家信息 -->
    <shop-info v-if="shopInfoData" :shopInfoData="shopInfoData.rst"></shop-info>
    <!-- 导航 -->
    <shop-nav-bar></shop-nav-bar>
    <router-view></router-view>
    <shop-cart v-if="shopInfoData" :shopInfoData="shopInfoData"></shop-cart>
  </div>
</template>

<script>
import { _getShopInfoData } from "@/network/shop.js";
import ShopHeader from "./childrenComponents/ShopHeader.vue";
import ShopInfo from "./childrenComponents/ShopInfo.vue";
import ShopNavBar from "./childrenComponents/shopNavBar/ShopNavBar.vue";
import ShopCart from "./childrenComponents/ShopCart.vue";
export default {
  name: "Shop",
  data() {
    return {
      shopInfoData: null,
    };
  },
  components: {
    ShopHeader,
    ShopInfo,
    ShopNavBar,
    ShopCart,
  },
  created() {
    this.getShopInfoData();
  },
  methods: {
    getShopInfoData() {
      _getShopInfoData().then((res) => {
        // console.log(res);
        this.shopInfoData = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
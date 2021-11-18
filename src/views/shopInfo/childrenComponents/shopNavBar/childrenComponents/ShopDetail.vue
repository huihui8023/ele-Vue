<template>
  <div class="shop_detail" v-if="seller">
    <section>
      <img :src="seller.header_image" alt="" />
      <h3>{{ seller.title }}</h3>
      <p>{{ seller.brand_intros[0].brief }}</p>
      <div>查看品牌故事</div>
    </section>
  </div>
</template>

<script>
import { _getShopSeller } from "@/network/shop.js";
export default {
  name: "ShopDetail",
  data() {
    return {
      seller: null,
    };
  },
  created() {
    this.getShopSeller();
  },
  methods: {
    getShopSeller() {
      _getShopSeller().then((res) => {
        // console.log(res.data);
        this.seller = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.shop_detail section {
  margin-bottom: 2.666667vw;
  padding: 4.266667vw 4vw 4vw;
  font-size: 0.9rem;
  background-color: #fff;
  color: #666;
  border-bottom: 1px solid #eee;

  > img {
    width: 92vw;
    height: 52vw;
    margin-bottom: 4.266667vw;
  }

  > h3 {
    color: #333;
    font-weight: 700;
    font-size: 1rem;
    margin-bottom: 1.066667vw;
  }

  > p {
    height: 40px;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  > div {
    margin: 4vw 0 -4vw;
    text-align: center;
    font-size: 0.346667rem;
    padding: 4vw 0;
  }
}
</style>
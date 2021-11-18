<template>
  <div class="food">
    <i class="el-icon-circle-close icon" @click="closeFood"></i>
    <img :src="food.image_path" alt="" />
    <div class="info">
      <p class="name">{{ food.name }}</p>
      <div class="foodpanel-foodsales">
        <span>月售{{ food.month_sales }}</span>
        <span>好评率 {{ food.satisfy_rate }}%</span>
      </div>
      <div class="foodpanel-priceLine">
        <span>¥{{ food.activity.fixed_price }}</span>
        <cart-control :food="food" class="cart-btn"></cart-control>
      </div>
      <p class="des">{{ food.description }}</p>
    </div>
  </div>
</template>

<script>
import CartControl from "../../../../../../components/content/cartControl/CartControl.vue";
export default {
  name: "ShopFood",

  components: { CartControl },
  props: {
    food: Object,
  },
  methods: {
    closeFood() {
      this.$emit("closeFood");
    },
  },
};
</script>

<style lang="scss" scoped>
.food {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 99;

  img {
    width: 100%;
  }

  .icon {
    position: fixed;
    top: 10px;
    right: 20px;
    font-size: 30px;
  }

  .info {
    padding: 4vw 4vw 0;
    width: 100%;
    min-height: 29.333333vw;

    .name {
      display: flex;
      align-items: center;
      margin-bottom: 2.4vw;
      font-size: 1.2rem;
      font-weight: 700;
      width: 74.666667vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .foodpanel-foodsales {
      font-size: 0.8rem;
      color: #666;
      line-height: 1;
      margin-bottom: 2.4vw;
    }

    .foodpanel-priceLine {
      display: flex;
      align-items: center;
      margin-bottom: 2.4vw;
      position: relative;

      span {
        font-size: 1rem;
        line-height: 4.266667vw;
        color: #ff5339;
        padding-bottom: 0.933333vw;
        display: flex;
        align-items: baseline;
      }

      .cart-btn {
        position: absolute;
        right: 8vw;
      }
    }

    .des {
      font-size: 0.8rem;
      color: #666;
      line-height: 3.733333vw;
      padding-right: 8vw;
    }
  }
}
</style>
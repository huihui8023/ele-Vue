<template>
  <div>
    <div class="shop_cart">
      <div class="cart" @click="showMask">
        <div class="icon" :class="{ active: sum }">
          <p class="num" v-if="sum">{{ sum }}</p>
          <i class="fa fa-cart-plus"></i>
        </div>
      </div>
      <div class="price" @click="showMask">
        <p v-if="!sum" class="without">你还未选购商品</p>
        <p v-else class="num">¥{{ totalPrice.toFixed(2) }}</p>
        <p class="cost">另需配送费{{ shopInfoData.rst.float_delivery_fee }}</p>
      </div>
      <div class="pay" :class="{ active: sum }">
        <span v-if="!sum"
          >¥{{ shopInfoData.rst.float_minimum_order_amount }}元起送</span
        >
        <span v-else>去结算</span>
      </div>
    </div>
    <div class="mask" v-show="isShow" @click.self="closeMask">
      <div class="mask_wrap">
        <header>
          <span>已选商品</span>
          <button @click="clearCart">
            <i class="fa fa-trash-o"></i>
            <span>清空</span>
          </button>
        </header>
        <ul v-for="(item, index) in getCartList" :key="index" class="list">
          <li>
            <span class="name">{{ item.name }}</span>
            <span class="price"
              >¥{{ (item.activity.fixed_price * item.count).toFixed(2) }}</span
            >
            <cart-control :food="item"></cart-control>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CartControl from "@/components/content/cartControl/CartControl.vue";
export default {
  name: "ShopCart",
  components: { CartControl },
  props: {
    shopInfoData: Object,
  },
  data() {
    return {
      isShow: false,
      cartArr: [],
    };
  },
  computed: {
    sum() {
      return this.$store.state.cartList.reduce(
        (pre, item) => pre + item.count,
        0
      );
    },
    totalPrice() {
      return this.$store.state.cartList
        .filter((item) => item != 0)
        .reduce((pre, item) => pre + item.activity.fixed_price * item.count, 0);
    },
    getCartList() {
      return this.$store.state.cartList;
    },
  },
  methods: {
    showMask() {
      this.isShow = !this.isShow;
    },
    closeMask() {
      this.isShow = false;
    },
    clearCart() {
      this.$store.dispatch("clearCart");
    },
  },
};
</script>

<style lang="scss" scoped>
.shop_cart {
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 49px;
  background-color: rgba(61, 61, 63, 0.9);
  z-index: 99;

  .cart {
    position: relative;
    flex: 1;
    text-align: center;
    .icon {
      position: absolute;
      top: -15px;
      left: 32px;
      width: 35px;
      height: 35px;
      background-color: rgb(0, 0, 0);
      border-radius: 25px;
      line-height: 35px;
      border: 5px solid #333;
      box-shadow: 0 -0.8vw 0.533333vw 0 rgba(0, 0, 0, 0.1);
      box-sizing: content-box;
      i {
        display: inline-block;
        font-size: 20px;
      }
      .num {
        position: absolute;
        top: -10px;
        left: 25px;
        font-size: 12px;
        text-align: center;
        line-height: 1;
        background-image: linear-gradient(-90deg, #ff7416, #ff3c15 98%);
        border-radius: 12.5px;
        color: #fff;
        padding: 2px 4px;
      }
    }
    .active {
      background-color: #409eff;
      i {
        color: #fff;
      }
    }
  }

  .price {
    flex: 2;
    color: #999;
    font-size: 15px;
    .num,
    .without {
      margin-top: 6px;
    }
  }

  .pay {
    flex: 1;
    text-align: center;
    line-height: 45px;
    color: #fff;
  }
  .active {
    background-color: rgb(76, 143, 76);
  }
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 49px;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 98;

  .mask_wrap {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
    background-color: #fff;

    header {
      width: 100%;
      height: 40x;
      background-color: #eceff1;
      line-height: 40px;
      color: #666;
      font-size: 16px;
      button {
        float: right;
        margin: 10px 10px 0 0;
        background-color: #eceff1;
        border: 0;
        color: #666;
        font-size: 14px;
      }
    }

    ul {
      li {
        display: flex;
        justify-content: space-between;
        height: 60px;
        background-color: #fff;
        span {
          line-height: 60px;
        }
        .name {
          display: inline-block;
          width: 160px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .price {
          color: rgb(255, 83, 57);
        }
      }
    }
  }
}
</style>
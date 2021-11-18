<template>
  <div class="shop_order">
    <!-- 商家推荐 -->
    <div class="recommend" v-if="recommend">
      <p class="recommend-name">{{ recommend[0].name }}</p>
      <div class="recommend-wrap">
        <ul>
          <li v-for="(item, index) in recommend[0].items" :key="index">
            <img :src="item.image_path" alt="" />
            <div class="recommend-food-name">{{ item.name }}</div>
            <div class="recommend-food-info">
              月售{{ item.month_sales }} 好评率{{ item.satisfy_rate }}
            </div>
            <div class="recommend-food-price">
              <p>¥{{ item.activity.fixed_price }}</p>
              <cart-control :food="item"></cart-control>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="goods_list">
      <!-- 左侧列表 -->
      <div class="menu">
        <ul>
          <li
            v-for="(item, index) in menu"
            :key="index"
            @click="selectItem(index)"
            :class="{ current: currentIndex === index }"
          >
            {{ item.name }}
            <img v-if="item.icon_url" :src="item.icon_url" alt />
          </li>
        </ul>
      </div>
      <!-- 右侧详情 -->
      <div class="info">
        <scroll
          ref="scroll"
          class="content"
          @scroll="scroll"
          :preventDefault="preventDefault"
          @scrollEnd="scrollEnd"
        >
          <div
            class="info_wrapper"
            v-for="(item, index) in menu"
            :key="index"
            ref="info_wrapper"
          >
            <!-- title -->
            <span class="title">{{ item.name }}</span>
            <span>{{ item.description }}</span>
            <!-- goods -->
            <div
              v-for="(items, index) in item.foods"
              :key="index"
              class="goods_detail"
              @click="handleFood(items)"
            >
              <img :src="items.image_path" alt="" />
              <div class="detail">
                <h4>{{ items.name }}</h4>
                <p class="des">{{ items.description }}</p>
                <p class="sales">
                  月售{{ items.month_sales }}份 好评率{{ items.satisfy_rate }}
                </p>
                <div class="price">
                  <span>¥{{ items.activity.fixed_price }}</span>
                  <cart-control :food="items" class="cart"></cart-control>
                </div>
              </div>
            </div>
          </div>
        </scroll>
      </div>
    </div>

    <!-- 商品页面 -->
    <shop-food
      v-if="isFoodShow && foods"
      :food="foods"
      @closeFood="closeFood"
    ></shop-food>
  </div>
</template>

<script>
import { _getShopInfoData } from "@/network/shop.js";
import CartControl from "@/components/content/cartControl/CartControl.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";
import ShopFood from "./childrenComponents/ShopFood.vue";

export default {
  name: "shopOrder",
  data() {
    return {
      recommend: null, //推荐数据
      menu: null, //菜单/菜单列表数据
      goodsListHeight: [], //商品列表高度
      scrollY: 0, // 当前滚动位置
      preventDefault: false, //浏览器原生滚动
      foods: null,
      isFoodShow: false,
    };
  },
  components: {
    CartControl,
    Scroll,
    ShopFood,
  },
  created() {
    this.getShopData();
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    currentIndex() {
      // 根据每个list间隔 计算出scroll.y在当前位置处于哪个menu的下标
      for (let i = 0; i < this.goodsListHeight.length; i++) {
        let height1 = this.goodsListHeight[i];
        let height2 = this.goodsListHeight[i + 1];

        if (this.scrollY >= height1 && this.scrollY < height2) {
          return i;
        }
      }
      return 0;
    },
  },
  methods: {
    getShopData() {
      _getShopInfoData().then((res) => {
        console.log(res);
        res.data.recommend.forEach((recommend) => {
          recommend.items.forEach((item) => {
            item.count = 0;
          });
        });
        this.recommend = res.data.recommend;

        res.data.menu.forEach((menu) => {
          menu.foods.forEach((food) => {
            food.count = 0;
          });
        });
        this.menu = res.data.menu;
        this.$nextTick(() => {
          this.calculateHeight();
        });
      });
    },
    // 点击跳转列表位置
    selectItem(index) {
      let arr = this.$refs.info_wrapper;
      let el = arr[index];
      this.$refs.scroll.bsscroll.scrollToElement(el, 150);
    },
    // 计算list高度
    calculateHeight() {
      // 获取元素数组
      let el = this.$refs.info_wrapper;
      let height = 0;
      // 添加一个首位0
      this.goodsListHeight.push(height);
      // 遍历每个元素，将元素高度叠加
      for (let i = 0; i < el.length; i++) {
        let item = el[i].clientHeight;
        height += item;
        this.goodsListHeight.push(height);
      }
    },
    // scroll滚动
    scroll(position) {
      this.scrollY = Math.round(Math.abs(position.y)) + 50;
    },
    handleScroll() {
      let scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 当事件派发后是否阻止浏览器默认行为。这个值应该设为 true
      if (scroll > this.$refs.scroll.$el.offsetTop) {
        // console.log("开启enable");
        // this.$refs.scroll.bsscroll.enable();
        this.preventDefault = true;
      } else {
        // console.log("开启disable");
        this.preventDefault = false;
        // this.$refs.scroll.bsscroll.disable();
      }
    },
    scrollEnd() {
      this.preventDefault = false;
    },
    // 点击食品
    handleFood(food) {
      this.foods = food;
      this.isFoodShow = true;
    },
    // 关闭食品
    closeFood() {
      this.isFoodShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.shop_order {
  position: relative;
  height: 100%;
}

.recommend {
  padding-top: 4.266667vw;
  background-color: #fff;

  .recommend-name {
    padding-left: 4.266667vw;
    color: #333;
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 2.666667vw;
  }

  .recommend-wrap {
    overflow-x: scroll;
    display: flex;
    width: 100%;

    ul {
      display: flex;
      padding-left: 4.266667vw;

      li {
        flex: none;
        list-style: none;
        width: 32vw;
        margin-right: 2.666667vw;

        img {
          display: block;
          width: 32vw;
          height: 32vw;
          border-top-left-radius: 0.8vw;
          border-top-right-radius: 0.8vw;
          max-width: 100%;
        }

        .recommend-food-name {
          color: #333;
          font-size: 0.8rem;
          margin: 1.866667vw 0 1.233333vw;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .recommend-food-info {
          color: #999;
          font-size: 0.6rem;
          margin-bottom: 1.866667vw;
          min-height: 1em;
        }

        .recommend-food-price {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-right: 0.266667vw;

          p {
            font-size: 1rem;
            color: #ff5339;
          }
        }
      }
    }
  }
}
.goods_list {
  display: flex;

  .menu {
    // height: calc(100vh - 12.8vw);
    background-color: #f8f8f8;
    // width: 100px;
    flex: 1;
    box-sizing: border-box;
    ul {
      li {
        list-style: none;
        height: 50px;
        font-size: 14px;
        padding-top: 16px;
        padding-left: 10px;
        // &:hover {
        //   background-color: #fff;
        // }
        img {
          width: 3.466667vw;
          height: 3.466667vw;
          vertical-align: top;
          margin-right: 0.8vw;
        }
      }
    }
  }

  .info {
    flex: 3;
    height: calc(100vh - 20.8vw);
    overflow-y: hidden;

    .content {
      height: calc(100vh - 43.8vw);
    }

    .info_wrapper {
      width: 100%;
      .title {
        font-size: 0.8rem;
        font-weight: 700;
        margin: 20px;
        margin-right: 10px;
        color: #666;
      }
      span {
        font-size: 0.6rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #666;
      }
      .goods_detail {
        display: flex;
        img {
          flex: 1;
          padding: 10px;
          width: 25.333333vw;
          height: 25.333333vw;
        }

        .detail {
          flex: 2;
          width: 100%;
          overflow: hidden;
          padding: 15px;
          h4 {
            font-weight: 700;
            overflow: hidden;
            font-size: 1rem;
            white-space: nowrap;
            width: 40vw;
            text-overflow: ellipsis;
            color: #333;
          }
          .des {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .sales,
          .des {
            font-size: 0.6rem;
            color: #999;
          }
          .sales {
            margin: 4px 0;
          }
          .price {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 3.733333vw;

            span {
              font-size: 1rem;
              line-height: 4.266667vw;
              color: #ff5339;
              padding-bottom: 0.933333vw;
              display: flex;
              align-items: baseline;
            }
            .cart {
              font-weight: 400;
            }
          }
        }
      }
    }
  }
  .current {
    background-color: #fff !important;
  }
}

::-webkit-scrollbar {
  width: 0 !important;
}
</style>
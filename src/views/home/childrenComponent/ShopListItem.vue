<template>
  <div class="shop_list_item" @click="$router.push('/shop')">
    <!-- 左侧图片 -->
    <div class="item_img">
      <img :src="item.image_path" alt="" />
    </div>
    <!-- 右侧信息 -->
    <div class="item_info">
      <!-- 第一行品牌 -->
      <div class="item_shopname">
        <i v-if="item.is_premium">品牌</i>
        <span>{{ item.name }}</span>
      </div>

      <!-- 第二行星级 -->
      <div class="item_rate_wrap">
        <div>
          <star-level :rating="item.rating"></star-level>
          <span class="rate">{{ item.rating }}</span>
          <span>月售{{ item.recent_order_num }}单</span>
        </div>
        <div v-if="item.delivery_mode" class="delivery">
          <span class="icon-hollow">{{ item.delivery_mode.text }}</span>
        </div>
      </div>

      <!-- 第三行配送 -->
      <div class="item_limit">
        <div>
          <span>¥{{ item.float_minimum_order_amount }}起送</span>
          |
          <span>配送费¥{{ item.float_delivery_fee }}</span>
        </div>
        <div class="iten_limit_distance">
          <span>{{ (item.distance / 1000).toFixed(2) }}KM</span>
          |
          <span>{{ item.order_lead_time }}分钟</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarLevel from "@/components/content/starLevel/StarLevel.vue";
export default {
  props: {
    item: Object,
  },
  components: {
    StarLevel,
  },
};
</script>

<style lang="scss" scoped>
.shop_list_item {
  display: flex;
  justify-content: flex-start;
  padding: 10px 2.666667vw;
  align-items: stretch;
  border-bottom: 1px solid #eee;
  .item_img {
    width: 17.333333vw;
    height: 17.333333vw;
    img {
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: 0.133333vw solid rgba(0, 0, 0, 0.08);
      border-radius: 0.533333vw;
    }
  }
  .item_info {
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    flex-direction: column;
    padding-left: 2.666667vw;
    font-size: 0.2rem;
    flex-grow: 1;
    .item_shopname {
      align-items: center;
      color: #333;
      font-weight: 700;
      font-size: 0.9rem;
      i {
        background: #ffe800;
        margin-right: 1.333333vw;
        padding: 0.266667vw 0.666667vw;
        text-align: center;
        white-space: nowrap;
        font-size: 0.6rem;
      }
      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .item_rate_wrap {
      display: flex;
      align-items: center;
      overflow: hidden;
      justify-content: space-between;
      .delivery {
        display: flex;
        align-items: center;
        font-size: 0.6rem;
        margin-left: 1.066667vw;
        .icon-hollow {
          color: #fff;
          background-color: #2395ff;
          padding: 2px;
          box-sizing: border-box;
        }
      }
    }
    .rate {
      margin-right: 1.066667vw;
    }
  }
  .item_limit {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .iten_limit_distance {
      color: #999;
    }
  }
}
</style>
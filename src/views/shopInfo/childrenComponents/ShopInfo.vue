<template>
  <div class="index_rst">
    <!-- 商家信息 -->
    <div class="rst_name">
      <span @click="showToast">{{ shopInfoData.name }}</span>
      <i class="fa fa-caret-right"></i>
    </div>

    <!-- 弹窗 -->
    <shop-toast
      :rst="shopInfoData"
      :isShow="isShow"
      @closeToast="isShow = false"
    ></shop-toast>

    <!-- 评分月售 -->
    <div class="rst_order">
      <span>评分{{ shopInfoData.rating }}</span>
      <span>月售{{ shopInfoData.recent_order_num }}单</span>
      <span>蜂鸟专送约{{ shopInfoData.order_lead_time }}分钟</span>
    </div>

    <!-- 优惠信息 -->
    <div class="rst_activity">
      <div class="activity_txt">
        <span
          :style="{ background: '#' + shopInfoData.activities[0].icon_color }"
          >{{ shopInfoData.activities[0].icon_name }}</span
        >
        <span>{{ shopInfoData.activities[0].description }}</span>
      </div>
      <div class="activity_count">
        <span>{{ shopInfoData.activities.length }}个优惠</span>
        <i class="fa fa-caret-down" @click="isShow = true"></i>
      </div>
    </div>

    <!-- 公告 -->
    <p class="rst_promotion">公告: {{ shopInfoData.promotion_info }}</p>
  </div>
</template>

<script>
import ShopToast from "./ShopToast.vue";
export default {
  data() {
    return {
      isShow: false,
    };
  },
  components: { ShopToast },
  props: {
    shopInfoData: Object,
  },
  methods: {
    showToast() {
      this.isShow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.index_rst {
  padding: 8vw 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  box-shadow: inset 0 -0.666667vw 0.666667vw hsla;

  .rst_name {
    flex: 1;
    width: 72vw;
    font-size: 1.3rem;
    font-weight: 700;
    white-space: nowrap;
    padding-right: 2.666667vw;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1.6vw 0;

    span {
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .rst_order {
    white-space: nowrap;
    height: 3.2vw;
    margin-top: 1.733333vw;
    color: #666;
    text-align: center;
    font-size: 0.6rem;

    span {
      margin: 0 3px;
    }
  }

  .rst_activity {
    display: flex;
    color: #333;
    margin: 3.2vw auto 0;
    align-items: center;
    font-size: 0.6rem;
    width: 80vw;

    .activity_txt {
      flex: 1;
      overflow: hidden;

      span:first-child {
        color: #fff;
        height: 4.466667vw;
        line-height: 3.466667vw;
        font-size: 0.6rem;
        padding: 0.533333vw 1.2vw;
        margin-right: 1.6vw;
        display: inline-block;
        box-sizing: border-box;
        border-radius: 0.266667vw;
      }
    }

    .activity-count {
      width: 16.266667vw;
      flex-shrink: 0;
      padding-right: 2.933333vw;
      text-align: right;
      color: #999;

      span {
        margin-right: 1vw;
      }
    }
  }

  .rst_promotion {
    width: 80vw;
    font-size: 0.6rem;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 2.266667vw auto 2.666667vw;
    padding: 0;
    white-space: nowrap;
  }
}
</style>
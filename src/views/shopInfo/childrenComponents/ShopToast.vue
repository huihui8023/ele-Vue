<template>
  <transition name="model">
    <div class="info" v-show="isShow">
      <!-- 信息 -->
      <div class="brief-modal">
        <!-- title -->
        <h2>
          <i v-if="rst.is_premium">品牌</i>
          <span>{{ rst.name }}</span>
        </h2>

        <!-- 评分 -->
        <ul>
          <li>
            <h3>{{ rst.rating }}</h3>
            <p>评分</p>
          </li>
          <li>
            <h3>{{ rst.recent_order_num }}</h3>
            <p>月售</p>
          </li>
          <li v-if="rst.delivery_mode">
            <h3>蜂鸟转送</h3>
            <p>约{{ rst.order_lead_time }}分钟</p>
          </li>

          <li>
            <h3>¥{{ rst.float_delivery_fee }}元</h3>
            <p>配送费</p>
          </li>
          <li>
            <h3>{{ (rst.distance / 1000).toFixed(1) }}km</h3>
            <p>距离</p>
          </li>
        </ul>

        <!-- 优惠 -->
        <div class="brief-favourable">
          <h2>优惠活动</h2>
          <ul>
            <li v-for="(item, index) in rst.activities" :key="index">
              <span
                :style="{ background: '#' + item.icon_color }"
                class="font"
                >{{ item.icon_name }}</span
              >
              <span class="description">{{ item.description }}</span>
            </li>
          </ul>
        </div>

        <!-- 公告 -->
        <h3 class="promotion">
          <span>公告</span>
        </h3>
        <p class="brief-modal-yx">{{ rst.promotion_info }}</p>
      </div>

      <!-- x号 -->
      <div class="brief-modal-close" @click="$emit('closeToast')">
        <img
          src="https://fuss10.elemecdn.com/8/ba/bcfa8cc62b20e044bd2ea1c1c7f3dpng.png?imageMogr/format/webp/"
          alt
        />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    rst: Object,
    isShow: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.model-enter,
.model-leave-to {
  opacity: 0;
}

.model-enter-active,
.model-leave-active {
  transition: opacity 0.5s ease;
}

.info {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;

  .brief-modal {
    position: relative;
    width: 80%;
    max-height: 125.333333vw;
    padding: 7.066667vw 6.666667vw 7.466667vw;
    border-radius: 1.066667vw;
    overflow: hidden;
    background: #fff;
    z-index: 100;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    h2 {
      font-size: 1.4rem;
      line-height: 6.666667vw;
      color: #333;
      text-align: center;
      font-weight: bolder;

      i {
        position: relative;
        top: -0.533333vw;
        margin-right: 1.6vw;
        border-radius: 0.266667vw;
        background-image: linear-gradient(90deg, #fff100, #ffe339);
        color: #6a3709;
        font-style: normal;
        padding: 0.8vw;
        font-weight: 700;
        font-size: 0.8rem;
      }
    }

    ul {
      display: flex;
      margin: 5.066667vw -6.666667vw 0;

      li {
        flex: 1;
        text-align: center;
        list-style: none;

        h3 {
          font-size: 0.9rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 1.6vw;
        }

        p {
          font-size: 0.293333rem;
          color: #999;
        }
      }
    }

    .promotion {
      position: relative;
      text-align: center;
      margin: 4.8vw auto 2.666667vw;
      width: 20.266667vw;
      background-image: linear-gradient(90deg, #fff, #333 50%, #fff);
      background-size: 100% 1px;
      background-position: 50%;
      background-repeat: no-repeat;

      span {
        font-size: 0.8rem;
        padding: 0 1.066667vw;
        color: #999;
        background-color: #fff;
      }
    }

    .brief-modal-yx {
      font-size: 0.8rem;
      line-height: 1.54;
      color: #333;
      max-height: 26.666667vw;
      overflow-y: auto;
    }
  }

  .brief-favourable {
    h2 {
      font-size: 1rem;
      line-height: 6.666667vw;
      color: #333;
      text-align: center;
      font-weight: bolder;
      margin-top: 25px;
    }
    ul {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      li {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 10px;

        .font {
          font-size: 0.9rem;
          font-weight: 600;
          color: #333;
        }

        .description {
          font-size: 0.3rem;
          color: #999;
        }
      }
      :nth-child(2n) {
        margin: 10px;
      }
    }
  }

  .brief-modal-close {
    margin-top: 8vw;
    width: 8vw;
    height: 8vw;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

// .fade-leave-active {
//   transition: opacity 0.25s ease-out;
// }

// .fade-enter,
// .fade-leave-to {
//   opacity: 0;
// }
</style>
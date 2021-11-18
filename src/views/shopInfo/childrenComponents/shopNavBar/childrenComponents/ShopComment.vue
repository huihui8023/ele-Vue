<template>
  <div class="shop_comment">
    <!-- 商家评分 -->
    <section class="rating-wrap">
      <div class="rating-info" v-if="evaluation">
        <h4>{{ evaluation.rating.shop_score.toFixed(1) }}</h4>
        <div class="shop-score">
          <span>商家评分</span>
          <StarLevel :rating="evaluation.rating.shop_score" />
        </div>
      </div>
      <div class="other-score" v-if="evaluation">
        <div>
          <span>味道</span>
          <p>{{ evaluation.rating.taste_score.toFixed(1) }}</p>
        </div>
        <div>
          <span>包装</span>
          <p>{{ evaluation.rating.package_score.toFixed(1) }}</p>
        </div>
        <div>
          <span>配送</span>
          <p>{{ evaluation.rating.rider_score.toFixed(1) }}</p>
        </div>
      </div>
    </section>

    <!-- 用户评价 -->
    <div class="shop-info">
      <!-- 标签 -->
      <ul class="tags" v-if="evaluation">
        <li
          v-for="(item, index) in evaluation.tags"
          :key="index"
          :class="{ unsatisfied: item.unsatisfied }"
        >
          {{ item.name }}

          <span v-if="item.count > 0"> {{ item.count }}</span>
        </li>
      </ul>
      <!-- 评论信息 -->
      <ul class="comments-wrap" v-if="evaluation">
        <li v-for="(item, index) in evaluation.comments" :key="index">
          <div class="comment-user">
            <img
              :src="
                item.avatar ||
                'https://shadow.elemecdn.com/faas/h5/static/sprite.3ffb5d8.png'
              "
              alt=""
            />
          </div>
          <div class="comments-info">
            <div class="comment-name">
              <h4>{{ item.username }}</h4>
              <h6>{{ item.rated_at }}</h6>
            </div>
            <div class="comment-rating">
              <star-level :rating="item.rating"></star-level>
              <span :style="{ color: calculateScore(item.rating).color }">{{
                calculateScore(item.rating).txt
              }}</span>
            </div>
            <div class="comment-text">{{ item.rating_text }}</div>
            <div class="comment-reply">{{ item.reply.content }}</div>
            <ul class="comment-imgs">
              <li v-for="(img, i) in item.order_images" :key="i">
                <img :src="img.image_hash" alt="" />
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import StarLevel from "../../../../../components/content/starLevel/StarLevel.vue";
import { _getShopComments } from "@/network/shop.js";
export default {
  name: "shopComment",
  data() {
    return {
      evaluation: null,
    };
  },
  components: { StarLevel },
  created() {
    this.getShopComments();
  },
  methods: {
    getShopComments() {
      _getShopComments().then((res) => {
        console.log(res);
        this.evaluation = res.data;
      });
    },
    calculateScore(score) {
      const elm = [
        { txt: "吐槽", color: "rgb(137,159,188)" },
        { txt: "较差", color: "rgb(137, 159, 188)" },
        { txt: "一般", color: "rgb(251, 154, 11)" },
        { txt: "满意", color: "rgb(251, 154, 11)" },
        { txt: "超赞", color: "rgb(255, 96, 0)" },
      ];
      return elm[score - 1];
    },
  },
};
</script>

<style lang="scss" scoped>
.shop_comment {
  height: calc(100% - 10.666667vw);
  line-height: 1.2;

  .rating-wrap {
    display: flex;
    margin-bottom: 2.133333vw;
    padding: 5.333333vw 0 8vw 6.4vw;
    background-color: #fff;

    .rating-info {
      display: flex;
      justify-content: space-between;
      width: 33.6vw;
      align-items: center;
      color: #666;

      h4 {
        align-items: center;
        font-size: 2.2rem;
        color: #ff6000;
      }

      .shop-score {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }

    .other-score {
      flex: 1;
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: #666;
      padding: 0 20px;
      text-align: center;
    }
  }

  .shop-info {
    background-color: #fff;
    padding: 2.666667vw 3.2vw 0;
    font-size: 0.8rem;

    .tags {
      padding-bottom: 2.666667vw;
      border-bottom: 1px solid #eee;

      li {
        color: #6d7885;
        background-color: #ebf5ff;
        display: inline-block;
        padding: 0 2.4vw;
        height: 7.466667vw;
        line-height: 7.466667vw;
        margin: 0.933333vw;
        font-size: 0.7rem;
        border-radius: 0.533333vw;
      }

      .unsatisfied {
        color: #aaa !important;
        background-color: #f5f5f5 !important;
      }
    }

    .comments-wrap > li {
      padding: 4vw 0 3.2vw;
      border-bottom: 0.133333vw solid #eee;
      display: flex;

      .comment-user {
        width: 10.666667vw;

        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }

      .comments-info {
        flex: 1;
        font-size: 0.9rem;

        .comment-name {
          display: flex;
          align-items: center;
          justify-content: space-between;

          h4 {
            margin-top: 0;
            color: #333;
            margin-right: 1.6vw;
          }

          h6 {
            font-size: 0.6rem;
            color: #999;
          }
        }

        .comment-rating {
          display: flex;
          margin: 1.6vw 0 0.533333vw;
          align-items: center;
        }

        .comment-text {
          color: #333;
          word-break: break-word;
          margin: 2.133333vw 0;
        }

        .comment-reply {
          margin: 2.666667vw 0;
          padding: 2.666667vw;
          border-radius: 1.066667vw;
          background: #f3f3f3;
          position: relative;
          font-size: 0.8rem;
        }

        .comment-reply::after {
          content: " ";
          position: absolute;
          bottom: 100%;
          left: 4vw;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 2.133333vw 2.133333vw;
          border-color: transparent transparent #f3f3f3;
        }

        .comment-imgs {
          margin-top: 1.066667vw;
          margin-bottom: 3.2vw;

          > li {
            display: inline-block;
            margin: 0 0.533333vw;

            img {
              width: 40vw;
              height: 40vw;
            }
          }
        }
      }
    }
  }
}
</style>
.<template>
  <div ref="wrapper">
    <div class="content">
      <slot> </slot>
    </div>
  </div>
</template>

<script>
import BetterScroll from "better-scroll";
import Pulldown from "@better-scroll/pull-down";

BetterScroll.use(Pulldown);

export default {
  name: "Scroll",
  data() {
    return {
      bsscroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    preventDefault: Boolean,
  },

  // 钩子方法中cteated无法操作dom元素 需要在mounted中操作
  mounted() {
    // 创建BetterScroll
    setTimeout(this.__initScroll, 20);
  },
  watch: {
    preventDefault() {
      this.bsscroll.destroy();
      setTimeout(this.__initScroll, 20);
    },
  },
  methods: {
    // 刷新
    // refresh() {
    //   this.scroll && this.scroll.refresh();
    // },

    // 初始化scroll
    __initScroll() {
      if (!this.$refs.wrapper) return;
      this.bsscroll = new BetterScroll(this.$refs.wrapper, {
        probeType: this.probeType, //0.1 不检测滑动 2检测手指滑动 3检测所有滑动
        pullUpLoad: true, //监听是否滚到底部
        click: true,
        observeDOM: true,
        observeImage: true,
        preventDefault: this.preventDefault,
        pullDownRefresh: true, //当顶部下拉距离超过阈值
        bounce: {
          //回弹动画
          top: false,
          bottom: true,
          left: true,
          right: true,
        },
      });
      //监听滚动位置
      this.bsscroll.on("scroll", (position) => {
        // console.log(position);
        this.$emit("scroll", position);
      });

      //监听上拉事件
      this.bsscroll.on("pullingUp", () => {
        // console.log("---正在加载---");
        this.$emit("pullingUp");

        setTimeout(() => {
          this.bsscroll.finishPullUp(); //重新开启加载
        }, 1000);
      });

      this.bsscroll.on("pullingDown", () => {
        console.log(111);

        setTimeout(() => {
          this.bsscroll.finishPullUp(); //重新开启加载
        }, 1000);
      });

      // 滚动结束
      // this.bsscroll.on("scrollEnd", () => {
      //   if (this.bsscroll.x == 0) {
      //     this.$emit("scrollEnd");
      //     this.bsscroll.disable();
      //   }
      // });

      // BetterScroll 启用，开始响应用户交互
      this.bsscroll.on("enable", () => {});

      // BetterScroll 禁用，不再响应用户交互
      this.bsscroll.on("disable", () => {});

      // 手指离开滚动区域
      this.bsscroll.on("touchEnd", () => {});

      // 当顶部下拉距离超过阈值
      // this.bsscroll.on("pullingDown", () => {
      //   // await fetchData();
      //   this.bsscroll.finishPullDown();
      //   console.log("111");
      // });

      console.log(
        "初始化了betterscroll" + "当前preventDefault为：" + this.preventDefault
      );
      if (this.preventDefault) {
        this.bsscroll.enable();
        // this.bsscroll.disable();
      } else {
        // console.log("执行了disable");
        this.bsscroll.disable();
      }
    },

    getScrollY() {
      return this.bsscroll ? this.bsscroll.y : 0;
    },
  },
};
</script>

<style scoped>
</style>
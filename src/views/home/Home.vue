.<template>
  <div class="home">
    <scroll
      class="content"
      @pullingUp="pullingUp"
      ref="scroll"
      @scroll="scroll"
    >
      <home-header ref="home_header"></home-header>
      <home-search :isShow="isShow" @click.native="goSearchShop"></home-search>
      <home-swiper :swipeImgs="swipeImgs"></home-swiper>
      <recommend-view :entries="entries"></recommend-view>
      <home-title></home-title>
      <filter-view
        :filterData="filterData"
        @updataFilter="updataFilter"
        @changeState="changeState"
        ref="filter"
      ></filter-view>

      <shop-list :ShopListStore="ShopListStore"></shop-list>
    </scroll>
    <home-search
      :isShow="isShow"
      @click.native="goSearchShop"
      v-show="isFixed"
      class="isFixed"
    ></home-search>
    <filter-view
      :filterData="filterData"
      @updataFilter="updataFilter"
      @changeState="changeState"
      v-show="isNavFixed"
      class="fixed"
    ></filter-view>
  </div>
</template>

<script>
import HomeHeader from "./childrenComponent/HomeHeader.vue";
import HomeSearch from "./childrenComponent/HomeSearch.vue";
import HomeSwiper from "./childrenComponent/HomeSwiper.vue";
import RecommendView from "./childrenComponent/RecommendView.vue";
import HomeTitle from "./childrenComponent/HomeTitle.vue";
import FilterView from "./childrenComponent/FilterView.vue";
import ShopList from "./childrenComponent/ShopList.vue";

import Scroll from "../../components/common/scroll/Scroll.vue";

import {
  _getHomeSwiper,
  _getHomeFilter,
  _getHomeShopInfo,
} from "@/network/home";

export default {
  name: "Home",
  data() {
    return {
      isShow: false, //遮罩层
      swipeImgs: [], //轮播图
      entries: [], //推荐
      filterData: {}, //过滤导航
      ShopListStore: [], //商家信息列表
      page: 1, //请求页数
      rule: {}, //
      isFixed: false, //吸顶
      isNavFixed: false, //吸顶
    };
  },
  components: {
    HomeHeader,
    HomeSwiper,
    RecommendView,
    FilterView,
    HomeSearch,
    ShopList,
    HomeTitle,
    Scroll,
  },
  created() {
    // 请求轮播图
    this.getHomeSwiper();
    // 请求过滤导航
    this.getHomeFilter();
    // 请求轮播图
    this.getHomeShopInfo();
  },
  // updated() {
  //   this.$refs.scroll.bsscroll.refresh();
  // },
  methods: {
    // 请求轮播图
    getHomeSwiper() {
      _getHomeSwiper().then((res) => {
        this.swipeImgs = res.data.swipeImgs;
        this.entries = res.data.entries;
      });
    },
    // 请求过滤导航
    getHomeFilter() {
      _getHomeFilter().then((res) => {
        // console.log(res);
        this.filterData = res.data;
      });
    },

    // 请求店铺信息
    getHomeShopInfo() {
      _getHomeShopInfo(this.page, this.size, this.rule).then((res) => {
        // console.log(res);
        this.page += 1;
        this.ShopListStore.push(...res.data);
      });
    },

    // scroll上拉
    pullingUp() {
      // 拉取更多数据
      this.getHomeShopInfo();
    },

    //get the name of the filterNav
    updataFilter(e) {
      this.page = 1;
      this.ShopListStore = [];
      this.rule = e;
      this.getHomeShopInfo();
    },
    changeState(info) {
      this.$refs.scroll.bsscroll.scrollTo(0, 0);
      this.isShow = info;
    },
    // 跳转searchShop页面
    goSearchShop() {
      this.$router.push("/searchShop");
    },

    scroll(position) {
      let el = this.$refs.filter.$el;
      this.isFixed = position.y < -40;
      this.isNavFixed = position.y < -el.offsetTop + el.offsetHeight;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.content {
  height: calc(100vh - 49px);
  overflow: hidden;
}

.isFixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}
.fixed {
  position: fixed;
  top: 45px;
  left: 0;
  right: 0;
}
.count_fixed {
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
}
</style>
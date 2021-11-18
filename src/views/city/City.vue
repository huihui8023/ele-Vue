<template>
  <div class="city">
    <!-- 城市搜索框 -->
    <city-search @searchCity="searchCity"></city-search>

    <!-- 热门城市列表/字母表 -->
    <Scroll class="wrpper" ref="scroll" v-if="searchList.length == 0">
      <Location :address="city" class="location" />
      <Alphabets
        :keys="keys"
        :cityList="cityList"
        :clickKeyNum="clickKeyNum"
        @goKeyPosition="goKeyPosition"
        @selectCity="selectCity"
      />
    </Scroll>

    <!-- 城市搜索结果 -->
    <city-search-result
      :searchList="searchList"
      v-else
      @click="selectCity"
    ></city-search-result>

    <!-- 右侧字母列表 -->
    <KeysList
      :keys="keys"
      @changeKey="changeKey"
      v-if="searchList.length == 0"
    />
  </div>
</template>

<script>
import CitySearch from "./childrenComponent/CitySearch.vue";
import CitySearchResult from "./childrenComponent/CitySearchResult.vue";
import KeysList from "./childrenComponent/KeyList.vue";
import Scroll from "@/components/common/scroll/Scroll";
import Location from "@/components/content/location/Location.vue";
import Alphabets from "@/components/content/alphabets/Alphabets.vue";
import { _getCities } from "../../network/cities";

export default {
  name: "City",
  components: {
    CitySearch,
    Location,
    Alphabets,
    Scroll,
    KeysList,
    CitySearchResult,
  },
  data() {
    return {
      keys: [], //字母列表
      cityList: null, //请求所有城市数据
      clickKeyNum: null, //点击右侧字母列表
      allCities: [], //所有城市
      searchList: [], //搜索城市列表
    };
  },
  created() {
    // 网络请求城市数据
    this.getCities();
  },
  computed: {
    // 获取城市
    city() {
      return (
        this.$store.state.location.addressComponent.city ||
        this.$store.state.location.addressComponent.province
      );
    },
  },
  methods: {
    // 获取城市列表
    getCities() {
      _getCities()
        .then((res) => {
          // 处理keys
          this.keys = Object.keys(res.data);
          this.keys.pop();
          this.keys.sort();
          this.cityList = res.data;

          // 将数据中城市遍历
          this.keys.forEach((item) => {
            this.cityList[item].forEach((item) => {
              this.allCities.push(item.name);
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //点击字母
    changeKey(num) {
      this.clickKeyNum = num;
    },

    //点击字母跳转到列表位置
    goKeyPosition(element) {
      this.$refs.scroll.bsscroll.scrollToElement(element, 250);
    },

    //点击列表城市名后跳转到address
    selectCity(city) {
      this.$router.replace({
        name: "address",
        params: { city: city.name ? city.name : city },
      });
    },

    // 搜索框输入城市
    searchCity(value) {
      if (!value) {
        this.searchList = [];
      } else {
        this.searchList = this.allCities.filter((item) => {
          return item.indexOf(value) != -1;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.city {
  width: 100%;
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
  overflow: hidden;
  .wrpper {
    height: calc(100% - 49px);
  }
}
</style>
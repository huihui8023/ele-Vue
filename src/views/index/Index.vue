<template>
  <div class="index">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar v-if="this.$route.meta.showTab"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "../../components/content/maintabbar/MainTabBar.vue";

export default {
  name: "Index",
  components: { MainTabBar },
  created() {
    this.getLocation();
  },
  methods: {
    // 高德api定位
    getLocation() {
      const self = this;
      AMap.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息 精准定位
          self.$store.dispatch("setLocation", data);
          self.$store.dispatch("setAddress", data.formattedAddress);
        }

        function onError(data) {
          // 定位出错 使用模糊定位
          self.getIndistinctLocation();
        }
      });
    },
    // 模糊定位
    getIndistinctLocation() {
      AMap.plugin("AMap.CitySearch", function () {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function (status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            AMap.plugin("AMap.Geocoder", function () {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode,
              });

              var lnglat = result.rectangle.split(";")[0].split(",");

              geocoder.getAddress(lnglat, function (status, data) {
                if (status === "complete" && data.info === "OK") {
                  // result为对应的地理位置详细信息
                }
              });
            });
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: calc(100% - 49px);
}
</style>
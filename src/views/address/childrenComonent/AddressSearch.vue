<template>
  <div class="address-search">
    <span @click="selectCity">{{ city }}</span>
    <i class="el-icon-arrow-down"></i>
    <i class="el-icon-search"></i>
    <input type="text" placeholder="小区/写字楼/学校等" v-model="serachVal" />
  </div>
</template>

<script>
export default {
  name: "AddressSearch",
  data() {
    return {
      serachVal: "",
      isShow: true,
      result: [],
    };
  },
  watch: {
    serachVal() {
      this.getSerachResult();
    },
  },

  props: {
    city: {
      type: String,
      // default: "成都",
    },
  },
  methods: {
    // 获得搜索结果
    getSerachResult() {
      const self = this;
      AMap.plugin("AMap.Autocomplete", function () {
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: self.city,
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(self.serachVal, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          console.log(result);
          self.$bus.$emit("getResult", result.tips);
        });
      });
    },

    // 跳转选择城市界面
    selectCity() {
      this.$router.push("/city");
    },
  },
  deactivated() {
    this.serachVal = "";
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";

.address-search {
  width: 90%;
  background-color: #eee;
  height: 40px;
  margin-top: 10px;
  margin-left: 50%;
  transform: translateX(-50%);
  line-height: 40px;
  color: #333;
  @include borderRadius(15px);

  input {
    position: absolute;
    top: 12px;
    left: 110px;
    border: none;
    outline: none;
    background-color: #eee;
  }
  span {
    font-size: 14px;
    margin-left: 10px;
  }
  .el-icon-search {
    position: absolute;
    top: 12px;
    left: 90px;
    z-index: 99;
    font-weight: 700;
  }
}
</style>
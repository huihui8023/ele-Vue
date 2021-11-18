<template>
  <div class="home-header">
    <div class="address" @click="goAddress">
      <i class="el-icon-location-outline"></i>
      <span>{{ getAddress }}</span>
      <i class="el-icon-caret-bottom"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeHeader",

  computed: {
    getAddress() {
      var address = this.$store.state.address;
      if (address) {
        this.address = address;
        return address;
      } else {
        return "正在加载定位";
      }
    },
    city() {
      return (
        this.$store.state.location.addressComponent.city ||
        this.$store.state.location.addressComponent.province
      );
    },
  },
  methods: {
    goAddress() {
      this.$router.push({ name: "address", params: { city: this.city } });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.home-header {
  position: relative;
  background-color: $blue;
  color: $fc;
  @include font(16px, 1.5);
  height: 40px;
  z-index: 10;
  .address {
    span {
      display: inline-block;
      width: 80%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 10px;
      margin-left: 45px;
    }
    i {
      position: absolute;
    }
    i[class*="outline"] {
      top: 15px;
      left: 30px;
    }
    i[class*="bottom"] {
      top: 15px;
      right: 30px;
    }
  }
}
</style>
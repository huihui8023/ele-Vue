<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <i class="el-icon-s-home" slot="item-icon"></i>
      <div slot="item-name">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/order">
      <i class="el-icon-tickets" slot="item-icon"></i>
      <div slot="item-name">订单</div>
    </tab-bar-item>
    <tab-bar-item path="/me">
      <i class="el-icon-s-custom" slot="item-icon"></i>
      <div slot="item-name">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "../../common/tabbar/TabBar.vue";
import TabBarItem from "../../common/tabbar/TabBarItem.vue";

export default {
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style lang="scss" scoped>
</style>
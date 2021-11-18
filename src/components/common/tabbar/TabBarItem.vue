<template>
  <div class="tab-bar-item" @click="clickItem" :style="activeStyle">
    <slot name="item-icon"></slot>
    <!-- <slot v-else name="item-icon-action"></slot> -->
    <div>
      <slot name="item-name"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "#409EFF",
    },
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    clickItem() {
      if (this.$route.path !== this.path) {
        this.$router.replace(this.path);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-bar-item {
  flex: 1;
  height: 49px;
  img {
    width: 29px;
    height: 29px;
    margin-top: 2px;
    /* margin-bottom: 2px; */
    vertical-align: middle;
  }
  i {
    margin-top: 2px;

    font-size: 22px;
  }
  div {
    margin-top: 4px;

    font-size: 14px;
  }
  .isActive {
    color: #409eff;
  }
}
</style>
<template>
  <div class="header">
    <span v-if="isBack" class="isBack" @click="goBack">
      <i class="el-icon-back"></i>
      返回
    </span>
    <span class="title">
      {{ title }}
    </span>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    isBack: {
      type: Boolean,
      default: true,
    },
    title: String,
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.header {
  height: 45px;
  font-size: 16px;
  background-color: $blue;
  color: $fc;
  line-height: 45px;
  .isBack {
    margin-left: 20px;
  }
  .title {
    @include cl;
    font-weight: 700;
  }
}
</style>
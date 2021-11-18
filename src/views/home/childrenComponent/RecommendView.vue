<template>
  <el-carousel
    :interval="0"
    arrow="always"
    class="entries"
    height="47.2vw"
    indicator-position="none"
  >
    <el-carousel-item v-for="(item, i) in entries" :key="i" class="entry_wrap">
      <div v-for="(entry, index) in item" :key="index" class="foodentry">
        <div class="img_wrap">
          <img :src="entry.image" alt="" />
        </div>
        <span>{{ entry.name }}</span>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  props: {
    entries: Array,
  },
};
</script>

<style lang="scss" scoped>
.entries {
  background: #fff;
  // height: 47.2vw;
  text-align: center;
  line-height: 1.5;
  overflow: hidden;
  .el-carousel__container {
    height: 100%;
  }
  .el-carousel__arrow {
    top: 85px !important;
  }

  .foodentry {
    width: 20%;
    float: left;
    position: relative;
    margin-top: 2.933333vw;
    span {
      display: block;
      color: #666;
      font-size: 0.32rem;
    }
    .img_wrap {
      position: relative;
      display: inline-block;
      width: 12vw;
      height: 12vw;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
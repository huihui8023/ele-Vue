<template>
  <ul class="search_shop_list">
    <li v-for="(item, index) in data" :key="index" @click="$emit('click')">
      <img v-if="item.image_path" :src="item.image_path" alt="" />
      <i v-else class="fa fa-search"></i>
      <div class="shopitem">
        <span class="title">{{ item.name || item }}</span>
        <span v-if="item.rating" class="rating">评分{{ item.rating }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "SearchShopList",
  props: {
    data: Array,
  },
};
</script>

<style lang="scss" scoped>
.search_shop_list {
  background: #fff;

  li {
    padding: 0 4.266667vw;
    display: flex;
    height: 13.933333vw;
    align-items: center;

    img {
      width: 6.4vw;
      height: 6.4vw;
      margin-right: 4.266667vw;
      border-radius: 0.133333vw;
    }

    i {
      margin-right: 4.266667vw;
      color: #888;
    }

    .shopitem {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;
      height: 13.933333vw;
      border-bottom: 1px solid #e3e3e3;

      .title {
        display: inline-block;
        max-width: 56vw;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.888rem;
        color: #333;
        margin-right: 0.8vw;
      }

      .rating {
        color: #999;
        font-size: 0.8rem;
      }
    }
  }
}
</style>
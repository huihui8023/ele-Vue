<template>
  <div class="shop_list">
    <shop-list-item
      v-for="(item, index) in ShopListStore"
      :key="index"
      :item="item.restaurant"
    >
    </shop-list-item>
  </div>
</template>

<script>
import ShopListItem from "./ShopListItem.vue";
export default {
  props: {
    ShopListStore: Array,
  },
  components: {
    ShopListItem,
  },
};
</script>

<style lang ="scss" scoped>
/* .shop_list {
  background: #fff;
  color: #666;
  padding: 4vw 0;
  border-bottom: 0.133333vw solid #eee;
} */
</style>
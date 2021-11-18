<template>
  <div class="nav_bar">
    <router-link to="/shopOrder" class="nav_item"
      >点餐<i class="line"></i>
    </router-link>
    <router-link to="/shopComment" class="nav_item"
      >评价<i class="line"></i>
    </router-link>
    <router-link to="/shopDetail" class="nav_item"
      >商家<i class="line"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ShopNavBar",
};
</script>

<style lang="scss" scoped>
.nav_bar {
  display: flex;
  width: 100%;
  line-height: 10.666667vw;
  border-bottom: 1px solid #e4e4e4;
  background: #fff;
  position: sticky;
  top: 0px;
  z-index: 10;

  .active_class {
    color: #333;
    font-weight: 700;

    .line {
      width: 30px;
      height: 0.533333vw;
      background: #2395ff;
      display: inline-block;
      position: absolute;
      left: 45%;
      bottom: 0;
      margin-left: -10px;
    }
  }

  .nav_item {
    flex: 1;
    text-align: center;
    font-size: 0.95rem;
    text-decoration: none;
    color: #666;
    position: relative;
  }
}
</style>
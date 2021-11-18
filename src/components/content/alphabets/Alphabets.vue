<template>
  <div class="alphabets">
    <!-- 热门城市 -->
    <div class="hot-city" ref="xxx">
      <h5 class="title">热门城市</h5>
      <ul>
        <li
          v-for="(item, index) in cityList.hotCities"
          :key="index"
          @click="goHotCity(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <!-- 列表城市 -->
    <div class="city-list">
      <div v-for="(item, index) in keys" :key="index" :ref="index + 1">
        <span>{{ item }}</span>
        <ul>
          <li
            v-for="(item, index) in cityList[item]"
            :key="index"
            @click="goHotCity(item)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Alphabets",
  props: {
    cityList: Object,
    keys: Array,
    clickKeyNum: Number,
  },
  watch: {
    clickKeyNum() {
      if (this.clickKeyNum && this.clickKeyNum !== 0) {
        const element = this.$refs[this.clickKeyNum][0];
        this.$emit("goKeyPosition", element);
      } else {
        const element = this.$refs.xxx;
        this.$emit("goKeyPosition", element);
      }
    },
  },
  methods: {
    goHotCity(city) {
      this.$emit("selectCity", city);
    },
  },
};
</script>

<style lang="scss" scoped>
.alphabets {
  margin: 40px 0;
  .hot-city {
    margin: 20px 0;
    padding: 0 16px;
    .title {
      color: #333;
      margin-bottom: 15px;
    }
    ul {
      padding: 0 16px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      li {
        width: 30%;
        background: #f1f1f1;
        margin: 0 10px 10px 0;
        text-align: center;
        font-size: 14px;
        padding: 10px;
        box-sizing: border-box;
        list-style: none;
      }
    }
  }
  .city-list {
    padding: 0 16px;
    span {
      display: inline-block;
      margin-top: 20px;
    }
    li {
      font-size: 14px;

      list-style: none;
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
  }
  .keys {
    position: fixed;
    right: 0;
    top: 0;
    color: #aaa;
    font-size: 12px;
    line-height: 1.4;
    text-align: center;
    padding: 0 5px;
    z-index: 9999;
  }
}
</style>
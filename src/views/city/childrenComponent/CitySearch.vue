<template>
  <div class="city-search">
    <div class="search_wrap">
      <div class="search">
        <i class="el-icon-search"></i>
        <input type="text" placeholder="输入城市名" v-model="searchVal" />
      </div>
      <button @click="goBack">取消</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CitySearch",
  data() {
    return {
      searchVal: "",
    };
  },
  watch: {
    // 发送搜索事件
    searchVal() {
      this.$emit("searchCity", this.searchVal);
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  deactivated() {
    this.searchVal = "";
  },
};
</script>

<style lang="scss" scoped>
.search_wrap {
  position: fixed;
  top: 0;
  height: 45px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 3px 16px;
  display: flex;
  justify-content: space-between;
  z-index: 99;
  .search {
    background-color: #eee;
    border-radius: 10px;
    line-height: 40px;
    width: 85%;
    box-sizing: border-box;
    padding: 0 16px;
    input {
      background: #eee;
      outline: none;
      border: none;
      margin-left: 5px;
    }
  }
  button {
    border: none;
    background: #fff;

    outline: none;
    color: #009eef;
  }
}
</style>
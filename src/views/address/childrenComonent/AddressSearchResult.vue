<template>
  <div class="address-search-result">
    <ul>
      <li
        v-for="(item, index) in resultAddress"
        :key="index"
        @click="selectAddress(item)"
      >
        <h4>{{ item.name }}</h4>
        <span> {{ item.district }}{{ item.address }} </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AddressSearchResult",
  data() {
    return {
      resultAddress: [],
    };
  },
  props: {
    fromPath: String,
  },
  mounted() {
    this.$bus.$on("getResult", (info) => {
      this.resultAddress = info;
    });
  },
  methods: {
    selectAddress(item) {
      this.$store.dispatch("setAddress", item.address + item.name);
      this.$router.push(this.fromPath);
    },
  },
};
</script>

<style lang='scss' scoped>
.address-search-result {
  margin-top: 16px;
  background-color: #fff;
  border-top: 30px solid #eee;
  li {
    border-bottom: 1px solid #eee;
    padding: 8px 16px;
    color: #aaa;
    h4 {
      font-weight: bold;
      color: #333;
      margin-top: 5px;
    }
  }
}
</style>
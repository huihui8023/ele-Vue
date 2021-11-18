<template>
  <div class="address">
    <Header title="选择收货地址"></Header>
    <address-search :city="city ? city : getcity"></address-search>
    <Location :address="getAddress" @click.native="goBack"></Location>
    <address-search-result :fromPath="fromPath"></address-search-result>
  </div>
</template>

<script>
import Header from "@/components/content/header/Header.vue";
import AddressSearch from "./childrenComonent/AddressSearch.vue";
import Location from "../../components/content/location/Location.vue";
import AddressSearchResult from "./childrenComonent/AddressSearchResult.vue";

export default {
  name: "Address",
  data() {
    return {
      city: "",
      fromPath: "",
    };
  },
  components: {
    Header,
    AddressSearch,
    Location,
    AddressSearchResult,
  },
  computed: {
    // 地址
    getAddress() {
      return this.$store.state.address;
    },
    // 城市
    getcity() {
      return this.$store.state.location.addressComponent.city;
    },
  },
  methods: {
    goBack() {
      this.$router.push(this.fromPath);
    },
  },
  // 导航守卫
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // console.log(to.params.city);
      vm.city = to.params.city;
      vm.fromPath = from.path;
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
<template>
  <div class="citySearch-result">
    <ul>
      <li
        v-for="(item, index) in searchList"
        :key="index"
        @click="$emit('click', item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CitySearchResult",
  props: {
    searchList: Array,
  },
};
</script>

<style lang="scss">
.citySearch-result {
  background-color: #fff;
  padding: 5px 16px;
  li {
    list-style: none;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
}
</style>
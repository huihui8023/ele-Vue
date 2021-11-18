<template>
  <div class="tab_tag">
    <span
      v-for="(item, index) in tags"
      :key="index"
      @click="checked(item)"
      :class="{ checked: selectTag == item }"
    >
      {{ item }}
    </span>
  </div>
</template>

<script>
export default {
  name: "TabTag",
  props: {
    tags: Array,
    selectTag: String,
  },
  methods: {
    checked(item) {
      this.$emit("checked", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.tab_tag {
  width: 100%;
  line-height: 50px;
  padding-left: 10px;
  position: relative;
  overflow: hidden;
  background-color: #fff;

  span {
    border: 1px solid #eee;
    padding: 5px 15px;
    border-radius: 2px;
    margin-right: 10px;
  }

  .checked {
    background-color: rgba(95, 164, 232, 0.4);
    color: rgb(95, 164, 232);
  }
}
</style>
<template>
  <div class="keys">
    <ul>
      <li @click="handleClickKey(0)">#</li>
      <li
        @click="handleClickKey(index + 1)"
        v-for="(item, index) in keys"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    keys: Array,
  },
  methods: {
    handleClickKey(index) {
      this.$emit("changeKey", index);
    },
  },
};
</script>

<style lang="scss" scoped>
.keys {
  position: fixed;
  right: 0;
  top: 25%;
  color: #aaa;
  font-size: 12px;
  line-height: 1.4;
  text-align: center;
  padding: 0 5px;
  li {
    list-style: none;
  }
}
</style>
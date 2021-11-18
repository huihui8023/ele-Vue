<template>
  <div class="form_block">
    <div class="label">{{ label }}</div>
    <div class="input_gruop_wrap">
      <div class="input_warp">
        <input
          v-if="!textarea"
          :type="type"
          :value="value"
          :placeholder="placeholder"
          @input="$emit('input', $event.target.value)"
        />
        <textarea
          v-else
          :type="type"
          :value="value"
          :placeholder="placeholder"
          :rows="rows"
          maxlength="100"
          @input="$emit('input', $event.target.value)"
        ></textarea>
        <i v-if="icon" :class="'fa fa-' + icon" @click="$emit('click')"></i>
      </div>
    </div>
    <TabTag
      class="tag"
      v-if="tags"
      :tags="tags"
      @checked="checked"
      :selectTag="selectTag"
    />
  </div>
</template>

<script>
import TabTag from "./TabTag.vue";
export default {
  name: "FormBlock",
  components: { TabTag },
  props: {
    type: {
      type: String,
      default: "text",
    },
    label: String,
    placeholder: String,
    value: String,
    icon: String,
    textarea: String,
    rows: String,
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

<style  lang="scss" scoped>
.form_block {
  width: 100%;
  line-height: 50px;
  padding-left: 10px;
  border-bottom: 1px solid #eee;
  position: relative;
  overflow: hidden;
  background-color: #fff;
  .label {
    font-weight: 700;
    font-size: 16px;
    width: 60px;
    color: rgb(29, 29, 29);
    display: inline-block;
    position: absolute;

    overflow: hidden;
  }

  .input_gruop_wrap {
    display: inline-block;
    width: 100%;
    input,
    textarea {
      border: 0;
      outline: 0;
      margin-left: 70px;
    }
    textarea {
      margin-top: 10px;
      width: 250px;
    }
    i {
      float: right;
      position: absolute;
      top: 50%;
      right: 20px;
      margin-top: (-8px);
    }
  }

  .tag {
    margin-left: 50px;
  }
}
</style>
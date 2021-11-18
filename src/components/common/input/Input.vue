<template>
  <div>
    <div class="input_group" :class="{ 'is-invalid': error }">
      <!-- 输入框 -->
      <input
        :type="type"
        :placeholder="placeholder"
        :value="value"
        :name="name"
        @input="$emit('input', $event.target.value)"
      />

      <!-- 输入框的按钮 -->
      <button v-if="btnTitle" :disabled="disabled" @click="$emit('btnClick')">
        {{ btnTitle }}
      </button>

      <!-- 错误信息 -->
    </div>
    <div v-if="error" class="invalid-feedback">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: "InputGroup",
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: String,
    value: String,
    btnTitle: String,
    disabled: Boolean,
    error: String,
    name: String,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";

.input_group {
  border: 1px solid #ccc;
  // border-radius: 20px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 10px;
  input {
    height: 100%;
    width: 60%;
    outline: none;
    border: 0;
  }

  button {
    border: none;
    outline: none;
    background: #fff;
  }

  button[disabled] {
    color: #aaa;
  }
}

.is-invalid {
  border: 1px solid red;
}
.invalid-feedback {
  // display: inline;
  color: red;
  padding-top: 5px;
}
</style>
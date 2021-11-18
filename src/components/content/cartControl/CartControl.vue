<template>
  <div class="cartcontroll">
    <span
      v-if="food.count > 0"
      @click="decrement"
      class="cartbutton button-minus"
    >
      <i class="fa fa-minus"></i>
    </span>
    <span v-if="food.count > 0" class="cartcount">{{ food.count }}</span>
    <span @click="increment" class="cartbutton">
      <i class="fa fa-plus-circle"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "CartControl",
  props: {
    food: Object,
  },
  methods: {
    increment() {
      this.$store.dispatch("addCart", this.food).then((res) => {
        console.log(res);
      });
    },
    decrement() {
      this.$store.dispatch("decrement", this.food);
    },
  },
};
</script>

<style lang="scss" scoped>
.cartcontroll {
  display: inline-flex;
  align-items: center;

  .cartbutton {
    display: inline-block;
    vertical-align: middle;

    i {
      color: rgb(35, 149, 255);
      vertical-align: middle;
      font-size: 1.5rem;
    }
  }

  .button-minus {
    width: 4.866667vw;
    height: 4.866667vw;
    border: 1px solid rgb(35, 149, 255);
    border-radius: 50%;
    text-align: center;

    i {
      font-size: 1rem;
    }
  }

  .cartcount {
    display: inline-block;
    text-align: center;
    color: rgba(0, 0, 0, 0.87);
    vertical-align: middle;
    font-size: 0.8rem;
    width: 6.933333vw;
    overflow: hidden;
  }
}
</style>
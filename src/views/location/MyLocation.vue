<template>
  <div class="my_location">
    <Header :title="title" />
    <ul class="address_warp">
      <li class="address_list" v-for="(item, index) in allAddress" :key="index">
        <p class="info" v-if="item.name || item.phone || item.address">
          <span class="name">{{ item.name }}</span>
          <span class="sex">{{ item.sex }}</span>
          <span class="phone">{{ item.phone }}</span>
        </p>
        <p>
          <span v-if="item.tag" class="tag">{{ item.tag }}</span>
          <span>{{ item.address }}</span>
        </p>
        <div class="manage">
          <i class="fa fa-edit" @click="handleEdit(item)"></i>
          <i class="fa fa-close"></i>
        </div>
      </li>
    </ul>
    <div class="bottom" @click="AddAddress">
      <i class="fa fa-plus-circle"></i>
      <span>新增收货地址</span>
    </div>
  </div>
</template>

<script>
import { _getUserData } from "@/network/me.js";

import Header from "../../components/content/header/Header.vue";
export default {
  name: "MyLocation",
  data() {
    return {
      title: "我的地址",
      allAddress: [],
    };
  },
  activated() {
    _getUserData(localStorage.ele_login).then((res) => {
      // console.log(res.data);
      this.allAddress = res.data.myAddress;
      // .filter((item) => {
      //   return item.address && item.phone && item.name;
      // });
    });
  },
  components: { Header },
  methods: {
    AddAddress() {
      this.$router.push("/addLocation");
    },
    handleEdit(address) {
      this.$router.push({
        name: "AddLocation",
        params: {
          title: "编辑地址",
          address,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";

.my_location {
  position: relative;
  height: 100vh;
  width: 100%;
  background-color: $bgc;

  .bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 45px;
    text-align: center;
    line-height: 45px;
    background-color: rgb(254, 254, 254);
    color: $blue;
    > i {
      margin-right: 10px;
    }
  }

  .address_warp {
    .address_list {
      padding: 20px;
      background-color: #fff;
      border-bottom: 1px solid #eee;

      span {
        margin-left: 10px;
      }

      .name {
        font-size: 20px;
        font-weight: 500;
        color: #333;
      }

      .tag {
        font-size: 14px;
        padding: 1px;
        color: rgb(246, 96, 96);
        border: 1px solid rgb(246, 96, 96);
      }

      .manage {
        float: right;
        font-size: 18px;

        i {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
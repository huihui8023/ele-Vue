<template>
  <div class="add_location">
    <Header :title="title" />
    <!-- 姓名 / 性别 -->
    <form-block
      label="联系人"
      placeholder="姓名"
      :tags="sexes"
      @checked="checkedSex"
      :selectTag="addressInfo.sex"
      v-model="addressInfo.name"
    ></form-block>

    <!-- 电话 -->
    <form-block
      label="电话"
      type="number"
      placeholder="手机号码"
      v-model="addressInfo.phone"
    ></form-block>

    <!-- 地址 -->
    <form-block
      label="地址"
      placeholder="小区/写字楼/学校等"
      textarea="textarea"
      rows="1"
      icon="angle-right"
      @click="goAddress"
      :value="addressInfo.address"
      v-model="addressInfo.address"
    ></form-block>

    <!-- 门牌号 -->
    <form-block
      label="门牌号"
      placeholder="xx号楼xx单元xx号"
      textarea="textarea"
      rows="2"
      icon="edit"
      v-model="addressInfo.bottom"
    ></form-block>

    <!-- 标签 -->
    <div class="tag">
      <div class="label">标签</div>
      <TabTag :tags="tags" :selectTag="addressInfo.tag" @checked="checked" />
    </div>
    <div class="submit" @click="submit">提交</div>
  </div>
</template>

<script>
import Header from "../../components/content/header/Header.vue";
import FormBlock from "../../components/content/orders/FormBlock.vue";
import TabTag from "../../components/content/orders/TabTag.vue";
import { mapGetters } from "vuex";

import { _sendAddress, _editUserData } from "@/network/me.js";
export default {
  name: "AddLocation",
  components: {
    Header,
    FormBlock,
    TabTag,
  },
  data() {
    return {
      title: "",
      tags: ["家", "学校", "公司"],
      sexes: ["男", "女"],
      addressInfo: {},
      //       name: "",
      // phone: "",
      // tag: "",
      // sex: "",
      // address: "",
      // doorplate: "", //门牌号
    };
  },
  computed: {
    getAddress() {
      return this.$store.state.address;
    },
    // ...mapGetters(["getAddress"]),
  },
  watch: {
    getAddress(val) {
      this.addressInfo.address = val;
    },
  },
  methods: {
    checked(item) {
      this.addressInfo.tag = item;
    },
    checkedSex(item) {
      this.addressInfo.sex = item;
    },
    goAddress() {
      this.$router.push("/address");
    },
    submit() {
      if (!this.addressInfo.name || !this.addressInfo.sex) {
        this.$toast.show("姓名/性别");
        return;
      }
      if (
        !this.addressInfo.phone ||
        !/^1[3456789]\d{9}$/.test(this.addressInfo.phone)
      ) {
        this.$toast.show("phone error");
        return;
      }
      if (!this.addressInfo.address || !this.addressInfo.bottom) {
        this.$toast.show("地址/门牌号");
        return;
      }
      // 发送post请求保存数据
      const id = localStorage.getItem("ele_login");
      if (this.title == "添加地址") {
        _sendAddress(id, this.addressInfo)
          .then((res) => {
            console.log(res.data);
            this.$router.push("/myLocation");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        _editUserData(id, this.addressInfo._id, this.addressInfo).then(
          (res) => {
            console.log(res.data);
            this.$router.push("/myLocation");
          }
        );
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.title = to.params.title;
      vm.addressInfo = to.params.address;
    });
  },
};
</script>

<style lang="scss" scoped>
.add_location {
  width: 100%;
  height: 100vh;
  background-color: #eee;

  .tag {
    display: flex;
    border-bottom: 1px solid #eee;
    .label {
      height: 50px;
      line-height: 50px;
      font-weight: 700;
      font-size: 16px;
      width: 60px;
      background-color: #fff;
      padding-left: 10px;
      color: rgb(29, 29, 29);
    }
  }

  .submit {
    width: 70%;
    height: 50px;
    line-height: 50px;
    // border-radius: 10px;
    text-align: center;
    margin-left: 50%;
    transform: translateX(-50%);
    background-color: #00d762;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    margin-top: 80px;
  }
}
</style>
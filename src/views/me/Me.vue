<template>
  <div class="me">
    <div class="header_info" v-if="userInfo">
      <div class="head-img"></div>
      <div class="head-profile">
        <p class="user-id" v-if="userInfo._id">{{ userInfo._id }}</p>
        <p class="user-id" v-else>登录/注册</p>
        <p class="user-phone">
          <i class="fa fa-mobile"></i>
          <span v-if="userInfo.phone">{{ encrypt(userInfo.phone) }}</span>
          <span v-else>登录享受更多特权</span>
        </p>
      </div>
      <i class="fa fa-angle-right"></i>
    </div>
    <div class="address" v-if="userInfo" @click="myAddress">
      <i class="fa fa-map-marker"></i>
      <div class="address-index">
        <span>我的地址</span>
        <i class="fa fa-angle-right"></i>
      </div>
    </div>
    <button class="btn_logOff" @click="handleLogOFF">退出登录</button>
  </div>
</template>

<script>
import { _getUserData } from "@/network/me.js";
export default {
  name: "Me",
  data() {
    return {
      userInfo: null,
    };
  },
  activated() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      const user_id = localStorage.getItem("ele_login");
      console.log(user_id);
      _getUserData(user_id).then((res) => {
        console.log(res.data);
        this.userInfo = res.data;
      });
    },
    // 加密号码
    encrypt(phone) {
      return phone.replace(/([0-9]{3})([0-9]{4})([0-9]{4})/, "$1****$3");
    },
    // 退出登录
    handleLogOFF() {
      localStorage.removeItem("ele_login");
      this.$router.push("/login");
    },
    // 进入我的地址
    myAddress() {
      if (this.userInfo.myAddress.length > 0) {
        this.$router.push("/MyLocation");
      } else {
        this.$router.push("/AddLocation");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.me {
  width: 100%;
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;
  background-color: rgb(240, 238, 241);

  .header_info {
    display: flex;
    background-image: linear-gradient(90deg, #0af, #0085ff);
    padding: 6.666667vw 4vw;
    color: #fff;
    align-items: center;

    .head-img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-position: 0px 0px;
      background-size: 60px;
      background-image: url(https://shadow.elemecdn.com/faas/h5/static/sprite.3ffb5d8.png);
    }

    .head-profile {
      overflow: hidden;
      margin-left: 4.8vw;
      flex-grow: 1;

      .user-id {
        max-width: 40vw;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 1.3rem;
        margin-bottom: 2.133333vw;
        font-weight: 700;
        display: flex;
        align-items: center;
      }

      .user-phone {
        display: flex;
        align-items: center;
        font-size: 0.8rem;

        > i {
          margin-right: 0.666667vw;
          font-size: 1rem;
        }
      }
    }
  }

  .address {
    margin-top: 20px;
    display: flex;
    justify-content: start;
    width: 100%;
    height: 55px;
    background-color: rgb(254, 254, 254);
    align-items: center;
    font-size: 16px;
    border-top: 1px solid #ccc;
    padding: 0 10px 0 20px;
    border-bottom: 1px solid #ccc;
    > i {
      color: rgb(72, 157, 234);
      font-size: 18px;
    }
    span {
      margin-top: 2px;
    }

    .address-index {
      margin-left: 20px;
      display: flex;
      width: 100%;
      justify-content: space-between;

      i {
        font-size: 22px;
      }
    }
  }

  .btn_logOff {
    width: 100%;
    height: 55px;
    line-height: 55px;
    text-align: center;
    border: 0;
    background-color: rgb(254, 254, 254);
    margin-top: 20px;
    color: red;
    font-weight: 700;
    font-size: 18px;
  }
}
</style>
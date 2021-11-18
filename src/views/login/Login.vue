.<template>
  <div class="login">
    <div class="logo">
      <img src="@/assets/img/logo.jpg" alt="logo" />
    </div>
    <!-- 手机input -->
    <inputGroup
      type="number"
      v-model="phone"
      placeholder="手机号"
      :btnTitle="btnTitle"
      :error="errors.phone"
      :disabled="disabled"
      @btnClick="getVerifyCode"
    ></inputGroup>
    <!--  -->
    <inputGroup
      type="number"
      v-model="verfyCode"
      placeholder="验证码"
      :error="errors.code"
    ></inputGroup>

    <!-- 用户服务协议 -->
    <div class="login_des">
      <p>
        新用户登录即自动注册，表示已同意
        <span>《用户服务协议》</span>
      </p>
    </div>
    <!-- 登录按钮 -->
    <div class="login_btn">
      <button :disabled="isClick" @click="verifyCode">登录</button>
    </div>
  </div>
</template>

<script>
import InputGroup from "@/components/common/input/Input.vue";

import { _getVerifyCode, _verifyCode } from "@/network/login";
export default {
  name: "Login",
  components: {
    InputGroup,
  },
  data() {
    return {
      phone: "",
      verfyCode: "940415",
      btnTitle: "获取验证码",
      disabled: false,
      errors: {},
    };
  },
  computed: {
    isClick() {
      if (!this.phone || !this.verfyCode) {
        return true;
      }
    },
  },
  methods: {
    // 获取验证码
    getVerifyCode() {
      if (this.verifyPhone()) {
        // 发送网络请求
        _getVerifyCode(this.phone).then((res) => {
          // console.log(res);
        });
        this.validateBtn();
      }
    },

    // 验证手机号验证码
    verifyCode() {
      _verifyCode(this.phone, this.verfyCode)
        .then((res) => {
          this.errors = {};
          localStorage.setItem("ele_login", res.data.user._id);
          this.$router.push("/");
        })
        .catch((err) => {
          this.errors = {
            code: err.response.data.msg,
          };
        });
    },
    // 复用按钮
    validateBtn() {
      var timer = 10;
      this.btnTitle = timer + "s后重试";
      this.disabled = true;
      var time = setInterval(() => {
        timer--;
        this.btnTitle = timer + "s后重试";
        if (timer == 0) {
          clearInterval(time);
          this.disabled = false;
          this.btnTitle = "获取验证码";
        }
      }, 1000);
    },

    // 验证input框
    verifyPhone() {
      if (!this.phone) {
        this.errors = {
          phone: "号码不能为空",
        };
        return false;
      } else if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.errors = {
          phone: "填写正确号码",
        };
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";

.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
  .logo {
    text-align: center;
    img {
      width: 200px;
    }
  }

  .login_des,
  .login_btn {
    margin-top: 20px;
  }
  .login_des {
    color: #aaa;
    line-height: 22px;
    span {
      color: #4d90fe;
    }
  }
  .login_btn button {
    width: 100%;
    height: 40px;
    background-color: #48ca38;
    border-radius: 4px;
    color: white;
    font-size: 14px;
    border: none;
    outline: none;
  }
  .login_btn button[disabled] {
    background-color: #8bda81;
  }
}
</style>



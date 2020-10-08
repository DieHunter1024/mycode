<template>
  <div class="login">
    <mt-button class="btn" @click="changeLoginType">{{
      loginType == "psd" ? "切换为验证码登录" : "切换为账号登录"
    }}</mt-button>
    <div>
      <mt-field
        :label="LoginFieldConfig[loginType].namelabel"
        :placeholder="LoginFieldConfig[loginType].nameplaceholder"
        v-model="userInfo.username"
        :type="loginType == 'psd' ? '' : 'email'"
      ></mt-field>
      <mt-field
        v-if="loginType == 'psd'"
        :label="LoginFieldConfig[loginType].codelabel"
        :placeholder="LoginFieldConfig[loginType].codeplaceholder"
        v-model="userInfo['password']"
        :type="loginType == 'psd' ? 'password' : 'number'"
      ></mt-field>
      <mt-field
        v-else
        :label="LoginFieldConfig[loginType].codelabel"
        :placeholder="LoginFieldConfig[loginType].codeplaceholder"
        v-model="userInfo['mailcode']"
        :type="loginType == 'psd' ? 'password' : 'number'"
      >
        <mt-button class="btn" :disabled="canGetCode" @click="getCode">{{
          codeTime
        }}</mt-button>
      </mt-field>
      <router-link to="/Register">
        <mt-button class="btn">还没账号？点击注册</mt-button>
      </router-link>
      <mt-button class="btn">找回密码</mt-button>
      <mt-button class="btn" type="primary" @click="submit">登录</mt-button>
    </div>
  </div>
</template>

<script>
import FieldConfig from "../../config/fieldConfig";
import Config from "../../config/config";
import { Field, Button } from "mint-ui";
import LoginBussiness from "./bussiness";
const { GetCodeTime, CodeText } = Config;
const { LoginFieldConfig } = FieldConfig;
export default {
  components: {},
  data() {
    return {
      loginBussiness: null,
      LoginFieldConfig,
      loginType: "psd",
      codeTime: CodeText,
      timeTick: null,
      canGetCode: false,
      userInfo: {
        username: "",
        password: "",
        mailcode: "",
        remember: true,
      },
    };
  },
  created() {
    this.loginBussiness = new LoginBussiness(this);
  },
  methods: {
    changeLoginType() {
      if (this.loginType == "psd") {
        this.userInfo.password = "";
        this.loginType = "code";
        return;
      }
      this.userInfo.mailcode = "";
      this.loginType = "psd";
    },
    getCode() {
      if (this.canGetCode) {
        return;
      }
      this.loginBussiness.sendCode().then((res) => {
        this.canGetCode = true;
        this.$timeTick.timeTick((state) => {
          this.codeTime = state.content;
          switch (state.res) {
            case 0:
              this.canGetCode = false;
              break;
          }
        });
      });
    },
    submit() {
      this.loginBussiness.submitData();
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";

.login {
  .btn {
    .f_s(34);
    width: 100%;
    .h(100);
  }
}
</style>
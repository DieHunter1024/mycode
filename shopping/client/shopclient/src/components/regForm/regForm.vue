<template>
  <div class="login">
    <div>
      <mt-field
        placeholder="请输入用户名"
        :state="userInfo.username.length?'success':'error'"
        v-model="userInfo.username"
      ></mt-field>
      <mt-field
        placeholder="请输入密码"
        :state="userInfo.password.length?'success':'error'"
        v-model="userInfo.password"
        type="password"
      ></mt-field>
      <mt-field
        placeholder="请重复输入密码"
        :state="userInfo.repassword.length&&userInfo.password==userInfo.repassword?'success':'error'"
        v-model="userInfo.repassword"
        type="password"
      ></mt-field>
      <mt-field
        placeholder="请输入邮箱"
        v-model="userInfo.mailaddress"
        :state="userInfo.mailaddress.length?'success':'error'"
      >
        <mt-button class="btn" @click="selectMail">{{userInfo.mailurl}}</mt-button>
      </mt-field>
      <mt-field
        placeholder="请输入验证码"
        :state="userInfo.mailcode.length==4?'success':'error'"
        v-model="userInfo.mailcode"
        type="number"
      >
        <mt-button class="btn" :disabled="canGetCode" @click="getCode">{{codeTime}}</mt-button>
      </mt-field>
      <mt-button class="btn" type="primary" @click="submit">注册</mt-button>
      <div class="shopPicker"></div>
      <ShopPicker :ShopMaxCount="address" pickerTitle="邮箱类型"></ShopPicker>
    </div>
  </div>
</template>

<script>
import Config from "../../config/config";
import Mail from "../../config/mail";
import ShopPicker from "../shopPicker/shopPicker";
import { Field, Button, Picker, Popup } from "mint-ui";
import RegBussiness from "./bussiness";
const { GetCodeTime, EventName } = Config;
const { address } = Mail;
export default {
  components: {
    ShopPicker
  },
  data() {
    return {
      timeTick: null,
      codeTime: "获取验证码",
      address,
      canGetCode: false,
      userInfo: {
        username: "",
        password: "",
        repassword: "",
        mailurl: address[0],
        mailaddress: "",
        mailcode: ""
      }
    };
  },
  created() {
    this.regBussiness = new RegBussiness(this);
    this.$events.onEvent(EventName.ChangeCount, _count => {
      this.userInfo.mailurl = _count;
    });
  },
  destroyed() {
    this.$events.offEvent(EventName.ChangeCount);
  },
  methods: {
    selectMail() {
      this.$events.emitEvent(EventName.ShowPicker);
    },
    getCode() {
      if (this.canGetCode) {
        return;
      }
      this.regBussiness
        .sendCode()
        .then(res => {
          this.canGetCode = true;
          let _codeTime = GetCodeTime / 1000;
          this.timeTick = setInterval(() => {
            if (_codeTime-- <= 1) {
              clearInterval(this.timeTick);
              this.timeTick = null;
              this.canGetCode = false;
              this.codeTime = "获取验证码";
            } else {
              this.codeTime = _codeTime + "S";
            }
          }, 1000);
        })
        .catch(err => {});
    },
    submit() {
      this.regBussiness.submitData();
    }
  }
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
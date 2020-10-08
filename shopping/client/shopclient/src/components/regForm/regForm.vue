<template>
  <div class="login">
    <div>
      <mt-field
        placeholder="请输入用户名"
        :state="userInfo.username.length ? 'success' : 'error'"
        v-model="userInfo.username"
      ></mt-field>
      <mt-field
        placeholder="请输入密码"
        :state="userInfo.password.length ? 'success' : 'error'"
        v-model="userInfo.password"
        type="password"
      ></mt-field>
      <mt-field
        placeholder="请重复输入密码"
        :state="
          userInfo.repassword.length && userInfo.password == userInfo.repassword
            ? 'success'
            : 'error'
        "
        v-model="userInfo.repassword"
        type="password"
      ></mt-field>
      <mt-field
        placeholder="请输入邮箱"
        v-model="userInfo.mailaddress"
        :state="userInfo.mailaddress.length ? 'success' : 'error'"
      >
        <mt-button class="btn" @click="selectMail">{{
          userInfo.mailurl
        }}</mt-button>
      </mt-field>
      <mt-field
        placeholder="请输入验证码"
        :state="userInfo.mailcode.length == 4 ? 'success' : 'error'"
        v-model="userInfo.mailcode"
        type="number"
      >
        <mt-button class="btn" :disabled="canGetCode" @click="getCode">{{
          codeTime
        }}</mt-button>
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
const { GetCodeTime, EventName, CodeText } = Config;
const { address } = Mail;
export default {
  components: {
    ShopPicker,
  },
  data() {
    return {
      codeTime: CodeText, //获取验证码按钮显示值
      address, //邮箱默认地址
      canGetCode: false, //防止重复点击开关
      userInfo: {
        //注册表单默认数据
        username: "",
        password: "",
        repassword: "",
        mailurl: address[0],
        mailaddress: "",
        mailcode: "",
      },
    };
  },
  created() {
    this.regBussiness = new RegBussiness(this);
    this.$events.onEvent(EventName.ChangeCount, (_count) => {
      this.userInfo.mailurl = _count; //切换邮箱地址
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
        //是否允许发送邮箱验证
        return;
      }
      this.regBussiness.sendCode().then((res) => {
        this.canGetCode = true;//关闭点击开关
        this.$timeTick.timeTick((state) => {
          this.codeTime = state.content;
          switch (state.res) {
            case 0:
              this.canGetCode = false;//允许用户点击
              break;
          }
        });
      });
    },
    submit() {
      this.regBussiness.submitData();
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
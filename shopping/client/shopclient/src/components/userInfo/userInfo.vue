<template>
  <div class="info">
    <UserInfoTop class="InfoTop" :userInfo="userInfo"></UserInfoTop>
    <UserInfoOrder></UserInfoOrder>
    <mt-button class="btn" type="danger" @click="exitUser">退出登录</mt-button>
  </div>
</template>

<script>
import UserInfoTop from "../userInfoTop/userInfoTop";
import UserInfoOrder from "../userInfoOrder/userInfoOrder";
import { Button, MessageBox } from "mint-ui";
import config from "../../config/config";
const { StorageName, EventName } = config;
export default {
  name: "userinfo",
  props: ["userInfo"],
  components: {
    UserInfoTop,
    UserInfoOrder,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    exitUser() {
      MessageBox.confirm("确定退出当前账户?")
        .then((action) => {
          this.$storage.saveStorage(StorageName.Token, " ");
          this.$events.emitEvent(EventName.IsLogin);
        })
        .catch((active) => {});
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
.info {
  .InfoTop {
    margin-bottom: unit(20 / @pxtorem, rem);
  }
  .btn {
    width: 100%;
    .h(100);
  }
  background: #ededed;
}
</style>
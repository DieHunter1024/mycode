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
import { Button } from "mint-ui";
import config from "../../config/config";
const { StorageName, EventName } = config;
export default {
  name: "userinfo",
  props: ["userInfo"],
  components: {
    UserInfoTop,
    UserInfoOrder
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    exitUser() {
      this.$storage.saveStorage(StorageName.Token, " ");
      this.$events.emitEvent(EventName.IsLogin);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
.info {
  .InfoTop {
    margin-bottom: 10px;
  }
  .btn {
    width: 100%;
    .h(100);
  }
  background: #ededed;
}
</style>
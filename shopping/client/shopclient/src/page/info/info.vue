<template>
  <div>
    <Top :title="isLogin?'我的':'登录'"></Top>
    <div class="content">
      <UserInfo v-if="isLogin" :userInfo="userInfo"></UserInfo>
      <Login v-else></Login>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import UserInfoBussiness from "./bussiness";
import TabBar from "../../components/tabBar/tabBar";
import UserInfo from "../../components/userInfo/userInfo";
import Login from "../../components/login/login";
import Top from "../../components/top/top";
import config from "../../config/config";
const { EventName } = config;
export default {
  components: {
    Top,
    UserInfo,
    Login,
    TabBar
  },
  data() {
    return {
      isLogin: false,
      userInfoBussiness: null,
      userInfo: null
    };
  },
  created() {
    this.userInfoBussiness = new UserInfoBussiness(this);
    this.$events.onEvent(EventName.IsLogin, () => {
      this.userInfoBussiness.checkToken();
    });
    this.userInfoBussiness.checkToken();
  },
  destroyed() {
    this.$events.offEvent(EventName.IsLogin);
  }
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
</style>
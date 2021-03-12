<template>
  <ul class="userInfo">
    <router-link to="/UpdateInfo">
      <li>
        <img :src="imgPath+userInfo.headPic" alt />
        <span>{{userInfo.username}}</span>
        <div class="iconfont icon-fanhui"></div>
      </li>
    </router-link>
    <li>
      <mt-cell :title="userInfo.phoneNum"></mt-cell>
      <mt-cell :title="userInfo.mailaddress+userInfo.mailurl"></mt-cell>
      <mt-cell :title="userInfo.alladdress.join('-')+'-'+userInfo.address"></mt-cell>
      <mt-cell :title="userInfo.descript"></mt-cell>
    </li>
  </ul>
</template>

<script>
import Config from "../../config/config";
const { RequestPath, StorageName } = Config;
import { Cell } from "mint-ui";
export default {
  name: "userinfotop",
  props: ["userInfo"],//父组件传递用户信息至当前组件，并渲染
  data() {
    return {
      imgPath: RequestPath
    };
  },

  created() {
    this.$storage.saveStorage(StorageName.UserInfo, this.userInfo);
  }
};
</script>


<style lang="less" scoped>
@import "../../style/init.less";
.userInfo {
  li:nth-child(1) {
    .h(230);
    width: 100%;
    .mcolor();
    .l_h(230);
    margin-top: -1px;
    color: #fff;
    > img,
    > span {
      display: inline-block;
      vertical-align: middle;
      margin-left: unit(40 / @pxtorem, rem);
    }
    > img {
      .w(145);
      .h(145);
      border-radius: 100%;
    }
    > span {
      .f_s(40);
    }
    > div {
      height: 100%;
      float: right;
      padding-left: unit(40 / @pxtorem, rem);
      transform: rotateY(180deg);
    }
  }
}
</style>
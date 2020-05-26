<template>
  <ul class="userInfo">
    <li>
      <img :src="imgPath+userInfo.headPic" alt />
      <span>{{userInfo.username}}</span>
      <div class="iconfont icon-fanhui" @click="changeUserInfo"></div>
    </li>
    <li>
      <mt-cell :title="userInfo.phoneNum"></mt-cell>
      <mt-cell :title="userInfo.mailaddress+userInfo.mailurl"></mt-cell>
      <mt-cell :title="userInfo.alladdress.join('-')+'-'+userInfo.address"></mt-cell>
      <mt-cell :title="userInfo.descript"></mt-cell>
    </li>
  </ul>
</template>

<script>
import config from "../../config/config";
const { RequestPath } = config;
import { Cell } from "mint-ui";
export default {
  name: "userinfotop",
  props: ["userInfo"],
  data() {
    return {
      imgPath: RequestPath
    };
  },

  created() {
    console.log(this.userInfo);
  },
  methods: {
    changeUserInfo() {
      // console.log("aaa");
    }
  }
};
</script>


<style lang="less" scoped>
@import "../../style/init.less";
.userInfo {
  > li:nth-child(1) {
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
      padding-left: unit(40 / @pxtorem, rem);
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
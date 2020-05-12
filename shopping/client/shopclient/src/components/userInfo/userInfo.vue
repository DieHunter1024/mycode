<template>
  <ul class="userInfo">
    <li>
      <img :src="imgPath+userInfo.headPic" alt />
    </li>
  </ul>
</template>

<script>
import config from "../../config/config";
const { RequestPath } = config;
export default {
  name: "userinfo",
  props: ["userInfo"],
  data() {
    return {
      imgPath: RequestPath
    };
  },

  created() {
    console.log(this.userInfo);
  },
  methods: {}
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
    > img {
      .w(145);
      .h(145);
      border-radius: 100%;
      padding-left: unit(40 / @pxtorem, rem);
    }
  }
}
</style>
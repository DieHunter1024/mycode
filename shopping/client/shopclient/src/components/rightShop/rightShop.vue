<template>
  <div class="rightShop">
    <h2 id="head">
      <img v-if="themeList.shopPic" :src="imgPath+themeList.shopPic" alt />
    </h2>
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <img :src="imgPath+item.shopPic" />
        <span>{{item.shopName}} {{item.shopScale}}克</span>
      </li>
    </ul>
  </div>
</template>
<script>
import Config from "../../config/config";
import Events from "../../event/event";
import RightShopBussiness from "./bussiness";
const { EventName } = Config;
export default {
  data() {
    return {
      themeList: {},
      list: [],
      imgPath: Config.RequestPath
    };
  },
  created() {
    Events.getInstance().onEvent(EventName.SelectKind, data => {
      RightShopBussiness.getInstance().initPageConfig(data);
    });
    this.init();
  },
  methods: {
    init() {
      RightShopBussiness.getInstance(this).initPageConfig(0);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
.rightShop {
  padding-left: unit(215 / @pxtorem, rem);
  img {
    width: 90%;
    display: block;
    margin: unit(40 / @pxtorem, rem) auto;
  }
  ul {
    margin-top: unit(70 / @pxtorem, rem);
    margin-bottom: unit(110 / @pxtorem, rem);
    li {
      display: inline-block;
      width: 33%;
      vertical-align: top;
      text-align: center;
      img {
        width: 100%;
        margin: 0;
      }
      span {
        .f_s(28);
        text-align: center;
      }
    }
  }
}
</style>
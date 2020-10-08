<template>
  <transition name="fade">
    <div class="rightShop" v-if="transitionSwitch">
      <h2 id="head">
        <img :src="imgPath+themeList.shopPic" v-if="themeList.shopPic" alt />
      </h2>
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="clickHandler(item)">
          <img :src="imgPath+item.shopPic" />
          <span>{{item.shopName}} {{item.shopScale}}克</span>
        </li>
      </ul>
    </div>
  </transition>
</template>
<script>
import Config from "../../config/config";
import RightShopBussiness from "./bussiness";
const { EventName } = Config;
export default {
  data() {
    return {
      themeList: {},
      list: [],
      imgPath: Config.RequestPath,
      rightShopBussiness: null,
      transitionSwitch: true,
      beforeIndex: 0
    };
  },
  created() {
    this.rightShopBussiness = new RightShopBussiness(this);
    this.rightShopBussiness.initPageConfig(this.beforeIndex);
    this.$events.onEvent(EventName.SelectKind, data => {//监听选择种类事件
      this.transitionSwitch = false;//通过v-show实现fade动画效果
      this.rightShopBussiness.initPageConfig(data);
    });
  },
  destroyed() {
    this.$events.offEvent(EventName.SelectKind);//销毁事件监听
  },
  methods: {
    clickHandler(data) {
      this.$router.push({ name: "ShopInfo", query: { ...data } });
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
        width: 70%;
        margin: 0 auto;
      }
      span {
        .f_s(28);
        text-align: center;
      }
    }
  }
}
</style>
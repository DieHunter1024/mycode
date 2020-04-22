<template>
  <ul class="more">
    <h2>最近新品</h2>
    <li v-for="(item,index) in list" :key="index">
      <img :src="imgPath+item.shopPic" alt :class="'imgs'+index" />
      <span>{{item.shopName}} {{item.shopScale}}克</span>
      <div>￥{{item.shopPrice}}</div>
    </li>
  </ul>
</template>
<script>
import ShopBussiness from "./bussiness";
import Config from "../../config/config";
export default {
  name: "shopItem",
  data() {
    return {
      list: [],
      imgPath: Config.RequestPath
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      new ShopBussiness(this);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
.more {
  h2 {
    .h2Font();
  }
  li {
    margin: 1%;
    border-radius: 0.3125rem;
    background: #f4f6f3;
    width: 48%;
    text-align: center;
    font-size: 0.75rem;
    display: inline-block;
  }
  img {
    display: block;
    margin: 0 auto;
    .w(330);
  }
}
</style>
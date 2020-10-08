<template>
  <div class="swiper">
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="(item,index) in list" :key="index">
        <img class="imgs" :src="imgPath+item.shopPic" @click="clickHandler(item)" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "mint-ui";
import Config from "../../config/config";
import BannerBussiness from "./bussiness";
export default {
  name: "banner",
  data() {
    return {
      list: [],//图片列表
      imgPath: Config.RequestPath//图片根路径
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      new BannerBussiness(this);//初始化banner请求
    },
    clickHandler(_shop) {//banner点击跳转
      this.$router.push({
        name: "ShopTheme",
        query: { _type: _shop.shopType, _shopName: _shop.shopName }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
.imgs {
  .h(500);
  width: 100%;
}
.swiper {
  width: 100%;
  .h(500);
}
</style>
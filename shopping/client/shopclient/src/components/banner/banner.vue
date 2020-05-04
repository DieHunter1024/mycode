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
      list: [],
      imgPath: Config.RequestPath
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      new BannerBussiness(this);
    },
    clickHandler(_shop) {
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
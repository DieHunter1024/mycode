<template>
  <div class="swiper">
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="(item,index) in list" :key="index">
        <img class="imgs" :src="imgPath+item.shopPic" />
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
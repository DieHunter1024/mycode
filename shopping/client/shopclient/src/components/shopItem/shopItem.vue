<template>
  <ul class="more">
    <li v-for="(item,index) in list" :key="index" @click="clickHandler(item)">
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
  props: ["shopType"],
  data() {
    return {
      list: [],
      imgPath: Config.RequestPath
    };
  },
  mounted() {
    new ShopBussiness(this);
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
.more {
  li {
    .shopItem();
  }
}
</style>
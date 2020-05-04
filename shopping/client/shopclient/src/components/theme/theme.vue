<template>
  <div>
    <div>
      <span v-for="(item,index) in list" :key="index">
        <img :src="imgPath+item.shopPic" alt :class="'imgs'+index" @click="clickHandler(item)" />
      </span>
    </div>
  </div>
</template>
<script>
import ThemeBussiness from "./bussiness";
import Config from "../../config/config";
export default {
  name: "theme",
  data() {
    return {
      list: [],
      imgPath: Config.RequestPath
    };
  },
  created() {
    new ThemeBussiness(this);
  },
  methods: {
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
h2 {
  .h2Font();
}
img {
  display: inline-block;
}
.imgs0,
.imgs1 {
  width: 49.5%;
}
.imgs1 {
  margin-left: 1%;
}
.imgs2 {
  width: 100%;
}
</style>
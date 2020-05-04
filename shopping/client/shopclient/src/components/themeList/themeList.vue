<template>
  <div class="themeContent">
    <h2>
      <img v-if="themeList.shopPic" :src="imgPath+themeList.shopPic" alt />
    </h2>
  </div>
</template>

<script>
import Config from "../../config/config";
import ThemeListBussiness from "./bussiness";
export default {
  data() {
    return {
      themeList: {},
      imgPath: Config.RequestPath,
      themeListBussiness: null
    };
  },
  created() {
    this.themeListBussiness = new ThemeListBussiness(this);
    this.themeListBussiness.initPageConfig(this.$route.query);
  },
  methods: {}
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
.themeContent {
  h2 {
    width: 100%;
    img {
      width: 100%;
    }
  }
}
</style>
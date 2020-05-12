<template>
  <div id="top">
    <span v-if="isBack" class="back iconfont icon-fanhui" @click="goBack"></span>
    <span class="title">{{title}}</span>
  </div>
</template>

<script>
export default {
  name: "top",
  data() {
    return {};
  },
  props: ["title", "isBack"],
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang='less' scoped>
@import "../../style/init.less";
#top {
  .dp(flex);
  z-index: 100;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  .h(120);
  .mcolor();
  .l_h(120);
  .back {
    position: absolute;
    top: 0;
    left: 10px;
    .titleFont();
  }
  .title {
    .titleFont();
    .f_s(34);
  }
}
</style>
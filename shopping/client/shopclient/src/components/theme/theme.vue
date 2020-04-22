<template>
  <div>
    <h2>精选主题</h2>
    <div>
      <span v-for="(item,index) in list" :key="index">
        <img :src="imgPath+item.shopPic" alt :class="'imgs'+index" />
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
    this.init();
  },
  methods: {
    init() {
      new ThemeBussiness(this);
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
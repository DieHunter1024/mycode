<template>
  <div id="left">
    <div
      v-for="(item,index) in list"
      :key="index"
      @click="sel(item.val)"
      :class="item.val==onesel?'selec':''"
    >{{item.name}}</div>
  </div>
</template>

<script>
import Config from "../../config/config";
import ShopType from "../../config/shopType";
const { EventName } = Config;
export default {
  data() {
    return {
      list: ShopType.shopType,
      onesel: "0"//默认选中第一项
    };
  },
  methods: {
    sel(item) {
      if (this.onesel == item) return;//防止重复点击同一个选项
      this.onesel = item;
      this.$events.emitEvent(EventName.SelectKind, item);//触发选中商品类型事件
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
#left {
  .w(215);
  height: 100%;
  position: fixed;
  .f_s(34);
  border-right: unit(1 / @pxtorem, rem) solid #d6d6d6;
  margin-right: unit(215 / @pxtorem, rem);
  div {
    .h(125);
    .l_h(125);
    text-align: center;
  }
  .selec {
    border-left: unit(8 / @pxtorem, rem) solid @mainColor;
    text-indent: unit(-8 / @pxtorem, rem);
    color: @mainColor;
  }
}
</style>
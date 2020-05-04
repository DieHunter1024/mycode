<template>
  <div class="shopOrder">
    <span class="mint-checkbox" @click="selectHandler">
      <input class="mint-checkbox-input" type="checkbox" :checked="isSelAll" />
      <span class="mint-checkbox-core"></span>
    </span>
    <span>全选({{selCount}})</span>
    <span @click="delSelShop">删除({{selCount}})</span>
  </div>
</template>

<script>
import Config from "../../config/config";
import { Toast } from "mint-ui";
const { EventName } = Config;
export default {
  name: "shopCarOrder",
  data() {
    return {
      shopCar: null,
      isSelAll: false,
      selCount: 0
    };
  },
  created() {
    this.shopCar = new this.$store.ShopCar();
    this.$events.onEvent(EventName.SelectParent, this.selAllHandler);
  },
  destroyed() {
    this.$events.offEvent(EventName.SelectParent, this.selAllHandler);
  },
  methods: {
    selectHandler() {
      this.isSelAll = !this.isSelAll;
      this.shopCar.selAllChild(this.isSelAll)
    },
    selAllHandler({ _count, _selCount }) {
      this.isSelAll = _count;
      this.selCount = _selCount;
    },
    delSelShop(){
      this.shopCar.delSelShop()
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
.shopOrder {
  .f_s(34);
  color: #fff;
  position: fixed;
  .mcolor();
  bottom: unit(130 / @pxtorem, rem);
  width: 100%;
  .h(130);
  .l_h(130);
  > span:nth-child(1),
  > span:nth-child(2) {
    padding-left: unit(35 / @pxtorem, rem);
  }
  > span:nth-child(3){
    padding-left: unit(200 / @pxtorem, rem);
  }
  span {
    display: inline-block;
  }
  .mint-checkbox-input + .mint-checkbox-core {
    background: transparent;
    border-color: #fff;
  }
  .mint-checkbox-input:checked + .mint-checkbox-core {
    .mcolor();
  }
}
</style>
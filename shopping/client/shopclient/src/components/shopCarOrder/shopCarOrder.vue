<template>
  <div class="shopOrder">
    <span class="mint-checkbox" @click="selectHandler">
      <input class="mint-checkbox-input" type="checkbox" :checked="isSelAll" />
      <span class="mint-checkbox-core"></span>
    </span>
    <span>全选({{selCount}})</span>
    <span @click="delSelShop">删除({{selCount}})</span>
    <span>
      <span>￥{{sum}}</span>
      <span class="icon-qianjin iconfont" @click="sendOrder"></span>
    </span>
  </div>
</template>

<script>
import Config from "../../config/config";
import ShopCarOrderBussiness from "./bussiness";
import { Toast } from "mint-ui";
const { EventName } = Config;
export default {
  name: "shopCarOrder",
  data() {
    return {
      shopCar: null,
      isSelAll: false,
      selCount: 0,
      sum: 0,
      orderList: null,
      shopCarOrderBussiness: null,
    };
  },
  created() {
    this.shopCar = new this.$store.ShopCar();
    this.shopCarOrderBussiness = new ShopCarOrderBussiness(this);
    this.$events.onEvent(EventName.SelectParent, this.selAllHandler);
  },
  destroyed() {
    this.$events.offEvent(EventName.SelectParent, this.selAllHandler);
  },
  methods: {
    selectHandler() {
      this.isSelAll = !this.isSelAll;
      this.shopCar.selAllChild(this.isSelAll);
    },
    selAllHandler({ _count, _selCount, _sum }) {
      this.isSelAll = _count;
      this.selCount = _selCount;
      this.sum = _sum;
    },
    delSelShop() {
      this.shopCar.delSelShop();
    },
    sendOrder() {
      this.shopCarOrderBussiness.sendOrderList();
    },
  },
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
  > span:nth-child(3) {
    padding-left: unit(200 / @pxtorem, rem);
  }

  > span:nth-child(4) {
    float: right;
    margin-right: unit(50 / @pxtorem, rem);
    > span:nth-child(1) {
      padding-left: unit(20 / @pxtorem, rem);
      border-left: 1px dashed #fff;
    }
    > span:nth-child(2) {
      padding-left: unit(50 / @pxtorem, rem);
    }
  }
  > span {
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
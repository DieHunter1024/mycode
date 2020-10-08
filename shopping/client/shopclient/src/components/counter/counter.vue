<template>
  <ul class="counter">
    <li @click="showPicker">
      数量
      <span>{{shopCount}}</span>
    </li>
    <li @click="addShopCar">
      加入购物车
      <span class="icon-jiarugouwuche iconfont"></span>
      <transition enter-active-class="animated zoomOutUp slow">
        <span v-show="showAnimate" class="icon-jiarugouwuche iconfont addIcon"></span>
      </transition>
    </li>
  </ul>
</template>

<script>
import Config from "../../config/config";
const { EventName } = Config;
export default {
  name: "Counter",
  data() {
    return {
      shopCount: 1,//默认购买商品数量
      showAnimate: false//动画标签隐藏
    };
  },
  created() {
    this.$events.onEvent(EventName.ChangeCount, _count => {//添加事件监听，监听商品数量变化
      this.shopCount = _count;
    });
    this.shopCar = new this.$store.ShopCar();
  },
  destroyed() {
    this.$events.offEvent(EventName.ChangeCount);
  },
  methods: {
    showPicker() {
      this.$events.emitEvent(EventName.ShowPicker);
    },
    addShopCar() {
      this.showAnimate = true;//显示元素
      setTimeout(() => {//延时的目的是等待动画完成
        this.shopCar.countShopItem({//缓存添加购物车数据
          ...this.$route.query,
          shopCount: this.shopCount
        });
        this.showAnimate = false;//隐藏元素
      }, 1000);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../style/init.less";
.counter {
  .h(120);
  .w(850);
  background: @mainColor;
  border-radius: 4rem;
  margin: 0 auto;
  .l_h(120);
  li {
    width: 49%;
    display: inline-block;
    .h(46);
    .l_h(46);
    .titleFont();
    .f_s(32);
    text-align: center;
  }
  li:nth-child(2) {
    margin-left: -2px;
    border-left: 1px dashed #dacda3;
    .addIcon {
      position: fixed;
      .f_s(75);
      z-index: -1;
      color: black;
    }
  }
}
</style>
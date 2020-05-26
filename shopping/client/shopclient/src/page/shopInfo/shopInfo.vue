<template>
  <div>
    <Top :title="shopName" :isBack="true"></Top>
    <div class="content">
      <div class="addCar icon-jiarugouwuche iconfont" @click="toShopCar">
        <span v-if="shopCount">{{shopCount}}</span>
      </div>
      <img :src="imgPath+shopPic" alt />
      <Counter></Counter>
      <ul class="info">
        <li>{{Number(shopNum)>0?'存货 '+shopNum+' 件':'缺货'}}</li>
        <li>￥{{shopPrice}}</li>
      </ul>
      <InfoNav></InfoNav>
      <ShopPicker :ShopMaxCount="ShopMaxCount" pickerTitle="商品数量"></ShopPicker>
    </div>
  </div>
</template>

<script>
import Top from "../../components/top/top";
import Counter from "../../components/counter/counter";
import InfoNav from "../../components/infoNav/infoNav";
import ShopPicker from "../../components/shopPicker/shopPicker";
import Config from "../../config/config";
import { Toast } from "mint-ui";
const { EventName, ShopMaxCount } = Config;
export default {
  name: "ShopInfo",
  data() {
    return {
      ShopMaxCount,
      imgPath: Config.RequestPath,
      ...this.$route.query,
      shopCar: null,
      shopCount: 0
    };
  },
  components: {
    Top,
    Counter,
    InfoNav,
    ShopPicker
  },
  created() {
    this.shopCar = new this.$store.ShopCar();
    this.shopCount = this.shopCar.state.length;
    this.$events.onEvent(EventName.CountShop, this.countHandler);
  },
  destroyed() {
    this.$events.offEvent(EventName.CountShop, this.countHandler);
  },
  methods: {
    toShopCar() {
      this.$router.replace("ShopCar");
    },
    countHandler(res) {
      if (res == "max") {
        Toast("添加失败，限购9件或库存不足");
        return;
      }
      Toast("添加成功");
      this.shopCount = this.shopCar.state.length;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
.content {
  .addCar {
    position: fixed;
    .t(180);
    .r(50);
    color: #515055;
    .f_s(80);
    span {
      display: block;
      .h(60);
      .w(60);
      color: #fff;
      border-radius: 100px;
      background: @mainColor;
      .f_s(20);
      transform: scale(0.8, 0.8);
      .l_h(60);
      text-align: center;
      position: absolute;
      left: -10px;
      top: -3px;
    }
  }
  img {
    .w(600);
    margin: 0 auto;
  }
  .info {
    width: 100%;
    text-align: center;
    li:nth-child(1) {
      .f_s(30);
      color: #424147;
      .padtop(70);
      .padbottom(40);
      .mg(0 auto);
    }
    li:nth-child(2) {
      .f_s(46);
    }
  }
}
</style>
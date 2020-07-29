<template>
  <ul class="orderList">
    <li v-if="orderList.length">我的订单</li>
    <li v-for="(item) in orderList" :key="item._id">
      <h4>
        订单编号：
        <span>{{item.orderId}}</span>
        <span>{{orderState[item.orderState].name}}</span>
      </h4>
      <div v-for="(shopitem) in item.shopList" :key="shopitem._id">
        <img :src="imgPath+shopitem.shopPic" alt />
        <div>{{shopitem.shopName}} {{shopitem.shopScale+'克'}}×{{shopitem.shopNum}}</div>
      </div>
    </li>
  </ul>
</template>

<script>
import OrderListBussiness from "./bussiness";
import Config from "../../config/config";
import ShopType from "../../config/shopType";
export default {
  data() {
    return {
      orderState: ShopType.orderState,
      imgPath: Config.RequestPath,
      orderList: [],
      orderListBussiness: null,
    };
  },
  created() {
    this.orderListBussiness = new OrderListBussiness(this);
    this.orderListBussiness.getOrderList();
  },
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
.orderList {
  .bg(#fff);
  li:first-child {
    border-bottom: 1px solid #ebebeb;
    .f_s(34);
    .h(100);
    .l_h(100);
    text-align: center;
    .cl(#8c8c8c);
  }
  li:not(:first-child) {
    .pd(0 0 0 20px);
    h4 {
      .h(100);
      .l_h(100);
      border-top: 1px solid #ebebeb;
      .f_s(34);
      .cl(#757575);
      span {
        .cl(#8c8c8c);
      }
      span:nth-child(2) {
        .cl(#A71A2D);
        float: right;
        padding-right: 20px;
      }
    }
    > div {
      .h(200);
      img {
        .h(200);
        .w(200);
        display: inline-block;
        vertical-align: middle;
      }
      div {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
</style>
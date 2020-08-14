<template>
  <ul class="orderList">
    <li v-if="orderList.length">我的订单</li>
    <li v-for="(item) in orderList" :key="item._id">
      <h4>
        订单编号：
        <span>{{item.orderId}}</span>
        <span
          :class="item.orderState==0?'noPay':item.orderState==4?'isFinish':'isPay'"
        >{{orderState[item.orderState].name}}</span>
      </h4>
      <div v-for="(shopitem) in item.shopList" :key="shopitem._id">
        <img :src="imgPath+shopitem.shopPic" alt />
        <div>
          {{shopitem.shopName}} {{shopitem.shopScale+'克'}}
          <br />
          {{shopitem.shopCount+'份'}} × {{shopitem.shopPrice+'元'}}
        </div>
      </div>
      <div>
        <span>实付：￥{{item.orderPrice}}元</span>
        <mt-button
          class="btn"
          @click="routeToOrder(item.orderId)"
          type="danger"
        >{{item.orderState==0?'付款':'查看'}}</mt-button>
      </div>
    </li>
  </ul>
</template>

<script>
import OrderListBussiness from "./bussiness";
import Config from "../../config/config";
import ShopType from "../../config/shopType";
import { Button } from "mint-ui";
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
  methods: {
    routeToOrder(orderId) {
      this.$router.push({
        name: "Order",
        query: { orderId },
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
.orderList {
  li:first-child {
    .bg(#fff);
    border-bottom: unit(1 / @pxtorem, rem) solid #ebebeb;
    .f_s(34);
    .h(100);
    .l_h(100);
    text-align: center;
    .cl(#8c8c8c);
  }
  li:not(:first-child) {
    .pd(0 0 0 unit(36 / @pxtorem, rem));
    .mg(0 0 unit(10 / @pxtorem, rem));
    .bg(#fff);
    h4 {
      .h(100);
      .l_h(100);
      border-top: unit(1 / @pxtorem, rem) solid #ebebeb;
      .f_s(34);
      .cl(#757575);
      .isFinish {
        .cl(@mainColor);
      }
      .isPay {
        .cl(#000);
      }
      .noPay {
        .cl(#A71A2D);
      }
      span {
        .cl(#8c8c8c);
      }
      span:nth-child(2) {
        float: right;
        padding-right: unit(40 / @pxtorem, rem);
      }
    }
    > div:not(:last-child) {
      .h(200);
      border-top: unit(1 / @pxtorem, rem) solid #eaeaea;
      border-bottom: unit(1 / @pxtorem, rem) solid #eaeaea;
      img {
        .h(200);
        .w(200);
        .dp(inline-block);
        vertical-align: middle;
      }
      div {
        .dp(inline-block);
        vertical-align: middle;
      }
    }
    > div:last-child {
      .l_h(100);
      .h(100);
      .btn {
        .w(200);
        .h(70);
        .f_s(20);
        float: right;
        margin-right: unit(40 / @pxtorem, rem);
        margin-top: unit(16 / @pxtorem, rem);
      }
    }
  }
}
</style>
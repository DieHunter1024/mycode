<template>
  <div class="content">
    <div class="orderTop">
      <div>
        <div>
          <p class="fontcl">
            下单时间：
            <span>{{new Date(orderList.orderTime).toLocaleString()}}</span>
          </p>
          <p class="fontcl">
            订单编号：
            <span>{{orderList.orderId}}</span>
          </p>
        </div>
        <div
          :class="orderList.orderState==0?'noPay':orderList.orderState==4?'isFinish':'isPay'"
        >{{orderState[orderList.orderState||0].name}}</div>
      </div>
      <div>
        <div>
          <span class="icon-yonghuming iconfont">{{orderList.username}}</span>
          <span class="icon-shoujihao iconfont">{{orderList.phoneNum}}</span>
        </div>
        <div class="fontcl">{{orderList.address}}</div>
      </div>
    </div>
    <ul class="orderList">
      <li v-for="(item,index) in orderList.shopList" :key="index">
        <img :src="imgPath+item.shopPic" alt />
        <div>
          {{item.shopName+item.shopScale}}
          <br />
          ￥{{item.shopPrice}}
        </div>
        <span>×{{item.shopCount}}</span>
      </li>
    </ul>
    <div class="submitOrder">
      <span>付款合计：￥{{orderList.orderPrice}}</span>
      <span @click="submitOrder" v-show="orderList.orderState==0">去付款</span>
    </div>
  </div>
</template>

<script>
import OrderBussiness from "./bussiness";
import Config from "../../config/config";
import ShopType from "../../config/shopType";
export default {
  name: "orderList",
  data() {
    return {
      orderState: ShopType.orderState,
      imgPath: Config.RequestPath,
      orderList: [],//订单详情
      orderBussiness: null,
    };
  },
  created() {
    this.orderBussiness = new OrderBussiness(this);
    this.orderBussiness.getOrderList();
  },
  methods: {
    submitOrder() {
      this.orderBussiness.sendOrderPay(this.orderList);//支付
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
.content {
  font-size: unit(32 / @pxtorem, rem);
  .fontcl {
    .cl(#979797);
  }
  .orderTop {
    > div {
      padding-left: unit(35 / @pxtorem, rem);
      padding-right: unit(35 / @pxtorem, rem);
    }
    > div:nth-child(1) {
      .h(160);
      border-bottom: unit(3 / @pxtorem, rem) solid #e8e8e8;
      > div:nth-child(1) {
        float: left;
        p {
          .l_h(80);
          span {
            .cl(#000);
          }
        }
      }
      > div:nth-child(2) {
        float: right;
        .h(160);
        .l_h(160);
      }
      .isFinish {
        .cl(@mainColor);
      }
      .isPay {
        .cl(#000);
      }
      .noPay {
        .cl(#A71A2D);
      }
    }
    > div:nth-child(2) {
      .h(180);
      border-bottom: unit(30 / @pxtorem, rem) solid #f3f3f3;
      > div:nth-child(1) {
        overflow: hidden;
        .l_h(100);
        span:nth-child(1) {
          float: left;
        }
        span:nth-child(2) {
          float: right;
        }
      }
      > div:nth-child(2) {
        width: 100%;
      }
    }
  }
  .orderList {
    li {
      .h(250);
      padding-left: unit(20 / @pxtorem, rem);
      padding-right: unit(35 / @pxtorem, rem);
      > div,
      > span,
      img {
        display: inline-block;
        vertical-align: middle;
      }
      img {
        .w(220);
        .h(220);
        margin-right: unit(30 / @pxtorem, rem);
      }
      > div {
        .l_h(60);
      }
      > span {
        vertical-align: top;
        margin-top: unit(50 / @pxtorem, rem);
        float: right;
      }
    }
  }
  .submitOrder {
    .h(130);
    width: 100%;
    position: fixed;
    bottom: 0;
    background: #fff;
    border-top: unit(3 / @pxtorem, rem) solid #cdcdcd;
    span:nth-child(1) {
      float: left;
      .pd(unit(40 / @pxtorem, rem));
      .cl(#852332);
    }
    span:nth-child(2) {
      .mcolor();
      .pd(unit(45 / @pxtorem, rem) unit(110 / @pxtorem, rem));
      float: right;
      .cl(#fff);
    }
  }
}
</style>
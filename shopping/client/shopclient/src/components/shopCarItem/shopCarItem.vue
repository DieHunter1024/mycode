<template>
  <div>
    <ul v-if="shopList.length" class="shopCar">
      <li v-for="(item,index) in shopList" :key="index">
        <span class="mint-checkbox" @click="selectHandler(index)">
          <input class="mint-checkbox-input" type="checkbox" :checked="item.isSelect" />
          <span class="mint-checkbox-core"></span>
        </span>
        <img :src="imgPath+item.shopPic" alt />
        <div class="shopInfo">
          <div>
            <span>{{item.shopName}} {{item.shopScale}}克</span>
            <span>￥{{item.shopPrice}}</span>
          </div>
          <div>
            <mt-button class="minus" type="default" @click="minusShopHandler(item)">-</mt-button>
            <span>{{item.shopCount}}</span>
            <mt-button class="add" type="default" @click="addShopHandler(item)">+</mt-button>
            <mt-button class="del" type="default" @click="delShopHandler(index)">×</mt-button>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="noShop">
      <div class="icon-jiarugouwuche iconfont"></div>
      <span>购物车为空</span>
    </div>
  </div>
</template>

<script>
import Config from "../../config/config";
import { Toast } from "mint-ui";
const { EventName } = Config;
export default {
  name: "shopCarItem",
  data() {
    return {
      shopCar: null,//初始化购物车
      shopList: [],//购物车列表state
      imgPath: Config.RequestPath,//静态文件根目录
      selectAll: false,//全选
    };
  },
  created() {
    this.shopCar = new this.$store.ShopCar();
    this.shopList = this.shopCar.state;
    this.$events.onEvent(EventName.CountShop, this.countHandler);//商品数量监听
    this.$events.onEvent(EventName.SelectAllChild, this.selAllHandler);//商品全选监听
  },
  mounted() {
    this.shopCar.filterSelect();//初始化全选，商品数量，商品总价
  },
  destroyed() {
    this.$events.offEvent(EventName.CountShop, this.countHandler);
    this.$events.offEvent(EventName.SelectAllChild, this.selAllHandler);
  },
  methods: {
    countHandler(res) {//修改商品数量，刷新数据
      this.shopList = this.shopCar.state;
      this.shopCar.filterSelect();
    },
    selectHandler(_id) {//修改商品全选，单个商品驱动全选按钮，刷新数据
      this.shopList[_id].isSelect = !this.shopList[_id].isSelect;
      this.shopCar.state = this.shopList;
      this.shopCar.filterSelect();
    },
    selAllHandler() {//修改商品全选，全选按钮驱动单个商品，刷新数据
      this.shopList = this.shopCar.state;
      this.shopCar.filterSelect();
    },
    addShopHandler(_data) {//添加商品，刷新数据
      _data.shopCount = 1;
      this.shopCar.countShopItem({
        ..._data,
      });
    },
    minusShopHandler(_data) {//减少商品，刷新数据
      _data.shopCount = -1;
      this.shopCar.countShopItem({
        ..._data,
      });
    },
    delShopHandler(_id) {//删除单个商品，刷新数据
      this.shopCar.delShopItem(_id);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
.noShop {
  width: 100%;
  height: 100%;
  text-align: center;
  span {
    .f_s(36);
  }
  div {
    .w(200);
    .h(200);
    border-radius: 100%;
    background: @mainColor;
    .titleFont();
    box-shadow: 5px 5px 8px #777;
    .l_h(200);
    text-align: center;
    margin: 100px auto 20px;
    .f_s(100);
  }
}
.shopCar {
  .padbottom(130);
  width: 100%;
  li {
    border-bottom: 1px solid #d3d3d3;
    padding-left: unit(35 / @pxtorem, rem);
    .h(320);
    .mint-checkbox {
      .h(320);
      .l_h(320);
      display: inline-block;
      vertical-align: middle;
    }
    .mint-checkbox-input:checked + .mint-checkbox-core {
      background: #ea3e3c;
      border-color: #ea3e3c;
    }
    img {
      .h(265);
      .w(265);
      margin-left: unit(20 / @pxtorem, rem);
      display: inline-block;
      vertical-align: middle;
      background: #f5f6f5;
    }
    .shopInfo {
      .h(235);
      width: 50%;
      .padtop(30);
      padding-left: unit(10 / @pxtorem, rem);
      display: inline-block;
      vertical-align: middle;
      div:nth-child(1) {
        overflow: hidden;
        span {
          float: left;
        }
        span:nth-child(2) {
          float: right;
        }
      }
      div:nth-child(2) {
        margin-top: unit(85 / @pxtorem, rem);
        span {
          display: inline-block;
          vertical-align: middle;
          padding: 0 unit(50 / @pxtorem, rem);
        }
        .add,
        .minus,
        .del {
          display: inline-block;
          vertical-align: middle;
          background: white;
          box-shadow: none;
          .f_s(50);
        }
        .del {
          float: right;
        }
      }
    }
  }
}
</style>
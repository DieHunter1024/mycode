<template>
  <div class="info">
    <mt-navbar v-model="selected">
      <mt-tab-item v-for="(item,index) in navTitle" :key="index" :id="item.val">{{item.name}}</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item class="doc" id="0">
        <div>名称：{{shopName}}</div>
        <div>类型：{{Type[shopType].name}}</div>
        <div>数量：{{shopNum}}个</div>
        <div>￥{{shopPrice}}元</div>
      </mt-tab-container-item>
      <mt-tab-container-item class="doc" id="1">
        <div>净含量/克(g)：{{shopScale}}</div>
        <div>口味：{{taste}}</div>
        <div>产地：{{address}}</div>
        <div>保质期：{{expiryDate}}</div>
        <div>上架时间：{{time}}</div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <h3>7天包退</h3>
        <h3>15天包换</h3>
        <h3>一年保修</h3>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import { Navbar, TabItem } from "mint-ui";
import NavConfig from "../../config/navConfig";
import ShopType from "../../config/shopType";

export default {
  name: "infoNav",
  data() {
    return {
      selected: "0",//默认选中第一项
      navTitle: NavConfig.NavTitle,
      Type: ShopType.shopType,
      ...this.$route.query//路由传参，将商品信息传递到data中
    };
  }
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
@fontcolor: #bababa;
.info {
  .mg(20px auto);
  .navBar();
  h3 {
    text-align: center;
    color: @mainColor;
  }
  .doc div {
    text-align: center;
    padding: 0.625rem 0;
  }
}
</style>
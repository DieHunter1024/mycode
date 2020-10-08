<template>
  <div>
    <Top title="购物车"></Top>
    <div class="content">
      <ShopCarItem></ShopCarItem>
      <ShopCarOrder></ShopCarOrder>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Top from "../../components/top/top";
import ShopCarItem from "../../components/shopCarItem/shopCarItem";
import ShopCarOrder from "../../components/shopCarOrder/shopCarOrder";
import TabBar from "../../components/tabBar/tabBar";
export default {
  name: "shopCar",
  data() {
    return {};
  },
  components: {
    Top,
    ShopCarItem,
    ShopCarOrder,
    TabBar
  },
  created() {}
};
</script>
<style lang="less" scoped>
@import "../../style/init.less";
</style>
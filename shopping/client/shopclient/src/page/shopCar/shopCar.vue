<template>
  <div>
    <Top title="购物车"></Top>
    <div class="content">
      <ShopCarItem></ShopCarItem>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Top from "../../components/top/top";
import ShopCarItem from "../../components/shopCarItem/shopCarItem";
import TabBar from "../../components/tabBar/tabBar";
export default {
  name: "shopCar",
  data() {
    return {};
  },
  components: {
    Top,
    ShopCarItem,
    TabBar
  },
  created() {}
};
</script>
<style lang="less" scoped>
@import "../../style/init.less";
</style>
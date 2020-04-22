<template>
  <div>
    <Top title="零食商贩"></Top>
    <div class="content">
      <Banner></Banner>
      <Theme></Theme>
      <ShopItem></ShopItem>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from "../../components/tabBar/tabBar";
import Top from "../../components/top/top";
import Banner from "../../components/banner/banner";
import Theme from "../../components/theme/theme";
import ShopItem from "../../components/shopItem/shopItem";
export default {
  name: "Home",
  components: {
    Top,
    Banner,
    Theme,
    ShopItem,
    TabBar
  }
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
.content {
  .padtop(120);
  .padbottom(130);
}
</style>
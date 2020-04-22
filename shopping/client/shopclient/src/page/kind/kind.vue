<template>
  <div>
    <Top title="分类"></Top>
    <div class="content">
      <leftMenu></leftMenu>
      <rightShop></rightShop>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from "../../components/tabBar/tabBar";
import Top from "../../components/top/top";
import leftMenu from "../../components/leftMenu/leftMenu";
import rightShop from "../../components/rightShop/rightShop";
export default {
  name: "Kind",
  components: {
    Top,
    leftMenu,
    rightShop,
    TabBar
  }
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
</style>
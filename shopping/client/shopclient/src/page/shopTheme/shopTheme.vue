<template>
  <div>
    <Top :title="title" :isBack="true"></Top>
    <div class="content">
      <ThemeList></ThemeList>
      <ShopItem :shopType="shopType"></ShopItem>
    </div>
  </div>
</template>

<script>
import Top from "../../components/top/top";
import ThemeList from "../../components/themeList/themeList";
import ShopItem from "../../components/shopItem/shopItem";
export default {
  name: "ShopTheme",
  data() {
    return {
      shopType: this.$route.query._type,
      title: this.$route.query._shopName
    };
  },
  components: {
    Top,
    ThemeList,
    ShopItem
  }
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
.content {
  padding-bottom: 0;
}
</style>
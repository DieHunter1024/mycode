<template>
  <ul id="tab">
    <router-link
      v-for="(item, index) in menuList"
      :key="index"
      :to="item.path"
      tag="li"
      :class="item.icon"
      active-class="change"
      replace
    >
      <br />
      {{item.name}}
    </router-link>
  </ul>
</template>

<script>
import tableBarModel from "./model";
export default {
  name: "tabBar",
  data() {
    return {
      menuList: tableBarModel.MenuList
    };
  }
};
</script>

<style lang='less' scoped>
@import "../../style/init.less";
#tab {
  display: flex;
  
  box-shadow: -1px 0 8px #999;
  z-index: 100;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  .h(130);
  .bcolor();
  .li {
    .h(130);
    box-sizing: border-box;
    padding-top: unit(10 / @pxtorem, rem);
    width: 25%;
    text-align: center;
    .fontColorOff();
  }
  .li::before {
    .f_s(58);
  }
  .li {
    .f_s(26);
  }
  .change {
    .fontColorOn();
  }
}
</style>
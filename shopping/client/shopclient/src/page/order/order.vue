<template>
  <div>
    <Top isBack="true" title="订单详情"></Top>
    <OrderList></OrderList>
  </div>
</template>

<script>
import Top from "../../components/top/top";
import OrderList from "../../components/orderList/orderList";
export default {
  name: "order",
  components: {
    Top,
    OrderList,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
</style>
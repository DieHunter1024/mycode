<template>
  <div>
    <h2>{{title}}</h2>
  </div>
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
h2 {
  .h2Font();
}
</style>
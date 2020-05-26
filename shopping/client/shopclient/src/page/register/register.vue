<template>
  <div>
    <Top isBack="true" :title="isReg?'注册':'找回密码'"></Top>
    <div class="content">
      <RegForm></RegForm>
    </div>
  </div>
</template>

<script>
import Top from "../../components/top/top";
import config from "../../config/config";
import RegForm from "../../components/regForm/regForm";
export default {
  name:'register',
  components: {
    Top,
    RegForm
  },
  data() {
    return {
      isReg: true
    };
  },
  created() {},
  destroyed() {}
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
</style>
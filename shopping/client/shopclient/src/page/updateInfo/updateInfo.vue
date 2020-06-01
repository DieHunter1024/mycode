<template>
  <div>
    <Top isBack="true" title="个人信息"></Top>
    <div class="content">
      <UpdateForm></UpdateForm>
    </div>
  </div>
</template>

<script>
import Top from "../../components/top/top";
import UpdateForm from "../../components/updateForm/updateForm";
export default {
  name: "updateInfo",
  components: { Top, UpdateForm }
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
</style>
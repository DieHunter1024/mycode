<template>
  <div class="update">
    <img :src="imgPath+userInfo.headPic" alt />
    <mt-field
      placeholder="请输入用户名"
      :state="userInfo.username.length?'success':'error'"
      v-model="userInfo.username"
    ></mt-field>
    <mt-radio v-model="userInfo.sex" :options="sexOption"></mt-radio>
    <mt-button class="btn" @click="selectAddress">{{userInfo.alladdress.join('-')}}</mt-button>
  </div>
</template>

<script>
import UpdateBussiness from "./bussiness";
import Config from "../../config/config";
import { Field, Button, Picker, Popup, Radio } from "mint-ui";
import address from "../../config/city";
const { StorageName, RequestPath } = Config;
export default {
  name: "updateForm",
  data() {
    return {
      imgPath: RequestPath,
      updateBussiness: null,
      sexOption: [
        {
          label: "男",
          value: "man"
        },
        {
          label: "女",
          value: "woman"
        }
      ],
      userInfo: this.$storage.getStorage(StorageName.UserInfo)
    };
  },
  components: {},
  created() {
    console.log(this.userInfo);
    this.updateBussiness = new UpdateBussiness(this);
  },
  methods: {
    selectAddress() {}
  }
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
.update {
  > img {
    .w(200);
    .h(200);
    .mg(20px auto);
    border-radius: 100%;
  }
  .btn {
    width: 100%;
    .h(100);
    background: #fff;
  }
}
</style>
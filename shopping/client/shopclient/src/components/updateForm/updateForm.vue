<template>
  <div class="update">
    <!-- <img :src="imgPath+userInfo.headPic" alt /> -->
    <UploadPic class="uploadPic" :picFile="userInfo.headPic"></UploadPic>
    <mt-field
      placeholder="请输入用户名"
      :state="userInfo.username.length?'success':'error'"
      v-model="userInfo.username"
    ></mt-field>
    <mt-field
      placeholder="请输入手机号"
      :state="userInfo.phoneNum.length?'success':'error'"
      v-model="userInfo.phoneNum"
      type="number"
    ></mt-field>
    <mt-radio v-model="userInfo.sex" :options="sexOption"></mt-radio>
    <mt-button class="btn" @click="selectAddress">{{userInfo.alladdress.join('-')}}</mt-button>
    <mt-field
      placeholder="请输入详细地址"
      :state="userInfo.address.length?'success':'error'"
      v-model="userInfo.address"
    ></mt-field>
    <mt-field
      placeholder="请输入个性签名"
      :state="userInfo.descript.length?'success':'error'"
      v-model="userInfo.descript"
    ></mt-field>
    <mt-button class="submit" type="primary" @click="submit">修改信息</mt-button>
    <div class="shopPicker">
      <mt-popup v-model="popupVisible" position="bottom">
        <mt-picker
          :slots="myAddressSlots"
          value-key="name"
          :visibleItemCount="7"
          @change="changeAddress"
        ></mt-picker>
      </mt-popup>
    </div>
  </div>
</template>

<script>
import UpdateBussiness from "./bussiness";
import Config from "../../config/config";
import { Field, Button, Picker, Popup, Radio } from "mint-ui";
import address from "../../config/city";
import UploadPic from "../uploadPic/uploadPic";
const { StorageName, RequestPath, EventName } = Config;
export default {
  name: "updateForm",
  data() {
    return {
      imgPath: RequestPath,
      updateBussiness: null,
      popupVisible: false,
      selectArea: null,
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
      myAddressSlots: [
        {
          flex: 1,
          defaultIndex: 0,
          values: [],
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          values: [],
          className: "slot5",
          textAlign: "center"
        }
      ],
      userInfo: this.$storage.getStorage(StorageName.UserInfo)
    };
  },
  components: {
    UploadPic
  },
  created() {
    this.$events.onEvent(EventName.UploadPic, headPic => {
      this.userInfo.headPic = headPic;
    });
    this.updateBussiness = new UpdateBussiness(this);
  },
  destroyed() {
    this.$events.offEvent(EventName.UploadPic);
  },
  methods: {
    selectAddress() {
      this.myAddressSlots[0].values = address;
      this.popupVisible = true;
    },
    changeAddress(picker, values) {
      if (values[0]) {
        this.userInfo.alladdress = [values[0].name];
        picker.setSlotValues(1, values[0].children);
        if (values[1]) {
          this.userInfo.alladdress.push(values[1].name);
          picker.setSlotValues(2, values[1].children);
          if (values[2]) {
            this.userInfo.alladdress.push(values[2].name);
          }
        }
      }
    },
    submit() {
      this.updateBussiness.submitData();
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
.update {
  .uploadPic {
    overflow: hidden;
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
  .submit {
    margin-top: 30px;
    width: 100%;
    // z-index: 100;
  }
}
</style>
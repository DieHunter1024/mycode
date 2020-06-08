import Vue from 'vue'
import config from "../../config/config"
import {
  Toast
} from "mint-ui";
const {
  ServerApi,
  StorageName,
  EventName
} = config
export default class UpdateBussiness extends Vue {
  constructor(_vueComponent) {
    super()
    this.vueComponent = _vueComponent
  }
  submitData() {
    for (const key in this.vueComponent.userInfo) {
      if (!this.vueComponent.userInfo[key].length && this.vueComponent.userInfo[key] != true && this.vueComponent.userInfo[key] != 0) {
        Toast('请填写完整的信息');
        return
      }
    }
    console.log(this.vueComponent.userInfo)
    this.$axios
      .post(ServerApi.user.updateUser, {
        crypto: this.$crypto.setCrypto({
          token: this.$storage.getStorage(StorageName.Token),
          ...this.vueComponent.userInfo
        })
      }).then(res => {
        switch (res.result) {
          case 1:
            Toast(res.msg);
            history.go(-1)
            break;
          default:
            break;
        }
      })
  }
}

import Vue from 'vue'
import {
  Toast
} from "mint-ui";
import config from "../../config/config"
const {
  ServerApi,
  StorageName,
  EventName
} = config
export default class LoginBussiness extends Vue {
  constructor(_vueComponent) {
    super()
    this.vueComponent = _vueComponent
  }
  submitData() {
    if (!this.vueComponent.userInfo.username.length || !this.vueComponent.userInfo.password.length) {
      Toast('请填写完整的登录信息');
      return
    }
    this.$axios
      .get(ServerApi.user.userLogin, {
        params: {
          crypto: this.$crypto.setCrypto({
            ...this.vueComponent.userInfo
          })
        },
      }).then(res => {
        this.vueComponent.userInfo.password = "";
        switch (res.result) {
          case 1:
            Toast(res.msg);
            this.vueComponent.userInfo.username = "";
            this.$storage.saveStorage(StorageName.Token, res.token)
            this.$events.emitEvent(EventName.IsLogin)
            break;
          default:
            break;
        }
      }).catch(err => {

      })
    console.log(this.vueComponent)
  }
}

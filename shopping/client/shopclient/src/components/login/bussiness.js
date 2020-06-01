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
  sendCode() {

    return new Promise((resolve, reject) => {
      if (!this.vueComponent.userInfo.username.length) {
        Toast('请填写正确的邮箱');
        return
      }
      this.$axios
        .get(ServerApi.user.getMailCode, {
          params: {
            crypto: this.$crypto.setCrypto({
              codeType: "login",
              username: this.vueComponent.userInfo.username
            })
          },
        }).then(res => {
          switch (res.result) {
            case 1:
              Toast(res.msg);
              resolve(res)
              break;
            default:
              reject(res)
              break;
          }
        }).catch(err => {
          reject(err)
        })
    })

  }
  submitData() {
    if (!this.vueComponent.userInfo.username.length) {
      Toast('请填写用户名或邮箱');
      return
    }
    switch (this.vueComponent.loginType) {
      case 'code':
        if (this.vueComponent.userInfo.mailcode.length != 4) {
          Toast('请填写正确的验证码');
          return
        }
        break;
      case 'psd':
        if (!this.vueComponent.userInfo.password.length) {
          Toast('请填写密码');
          return
        }
        break;
    }

    this.$axios
      .post(ServerApi.user.userLogin, {
        crypto: this.$crypto.setCrypto({
          loginType: this.vueComponent.loginType,
          ...this.vueComponent.userInfo
        })
      }).then(res => {
        this.vueComponent.userInfo.password = "";
        this.vueComponent.userInfo.mailcode = "";
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
  }
}

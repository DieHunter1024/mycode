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
      if (!this.vueComponent.userInfo.mailaddress.length) {
        Toast('请填写正确的邮箱');
        return
      }
      this.$axios
        .get(ServerApi.user.getMailCode, {
          params: {
            crypto: this.$crypto.setCrypto({
              codeType: "reg",
              username: this.vueComponent.userInfo.mailaddress + this.vueComponent.userInfo.mailurl
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
    for (const key in this.vueComponent.userInfo) {
      if (this.vueComponent.userInfo.hasOwnProperty(key) && !this.vueComponent.userInfo[key].length) {
        Toast('请填写完整的信息');
        return
      }
    }
    this.$axios
      .post(ServerApi.user.userReg, {
        crypto: this.$crypto.setCrypto({
          ...this.vueComponent.userInfo
        })
      }).then(res => {
        this.vueComponent.userInfo.password = "";
        this.vueComponent.userInfo.repassword = "";
        this.vueComponent.userInfo.mailcode = "";
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

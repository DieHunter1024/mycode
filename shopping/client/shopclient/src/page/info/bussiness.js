import Vue from "vue";
import config from "../../config/config";
const { ServerApi, StorageName } = config;
export default class UserInfoBussiness extends Vue {
  constructor(_vueComponent) {
    super();
    this.vueComponent = _vueComponent;
  }
  checkToken() {//验证Token函数，若token正确，则直接登录成功，若未成功，则切换至登录界面
    let token = this.$storage.getStorage(StorageName.Token);
    if (!token || !token.length) return;
    this.$axios
      .get(ServerApi.token, {
        params: {
          token
        }
      })
      .then(res => {
        switch (res.result) {
          case -999://token请求抛发错误，token过期或错误
            this.vueComponent.isLogin = false;//显示登录页面
            this.$storage.clearStorage(StorageName.Token);//清除之前的token
            break;
          case 1://验证token成功
            this.vueComponent.userInfo = res.data;
            this.vueComponent.isLogin = true;//显示个人信息页面
            break;
          default:
            this.vueComponent.isLogin = false;
            this.$storage.clearStorage(StorageName.Token);
            break;
        }
      })
      .catch(err => {});
  }
}

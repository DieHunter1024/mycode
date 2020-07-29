import Vue from "vue";
import { Toast } from "mint-ui";
import config from "../../config/config";
const { ServerApi, StorageName, EventName, DefaultPageConfig } = config;
export default class OrderBussiness extends Vue {
  constructor(_vueComponent) {
    super();
    this.vueComponent = _vueComponent;
  }
  getOrderList() {
    DefaultPageConfig.token = this.$storage.getStorage(StorageName.Token);
    DefaultPageConfig.keyWord = this.$storage.getStorage(StorageName.UserInfo).username;
    this.$axios
      .get(ServerApi.order.orderList, {
        params: {
          crypto: this.$crypto.setCrypto(DefaultPageConfig)
        }
      })
      .then(res => {
        console.log(res);
        switch (res.result) {
          case 1:
            this.vueComponent.orderList = res.data.list;
            break;
          default:
            break;
        }
      });
  }
}

import Vue from "vue";
import { Toast } from "mint-ui";
import config from "../../config/config";
import Clone from "../../utils/clone";
const { ServerApi, StorageName, EventName, DefaultPageConfig } = config;
export default class OrderBussiness extends Vue {
  constructor(_vueComponent) {
    super();
    this.vueComponent = _vueComponent;
    this._defaultPageConfig = Clone.shallowClone(DefaultPageConfig);
  }
  getOrderList() {
    this._defaultPageConfig.token = this.$storage.getStorage(StorageName.Token);
    this._defaultPageConfig.keyWord = this.$storage.getStorage(
      StorageName.UserInfo
    ).username;
    this.$axios
      .get(ServerApi.order.orderList, {
        params: {
          crypto: this.$crypto.setCrypto(this._defaultPageConfig)
        }
      })
      .then(res => {
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

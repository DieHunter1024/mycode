import Vue from "vue";
import { MessageBox } from "mint-ui";
import config from "../../config/config";
const { ServerApi, StorageName, EventName, DefaultPageConfig } = config;
export default class OrderBussiness extends Vue {
  constructor(_vueComponent) {
    super();
    this.vueComponent = _vueComponent;
  }
  getOrderList() {
    DefaultPageConfig.token = this.$storage.getStorage(StorageName.Token);
    DefaultPageConfig.orderId = this.vueComponent.$route.query.orderId;
    this.$axios
      .get(ServerApi.order.orderList, {
        params: {
          crypto: this.$crypto.setCrypto(DefaultPageConfig)
        }
      })
      .then(res => {
        switch (res.result) {
          case 1:
            this.vueComponent.orderList = res.data.list[0];
            break;
          default:
            break;
        }
      });
  }
  sendOrderPay(data) {
    MessageBox("提示", "本案例仅为参考，未开通支付功能");
    data.orderState = 1;
    data.token = this.$storage.getStorage(StorageName.Token);
    this.$axios
      .post(ServerApi.order.updateOrder, {
        crypto: this.$crypto.setCrypto(data)
      })
      .then(res => {
        switch (res.result) {
          case 1:
            console.log(res);
            break;
          default:
            break;
        }
      });
  }
}

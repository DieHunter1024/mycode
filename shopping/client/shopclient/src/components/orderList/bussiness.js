import Vue from "vue";
import { MessageBox } from "mint-ui";
import config from "../../config/config";
import Clone from "../../utils/clone";
const { ServerApi, StorageName, EventName, DefaultPageConfig } = config;
export default class OrderBussiness extends Vue {
  constructor(_vueComponent) {
    super();
    this.vueComponent = _vueComponent;
    this._defaultPageConfig = Clone.shallowClone(DefaultPageConfig);
  }
  getOrderList() {//获取个人订单信息列表
    this._defaultPageConfig.token = this.$storage.getStorage(StorageName.Token);
    this._defaultPageConfig.orderId = this.vueComponent.$route.query.orderId;
    this.$axios
      .get(ServerApi.order.orderList, {
        params: {
          crypto: this.$crypto.setCrypto(this._defaultPageConfig)
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
    data.orderState = 1;//修改订单状态为已支付
    data.token = this.$storage.getStorage(StorageName.Token);
    this.$axios
      .post(ServerApi.order.updateOrder, {
        crypto: this.$crypto.setCrypto(data)
      })
      .then(res => {
        switch (res.result) {
          case 1:
            break;
          default:
            break;
        }
      });
  }
}

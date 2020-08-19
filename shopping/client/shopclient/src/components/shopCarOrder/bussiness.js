import Vue from "vue";
import { Toast } from "mint-ui";
import config from "../../config/config";
const { ServerApi, StorageName } = config;
export default class ShopCarOrderBussiness extends Vue {
  constructor(_vueComponent) {
    super();
    this.vueComponent = _vueComponent;
  }
  sendOrderList() {
    let _shopCar = this.vueComponent.shopCar.state.filter(
      item => item.isSelect
    );
    if (!_shopCar.length) {
      Toast("请选择商品");
      return;
    }
    this.vueComponent.orderList = {
      orderState: "0",
      shopList: _shopCar,
      token: this.$storage.getStorage(StorageName.Token),
      username: this.$storage.getStorage(StorageName.UserInfo).username || ""
    };
    this.$axios
      .post(ServerApi.order.addOrder, {
        crypto: this.$crypto.setCrypto(this.vueComponent.orderList)
      })
      .then(res => {
        Toast(res.msg);
        switch (res.result) {
          case 1:
            this.vueComponent.shopCar.delSelShop();
            this.vueComponent.$router.push({
              name: "Order",
              query: { orderId: res.orderId }
            });
            break;
          default:
            break;
        }
      });
  }
}

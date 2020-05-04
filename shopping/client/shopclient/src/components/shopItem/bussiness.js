import Vue from 'vue';
import config from "../../config/config";
import ItemModel from "./model";
import Clone from "../../utils/clone"
const {
  DefaultPageConfig,
  ServerApi
} = config
export default class ItemBussiness extends Vue {
  constructor(_vueComponent) {
    super()
    ItemModel.getInstance().vueComponent = _vueComponent
    this.initPageConfig(_vueComponent.shopType)
    this.getShopItem()
  }
  initPageConfig(_shopType) {
    ItemModel.getInstance().pageConfig = Clone.shallowClone(DefaultPageConfig)
    ItemModel.getInstance().pageConfig.shopType = _shopType
  }
  getShopItem() {
    this.$axios
      .get(ServerApi.shop.shopList, {
        params: {
          crypto: this.$crypto.setCrypto(ItemModel.getInstance().pageConfig)
        },
      }).then(res => {
        switch (res.result) {
          case 1:
            ItemModel.getInstance().shopList = res.data.list
            break;
          default:
            break;
        }
      })
  }
}

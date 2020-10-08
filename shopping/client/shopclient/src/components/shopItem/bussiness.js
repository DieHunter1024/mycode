import Vue from 'vue';
import config from "../../config/config";
import ItemModel from "./model";
import Clone from "../../utils/clone";
const {
  DefaultPageConfig,
  ServerApi
} = config
export default class ItemBussiness extends Vue {
  constructor(_vueComponent) {
    super()
    ItemModel.getInstance().vueComponent = _vueComponent//Vue组件实例
    this.initPageConfig(_vueComponent.shopType)
    this.getShopItem()
  }
  initPageConfig(_shopType) {//获取默认分页配置
    ItemModel.getInstance().pageConfig = Clone.shallowClone(DefaultPageConfig)
    ItemModel.getInstance().pageConfig.shopType = _shopType
  }
  getShopItem() {//获取商品列表
    this.$axios
      .get(ServerApi.shop.shopList, {
        params: {
          crypto: this.$crypto.setCrypto(ItemModel.getInstance().pageConfig)
        },
      }).then(res => {
        switch (res.result) {
          case 1:
            ItemModel.getInstance().shopList = res.data.list//渲染页面
            break;
          default:
            break;
        }
      })
  }
}

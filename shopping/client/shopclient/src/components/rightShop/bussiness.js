import Vue from 'vue'
import config from "../../config/config"
import RightShopModel from "./model";
import Clone from "../../utils/clone"
const {
  DefaultPageConfig,
  ServerApi
} = config
export default class RightShopBussiness extends Vue {
  constructor(_vueComponent) {
    super()
    RightShopModel.getInstance().vueComponent = _vueComponent
    this._defaultPageConfig = Clone.shallowClone(DefaultPageConfig)
  }
  static getInstance() { //单例写法
    if (!RightShopBussiness._instance) {
      Object.defineProperty(RightShopBussiness, "_instance", {
        value: new RightShopBussiness(...arguments)
      })
    }
    return RightShopBussiness._instance;
  }
  getTheme(_shopType) {
    this._defaultPageConfig.picType = 2
    RightShopModel.getInstance().pageConfig = this._defaultPageConfig
  }
  getByshopType(_shopType) {
    this._defaultPageConfig.picType = 0
    RightShopModel.getInstance().pageConfig = this._defaultPageConfig
  }
  initPageConfig(_shopType) {
    this._defaultPageConfig.shopType = _shopType
    this.getTheme(_shopType)
    this.getByshopType(_shopType)
  }
  getRightShop() {
    let _type = RightShopModel.getInstance().pageConfig.picType;
    this.$axios
      .get(ServerApi.shop.shopList, {
        params: {
          crypto: this.$crypto.setCrypto(RightShopModel.getInstance().pageConfig)
        },
      }).then(res => {
        switch (res.result) {
          case 1:
            if (_type == 2) {
              RightShopModel.getInstance().themeList = res.data.list[0]
            } else if (_type == 0) {
              RightShopModel.getInstance().rightShopList = res.data.list
            }
            break;
          default:
            break;
        }
      })
  }
}

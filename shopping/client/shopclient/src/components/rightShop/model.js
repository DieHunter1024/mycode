import RightShopBussiness from "./bussiness"
export default class RightShopModel {
  constructor() {
    this._rightShopList = []
    this._pageConfig = {}
    this._themeList = {}
  }
  static getInstance() { //单例写法
    if (!RightShopModel._instance) {
      Object.defineProperty(RightShopModel, "_instance", {
        value: new RightShopModel()
      })
    }
    return RightShopModel._instance;
  }
  set vueComponent(val) {
    this._vueComponent = val;
  }
  get vueComponent() {
    return this._vueComponent;
  }
  set pageConfig(val) {
    this._pageConfig = val;
    RightShopBussiness.getInstance().getRightShop();
  }
  get pageConfig() {
    return this._pageConfig;
  }
  set rightShopList(val) {
    this._rightShopList = val
    this.vueComponent.list = this.rightShopList
  }
  get rightShopList() {
    return this._rightShopList
  }
  set themeList(val) {
    this._themeList = val
    this.vueComponent.themeList = this.themeList
  }
  get themeList() {
    return this._themeList
  }
}

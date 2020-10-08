export default class BannerModel {//banner数据存取
  constructor() {
    this._bannerList = []
    this._pageConfig = {}
  }
  static getInstance() { //单例写法
    if (!BannerModel._instance) {
      Object.defineProperty(BannerModel, "_instance", {
        value: new BannerModel()
      })
    }
    return BannerModel._instance;
  }
  set vueComponent(val) {
    this._vueComponent = val
  }
  get vueComponent() {
    return this._vueComponent
  }
  set pageConfig(val) {
    this._pageConfig = val
    this._pageConfig.picType = 1
  }
  get pageConfig() {
    return this._pageConfig
  }
  set bannerList(val) {
    this._bannerList = val
    this._vueComponent.list = this.bannerList
  }
  get bannerList() {
    return this._bannerList
  }
}

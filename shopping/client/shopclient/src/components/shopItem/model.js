export default class ItemModel {
  constructor() {
    this._shopList = []
    this._pageConfig = {}
  }
  static getInstance() { //单例写法
    if (!ItemModel._instance) {
      Object.defineProperty(ItemModel, "_instance", {
        value: new ItemModel()
      })
    }
    return ItemModel._instance;
  }
  set vueComponent(val) {
    this._vueComponent = val
  }
  get vueComponent() {
    return this._vueComponent
  }
  set pageConfig(val) {
    this._pageConfig = val
    this._pageConfig.picType = 0
  }
  get pageConfig() {
    return this._pageConfig
  }
  set shopList(val) {
    this._shopList = val
    this._vueComponent.list = this._shopList
  }
  get shopList() {
    return this._shopList
  }
}

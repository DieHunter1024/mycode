export default class ItemModel {//存放可读写商品列表，vue组件实例和默认分页配置
  constructor() {
    this._shopList = []//商品列表
    this._pageConfig = {}//默认分页配置
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
    this._pageConfig.picType = 0//默认商品类型：单个商品
  }
  get pageConfig() {
    return this._pageConfig
  }
  set shopList(val) {
    this._shopList = val
    this._vueComponent.list = this._shopList//获取到商品列表后重新渲染
  }
  get shopList() {
    return this._shopList
  }
}

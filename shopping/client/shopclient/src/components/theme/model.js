export default class ThemeModel {
  constructor() {
    this._themeList = []
    this._pageConfig = {}
  }
  static getInstance() { //单例写法
    if (!ThemeModel._instance) {
      Object.defineProperty(ThemeModel, "_instance", {
        value: new ThemeModel()
      })
    }
    return ThemeModel._instance;
  }
  set vueComponent(val) {
    this._vueComponent = val
  }
  get vueComponent() {
    return this._vueComponent
  }
  set pageConfig(val) {
    this._pageConfig = val
    this._pageConfig.picType = 3
  }
  get pageConfig() {
    return this._pageConfig
  }
  set themeList(val) {
    this._themeList = val
    this._vueComponent.list = this._themeList
  }
  get themeList() {
    return this._themeList
  }
}

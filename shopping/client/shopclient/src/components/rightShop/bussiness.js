import Vue from "vue";
import config from "../../config/config";
import Clone from "../../utils/clone";
const {
  DefaultPageConfig,
  ServerApi
} = config;
export default class RightShopBussiness extends Vue {
  constructor(_vueComponent) {
    super();
    this.vueComponent = _vueComponent;
    this._defaultPageConfig = Clone.shallowClone(DefaultPageConfig);
  }
  getTheme() {//获取分类标题主图片
    this._defaultPageConfig.picType = 2;
    this.getRightShop();
  }
  getByshopType() {//获取分类单个商品图片
    this._defaultPageConfig.picType = 0;
    this.getRightShop();
  }
  initPageConfig(_type) {
    this._defaultPageConfig.shopType = _type;//切换选中种类并重新渲染列表
    this.getTheme();
    this.getByshopType();
  }
  getRightShop() {
    let _type = this._defaultPageConfig.picType;
    let _t = this;
    this.$axios
      .get(ServerApi.shop.shopList, {
        params: {
          crypto: this.$crypto.setCrypto(this._defaultPageConfig)
        }
      })
      .then(res => {
        switch (res.result) {
          case 1:
            if (_type == 2) {//获取主题标题图片
              _t.vueComponent.themeList = res.data.list[0];
            } else if (_type == 0) {//获取单个分类图片
              _t.vueComponent.list = res.data.list;
              _t.vueComponent.transitionSwitch = true;
            }
            break;
          default:
            break;
        }
      });
  }
}

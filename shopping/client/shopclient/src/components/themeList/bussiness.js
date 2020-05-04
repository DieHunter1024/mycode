import Vue from "vue";
import config from "../../config/config";
import Clone from "../../utils/clone";
const {
  DefaultPageConfig,
  ServerApi
} = config;
export default class ThemeListBussiness extends Vue {
  constructor(_vueComponent) {
    super();
    this.vueComponent = _vueComponent;
    this._defaultPageConfig = Clone.shallowClone(DefaultPageConfig);
  }
  getTheme() {
    this._defaultPageConfig.picType = 4;
    this.getThemeList();
  }
  initPageConfig({
    _type
  }) {
    this._defaultPageConfig.shopType = _type;
    this.getTheme();
  }
  getThemeList() {
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
            _t.vueComponent.themeList = res.data.list[0];
            break;
          default:
            break;
        }
      });
  }
}

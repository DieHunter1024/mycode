import Vue from 'vue';
import config from "../../config/config";
import ThemeModel from "./model";
import Clone from "../../utils/clone"
const {
  DefaultPageConfig,
  ServerApi
} = config
export default class ThemeBussiness extends Vue {
  constructor(_vueComponent) {
    super()
    ThemeModel.getInstance().vueComponent = _vueComponent
    this.initPageConfig()
    this.getTheme()
  }
  initPageConfig() {
    ThemeModel.getInstance().pageConfig = Clone.shallowClone(DefaultPageConfig)
  }
  getTheme() {
    this.$axios
      .get(ServerApi.shop.shopList, {
        params: {
          crypto: this.$crypto.setCrypto(ThemeModel.getInstance().pageConfig)
        },
      }).then(res => {
        switch (res.result) {
          case 1:
            ThemeModel.getInstance().themeList = res.data.list
            break;
          default:
            break;
        }
      })
  }
}

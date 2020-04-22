import Vue from 'vue'
import config from "../../config/config"
import BannerModel from "./model";
import Clone from "../../utils/clone"
const {
  DefaultPageConfig,
  ServerApi
} = config
export default class BannerBussiness extends Vue {
  constructor(_vueComponent) {
    super()
    BannerModel.getInstance().vueComponent = _vueComponent
    this.initPageConfig()
    this.getBanner()
  }
  initPageConfig() {
    BannerModel.getInstance().pageConfig = Clone.shallowClone(DefaultPageConfig)
  }
  getBanner() {
    this.$axios
      .get(ServerApi.shop.shopList, {
        params: {
          crypto: this.$crypto.setCrypto(BannerModel.getInstance().pageConfig)
        },
      }).then(res => {
        switch (res.result) {
          case 1:
            BannerModel.getInstance().bannerList = res.data.list
            break;
          default:
            break;
        }
      })
  }
}

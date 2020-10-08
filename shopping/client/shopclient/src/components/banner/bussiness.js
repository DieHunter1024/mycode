import Vue from 'vue'
import config from "../../config/config"
import BannerModel from "./model";
import Clone from "../../utils/clone"
const {
  DefaultPageConfig,
  ServerApi
} = config
export default class BannerBussiness extends Vue {//业务处理
  constructor(_vueComponent) {
    super()
    BannerModel.getInstance().vueComponent = _vueComponent//取到显示层vue实例
    this.initPageConfig()
    this.getBanner()
  }
  initPageConfig() {//拷贝分页默认配置，并且不更改原常量
    BannerModel.getInstance().pageConfig = Clone.shallowClone(DefaultPageConfig)
  }
  getBanner() {//请求处理，this.$crypto.setCrypto加密
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

import Vue from "vue"
import Config from "../../config/config"
export default class State extends Vue {
  constructor() {
    super()
  }
  set shopCar(val) {
    this.$storage.saveStorage(Config.StorageName.ShopCar, val)
  }
  get shopCar() {
    return this.$storage.getStorage(Config.StorageName.ShopCar) || []
  }
}

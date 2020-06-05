import Vue from 'vue'
import config from "../../config/config"
const {
  ServerApi,
  StorageName,
  EventName
} = config
export default class UpdateBussiness extends Vue {
  constructor(_vueComponent) {
    super()
    this.vueComponent = _vueComponent
  }
  submitData() {
    console.log('aaa')
  }
}

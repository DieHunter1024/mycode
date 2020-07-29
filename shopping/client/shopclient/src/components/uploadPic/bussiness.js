import Vue from 'vue'
import config from "../../config/config"
import {
  Toast
} from "mint-ui";
const {
  UploadName,
  EventName,
  UploadKey
} = config
export default class UploadBussiness extends Vue {
  constructor(_vueComponent) {
    super()
    this.vueComponent = _vueComponent
  }
  uploadPic(data) {
    this.$axios
      .post(UploadName.headPic, data, {
        headers: {
          "Content-Type": "multipart/form-data;boundary=" + new Date().getTime()
        },
      }).then(res => {
        Toast(res.msg);
        switch (res.result) {
          case 1:
            let fileRead = new FileReader();
            fileRead.readAsDataURL(data.get(UploadKey.headKey));
            fileRead.onload = () => {
              this.vueComponent.picPath = fileRead.result
            }
            this.$events.emitEvent(EventName.UploadPic, res.headPath)
            break;
          default:
            break;
        }
      })
  }
}

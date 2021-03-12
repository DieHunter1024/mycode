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
          "Content-Type": "multipart/form-data;boundary=" + new Date().getTime()//axios上传post文件头文件需模拟 "multipart/form-data"请求，而这种请求格式与application/x-www-form-urlencoded有所不同，需要声明一个分隔符‘boundary’。
        },
      }).then(res => {
        Toast(res.msg);
        switch (res.result) {
          case 1://上传成功后显示图片
            let fileRead = new FileReader();//新建文件读取实例
            fileRead.readAsDataURL(data.get(UploadKey.headKey));//readAsDataURL读取本地图片信息
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

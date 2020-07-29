<template>
  <div class="uploadPic">
    <img :src="picPath" @click="clickHandler" alt />
    <input class="picFile" id="picFile" type="file" @change="uploadPic" accept="image/*" />
  </div>
</template>

<script>
import Config from "../../config/config";
import UploadBussiness from "./bussiness";
const { StorageName, RequestPath, UploadKey } = Config;
export default {
  name: "uploadPic",
  props: ["picFile"],
  data() {
    return {
      imgPath: RequestPath,
      picPath: ""
    };
  },
  created() {
    this.picPath = this.imgPath + this.picFile;
    this._uploadBussiness = new UploadBussiness(this);
  },
  methods: {
    clickHandler() {
      document.querySelector("#picFile").click();
    },
    uploadPic(e) {
      let _picFile = new FormData();
      _picFile.append("token", this.$storage.getStorage(StorageName.Token));
      _picFile.append(UploadKey.headKey, e.target.files[0]);
      this._uploadBussiness.uploadPic(_picFile);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/init.less";
.uploadPic {
  img {
    width: 100%;
    height: 100%;
  }
  .picFile {
    display: none;
  }
}
</style>
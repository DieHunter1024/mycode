

<template>
  <div class="main">
    <el-upload
      class="upload-demo"
      :auto-upload="false"
      accept=".xlsx"
      drag
      action="/"
      :on-change="handlerChange"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖拽至此上传<em>点击上传</em></div>
    </el-upload>
  </div>
</template>
<script lang="ts" setup>
import type { UploadFile } from "element-plus/es/components/upload/src/upload.type";
import { getGlobal } from "./utils/index";
const excel = getGlobal("excel");
const handlerChange = async (file: UploadFile) => {
  try {
    const _excel = await excel.importExcel(file, { type: "binary" });
    const _file = await excel.exportExcel(_excel, {
      bookType: "xlsx",
      type: "binary",
    });
    excel.downloadFile(_file, "file.xlsx");
  } catch (error) {
    console.log(error);
  }

  // console.log(file);
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
.main {
  width: 100%;
  display: flex;
  justify-content: center;
}
.upload-demo {
  margin-top: 100px;
}
</style>

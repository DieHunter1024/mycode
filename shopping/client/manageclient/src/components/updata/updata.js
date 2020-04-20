import React from "react";
import { Upload,  message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import config from "../../config/config";
let {
  UploadName,
  Agreement,
  BaseUrl,
  ServerPort,
  Path,
  UploadKey,
  StorageName,
} = config;
export default class UpdataPic extends React.Component {
  state = {
    fileList: [],
  };
  componentDidMount() {
    this.props.onUpdateRef(this);
  }
  updatePic(url) {
    if (url && url.length > 0) {
      this.setState({
        fileList: [
          {
            uid: "-1",
            name: url,
            status: "done",
            url,
          },
        ],
      });
    }
  }
  handleChange = ({ fileList, file }) => {
    this.setState({ fileList });
    if (file["response"] && file.status === "done") {
      let res = file["response"];
      this.props.picTarget(res);
      message.success(res.msg);
    }
    if (file["status"] === "removed") {
      if (this.props.picDelete) {
        this.props.picDelete();
      }
    }
  };
  render() {
    const { fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={Agreement + BaseUrl + ServerPort + Path + UploadName.headPic}
          name={UploadKey.headKey}
          listType="picture-card"
          fileList={fileList}
          onChange={this.handleChange}
          data={{ token: this.$utils.getStorage(StorageName.token) }}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </div>
    );
  }
}

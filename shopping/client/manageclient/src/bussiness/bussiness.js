import config from "../config/config";
import { message } from "antd";
const { StorageName } = config;
export default class Bussiness {
  static freezeInfo(url, record) {
    let data = {
      token: this.$utils.getStorage(StorageName.token),
      _id: record._id,
      isactive: !record.isactive,
    };
    this.$axios
      .get(url, {
        params: { crypto: this.$crypto.setCrypto(data) },
      })
      .then((res) => {
        message.success(res.msg);
        this.getList();
      });
  }
  static delInfo(url, record) {
    let data = {
      token: this.$utils.getStorage(StorageName.token),
      _id: record._id,
      headPic: record.headPic,
      shopPic: record.shopPic,
    };
    this.$axios
      .get(url, {
        params: { crypto: this.$crypto.setCrypto(data) },
      })
      .then((res) => {
        message.success(res.msg);
        this.getList();
      })
      .catch(() => {});
  }
  static getInfo(url) {
    let data = { ...this.state.pageConfig };
    this.$axios
      .get(url, {
        params: { crypto: this.$crypto.setCrypto(data) },
      })
      .then((res) => {
        let { list, totalPage, allNum } = res.data;
        let { pageConfig } = this.state;
        pageConfig.allNum = allNum;
        pageConfig.totalPage = totalPage;
        this.tableChild.setState({ pageConfig, list });
      })
      .catch(() => {});
  }
  static sendInfo(_url, data) {
    this.$axios
      .post(_url, { crypto: this.$crypto.setCrypto(data) })
      .then((res) => {
        switch (res.result) {
          case 1:
            message.success(res.msg);
            this.props.onClose();
            this.props.getList();
            break;
          case 0:
            message.warning(res.msg);
            break;
          default:
            // message.warning(res.msg);
            break;
        }
      })
      .catch(() => {
        message.error("操作失败");
      });
  }
  static orderState(_url, data) {
    this.$axios
      .post(_url, { crypto: this.$crypto.setCrypto(data) })
      .then((res) => {
        switch (res.result) {
          case 1:
            message.success(res.msg);
            this.getList();
            break;
          case 0:
            message.warning(res.msg);
            break;
          default:
            // message.warning(res.msg);
            break;
        }
      })
      .catch(() => {
        message.error("操作失败");
      });
  }
}

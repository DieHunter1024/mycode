import React from "react";
import ListTable from "../../../components/table/table";
import { message } from "antd";
import config from "../../../config/config";
const { ServerApi, StorageName } = config;
export default class shopList extends React.Component {
  state = {
    userType: "addshop",
    pageConfig: {
      token: this.$utils.getStorage(StorageName.token),
      keyWord: "",
      page: 1,
      pageSize: 5,
      totalPage: 1,
      sort: 1,
    },
  };
  componentDidMount() {
    // this.getShopList();
  }
  render() {
    return <div>FindShop</div>;
  }
}

import React from "react";
import ListTable from "../../../components/table/table";
import ListDrower from "../../../components/drawer/drawer";
import { message } from "antd";
import config from "../../../config/config";
import Events from "../../../event/busEvent";
const { ServerApi, StorageName, FormDefaultVal } = config;
export default class shopList extends React.Component {
  state = {
    pageConfig: {
      token: this.$utils.getStorage(StorageName.token),
      shopType: "",
      picType: "",
      keyWord: "",
      page: 1,
      pageSize: 3,
      totalPage: 1,
      sort: 1,
    },
  };
  componentDidMount() {
    this.getShopList();
    // this.drawerChild.showDrawer("addShop");
  }

  render() {
    return (
      <div>
        <ListTable
          tableType="shop"
          onTableRef={(child) => {
            this.tableChild = child;
          }}
          addInfo={this.addShop}
          deleteInfo={this.deleteShop}
          freezeInfo={this.freezeShop}
          changeInfo={this.changeShop}
          changePage={this.changePage}
        ></ListTable>
        <ListDrower
          formType="shop"
          getList={this.getShopList}
          onDrowerRef={(child) => {
            this.drawerChild = child;
          }}
        ></ListDrower>
      </div>
    );
  }
  addShop = () => {
    Events.emit("addShop", FormDefaultVal.shop);
    this.drawerChild.showDrawer("add");
  };
  changePage = (pageConfig) => {
    this.setState({ pageConfig });
    this.getShopList();
  };
  changeShop = (record) => {
    Events.emit("updataShop", record);
    this.drawerChild.showDrawer("updata");
  };
  getShopList = () => {
    let data = { ...this.state.pageConfig };
    this.$axios
      .get(ServerApi.shop.shopList, {
        params: { crypto: this.$crypto.setCrypto(data) },
      })
      .then((res) => {
        let { list, totalPage, allNum } = res.data;
        let { pageConfig } = this.state;
        pageConfig.allNum = allNum;
        pageConfig.totalPage = totalPage;
        this.tableChild.setState({ pageConfig, list });
      })
      .catch((err) => {});
  };
}

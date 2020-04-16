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
      pageSize: 5,
      totalPage: 1,
      sort: 1,
    },
  };
  componentDidMount() {
    // this.getShopList();
    // this.drawerChild.showDrawer("addShop");
  }
  addShop = () => {
    Events.emit("addShop", FormDefaultVal.shop);
    this.drawerChild.showDrawer("add");
  };
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
  getShopList = () => {
    let data = { ...this.state.pageConfig };
    this.$axios
      .get(ServerApi.user.userList, {
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

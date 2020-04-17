import React from "react";
import ListTable from "../../../components/table/table";
import ListDrower from "../../../components/drawer/drawer";
import { message } from "antd";
import config from "../../../config/config";
import Bussiness from "../../../bussiness/bussiness";
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
    this.getList();
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
          getList={this.getList}
          onDrowerRef={(child) => {
            this.drawerChild = child;
          }}
        ></ListDrower>
      </div>
    );
  }
  addShop = () => {
    Events.emit("addShop", FormDefaultVal.shop);
    this.drawerChild.showDrawer("addShop");
  };
  changePage = (pageConfig) => {
    this.setState({ pageConfig });
    this.getList();
  };
  changeShop = (record) => {
    Events.emit("updataShop", record);
    this.drawerChild.showDrawer("updataShop");
  };
  getList = () => {
    Bussiness.getInfo.bind(this, ServerApi.shop.shopList)();
  };
  deleteShop = (record) => {
    Bussiness.delInfo.bind(this, ServerApi.shop.delShop, record)();
  };
  freezeShop = (record) => {
    Bussiness.freezeInfo.bind(this, ServerApi.shop.freezeShop, record)();
  };
}

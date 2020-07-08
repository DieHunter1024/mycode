import React from "react";
import ListTable from "../../../components/table/table";
import ListDrower from "../../../components/drawer/drawer";
import config from "../../../config/config";
import Bussiness from "../../../bussiness/bussiness";
import Events from "../../../event/busEvent";
const { ServerApi, StorageName, FormDefaultVal, EventName } = config;
export default class orderList extends React.Component {
  state = {
    pageConfig: {
      token: this.$utils.getStorage(StorageName.token),
      orderId: "",
      keyWord: "",
      page: 1,
      pageSize: 5,
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
          tableType="order"
          onTableRef={(child) => {
            this.tableChild = child;
          }}
          addInfo={this.addOrder}
          deleteInfo={this.deleteOrder}
          changePage={this.changePage}
        ></ListTable>
        <ListDrower
          formType="order"
          getList={this.getList}
          onDrowerRef={(child) => {
            this.drawerChild = child;
          }}
        ></ListDrower>
      </div>
    );
  }
  addOrder = () => {
    Events.emit(EventName.ADD_ORDER, FormDefaultVal.shop);
    this.drawerChild.showDrawer("addOrder");
  };
  changePage = (pageConfig) => {
    this.setState({ pageConfig });
    this.getList();
  };
  getList = () => {
    Bussiness.getInfo.bind(this, ServerApi.order.orderList)();
  };
  deleteOrder = (record) => {
    Bussiness.delInfo.bind(this, ServerApi.order.delOrder, record)();
  };
}

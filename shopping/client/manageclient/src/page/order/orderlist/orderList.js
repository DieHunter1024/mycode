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
          orderState={this.orderState}
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
  addOrder = () => {//新增订单，触发bussiness中的新增接口
    Events.emit(EventName.ADD_ORDER, FormDefaultVal.shop);
    this.drawerChild.showDrawer("addOrder");
  };
  changePage = (pageConfig) => {//分页
    this.setState({ pageConfig });
    this.getList();
  };
  orderState = (data, type, state) => {//修改订单状态，触发bussiness中的修改接口
    data.token = this.$utils.getStorage(StorageName.token);
    data.orderState = state;
    Bussiness.orderState.bind(this, ServerApi.order.updateOrder, data)();
  };
  getList = () => {//获取订单列表，触发bussiness中的获取列表函数
    Bussiness.getInfo.bind(this, ServerApi.order.orderList)();
  };
  deleteOrder = (record) => {//删除订单，触发bussiness中的删除接口
    Bussiness.delInfo.bind(this, ServerApi.order.delOrder, record)();
  };
}

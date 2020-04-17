import React from "react";
import ListDrower from "../../../components/drawer/drawer";
import ListTable from "../../../components/table/table";
import Events from "../../../event/busEvent";
import { message } from "antd";
import config from "../../../config/config";
import Bussiness from "../../../bussiness/bussiness";
const { ServerApi, StorageName, FormDefaultVal } = config;
export default class UserList extends React.Component {
  state = {
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
    this.getList();
  }
  render() {
    return (
      <div>
        <ListTable
          tableType="user"
          onTableRef={(child) => {
            this.tableChild = child;
          }}
          addInfo={this.addUser}
          deleteInfo={this.deleteUser}
          freezeInfo={this.freezeUser}
          changeInfo={this.changeUser}
          changePage={this.changePage}
        ></ListTable>
        <ListDrower
          formType="user"
          getList={this.getList}
          onDrowerRef={(child) => {
            this.drawerChild = child;
          }}
        ></ListDrower>
      </div>
    );
  }
  addUser = () => {
    Events.emit("addUser", FormDefaultVal.user);
    this.drawerChild.showDrawer("add");
  };
  changePage = (pageConfig) => {
    this.setState({ pageConfig });
    this.getList();
  };
  changeUser = (record) => {
    Events.emit("updataUser", record);
    this.drawerChild.showDrawer("updata");
  };
  deleteUser = (record) => {
    Bussiness.delInfo.bind(this, ServerApi.user.delUser, record)();
  };
  freezeUser = (record) => {
    Bussiness.freezeInfo.bind(this, ServerApi.user.freezeUser, record)();
  };
  getList = () => {
    Bussiness.getInfo.bind(this, ServerApi.user.userList)();
  };
}

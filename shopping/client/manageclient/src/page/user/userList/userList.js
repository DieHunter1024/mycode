import React from "react";
import ListDrower from "../../../components/drawer/drawer";
import ListTable from "../../../components/table/table";
import Events from "../../../event/busEvent";
import { message } from "antd";
import config from "../../../config/config";
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
    this.getUserList();
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
          getList={this.getUserList}
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
    this.getUserList();
  };
  changeUser = (record) => {
    Events.emit("updataUser", record);
    this.drawerChild.showDrawer("updata");
  };
  deleteUser = (record) => {
    let data = {
      token: this.$utils.getStorage(StorageName.token),
      _id: record._id,
      headPic: record.headPic,
    };
    this.$axios
      .get(ServerApi.user.delUser, {
        params: { crypto: this.$crypto.setCrypto(data) },
      })
      .then((res) => {
        message.success(res.msg);
        this.getUserList();
      })
      .catch((err) => {});
  };
  freezeUser = (record) => {
    let data = {
      token: this.$utils.getStorage(StorageName.token),
      _id: record._id,
      isactive: !record.isactive,
    };
    this.$axios
      .get(ServerApi.user.freezeUser, {
        params: { crypto: this.$crypto.setCrypto(data) },
      })
      .then((res) => {
        message.success(res.msg);
        this.getUserList();
      });
  };
  getUserList = () => {
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

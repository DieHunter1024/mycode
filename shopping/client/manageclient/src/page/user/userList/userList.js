import React from "react";
import ListDrower from "../../../components/drawer/drawer";
import ListTable from "../../../components/table/table";
import {
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  message,
} from "antd";
import config from "../../../config/config";
const { ServerApi, StorageName } = config;
export default class UserList extends React.Component {
  state = {
    userType: "adduser",
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
          showDrawer={this.showDrawer}
          deleteUser={this.deleteUser}
          freezeUser={this.freezeUser}
          changeInfo={this.changeInfo}
          changePage={this.changePage}
        ></ListTable>
        <ListDrower
          getUserList={this.getUserList}
          userType={this.state.userType}
          onDrowerRef={(child) => {
            this.drawerChild = child;
          }}
        ></ListDrower>
      </div>
    );
  }
  showDrawer = () => {
    this.drawerChild.showDrawer();
  };
  changePage = (pageConfig) => {
    this.setState({ pageConfig });
    this.getUserList();
  };
  changeInfo = (record) => {
    this.drawerChild.showDrawer(record);
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

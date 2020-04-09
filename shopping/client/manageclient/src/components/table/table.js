import React from "react";
import {
  Table,
  Button,
  Card,
  Pagination,
  Popconfirm,
  Input,
  Col,
  Row,
} from "antd";
import config from "../../config/config";
import { PlusOutlined } from "@ant-design/icons";
const { Search } = Input;
const { ServerApi, StorageName, FilePath } = config;
export default class ListDrower extends React.Component {
  userColumns = [
    { align: "center", title: "用户名", dataIndex: "username", width: 200 },
    {
      align: "center",
      title: "邮箱",
      dataIndex: "mailaddress",
      width: 200,
      render: (text, data) => {
        return <div>{text + data.mailurl}</div>;
      },
    },
    {
      align: "center",
      title: "密码",
      dataIndex: "password",
      width: 300,
    },
    {
      align: "center",
      title: "头像",
      dataIndex: "headPic",
      width: 150,
      render: (imgPath) => {
        return (
          <img
            src={FilePath + imgPath}
            alt=""
            style={{ width: 60, margin: "0 auto" }}
          />
        );
      },
    },
    {
      align: "center",
      title: "性别",
      dataIndex: "sex",
      width: 200,
      render: (sex) => {
        return <div>{sex == "man" ? "男" : "女"}</div>;
      },
    },
    {
      align: "center",
      title: "收货地址",
      dataIndex: "alladdress",
      width: 200,
      render: (text, data, index) => {
        return <div>{text.join("-") + data.address}</div>;
      },
    },
    {
      align: "center",
      title: "个性签名",
      dataIndex: "descript",
      width: 200,
    },
    {
      align: "center",
      title: "用户类型",
      dataIndex: "userType",
      width: 200,
      render: (type) => {
        return <div>{type == "admin" ? "管理员" : "用户"}</div>;
      },
    },
    {
      align: "center",
      title: "注册时间",
      dataIndex: "time",
      width: 200,
    },
    {
      align: "center",
      title: "操作",
      width: 230,
      fixed: "right",
      render: (record) => {
        return (
          <div>
            <Button
              type="primary"
              onClick={this.clickHandler.bind(this, record, "change")}
            >
              修改
            </Button>
            <Popconfirm
              title="是否删除？"
              onConfirm={this.clickHandler.bind(this, record, "delete")}
              okText="是"
              cancelText="否"
              disabled={record.userType == "admin" ? true : false}
            >
              <Button
                type="danger"
                disabled={record.userType == "admin" ? true : false}
              >
                删除
              </Button>
            </Popconfirm>
            <Button
              disabled={record.userType == "admin" ? true : false}
              type={record.isactive ? "danger" : "primary"}
              onClick={this.clickHandler.bind(this, record, "allow")}
            >
              {record.isactive ? "禁止" : "允许"}
            </Button>
          </div>
        );
      },
    },
  ];

  state = {
    tableType: this.props.tableType,
    pageConfig: {
      totalPage: 0,
      page: 0,
      pageSize: 0,
      allNum: 0,
    },
    columns: [],
    list: [],
  };
  componentDidMount() {
    if (this.state.tableType == "user") {
      this.setState({
        columns: this.userColumns,
      });
    } else {
    }
    this.props.onTableRef(this);
  }
  clickHandler(record, type) {
    switch (type) {
      case "change": //修改
        this.props.changeInfo(record);
        break;
      case "delete": //删除
        this.props.deleteUser(record);
        break;
      case "allow": //冻结
        this.props.freezeUser(record);
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <Card title="用户列表">
        <Row gutter={16}>
          <Col span={12}>
            <Button onClick={this.props.showDrawer} type="primary">
              <PlusOutlined />
              新增用户
            </Button>
          </Col>
          <Col span={12}>
            <Search
              style={{ float: "right" }}
              placeholder="输入用户名/邮箱"
              enterButton="查找"
              size="large"
              allowClear
              onSearch={(val) => {
                let { pageConfig } = this.state;
                pageConfig.keyWord = val;
                this.setState({
                  pageConfig,
                });
                this.props.changePage(pageConfig);
              }}
            />
          </Col>
        </Row>
        <Table
          scroll={{ x: 2000 }}
          rowKey={(record) => record._id}
          columns={this.state.columns}
          dataSource={this.state.list}
          pagination={false}
        ></Table>
        <Pagination
          style={{ marginTop: 50 }}
          hideOnSinglePage
          total={this.state.pageConfig.allNum}
          current={this.state.pageConfig.page}
          pageSize={this.state.pageConfig.pageSize}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `共 ${total} 条`}
          onChange={this.changePage}
          onShowSizeChange={this.changePage}
        />
      </Card>
    );
  }
  changePage = (page, pageSize) => {
    let pageConfig = this.state.pageConfig;
    pageConfig.page = page;
    pageConfig.pageSize = pageSize;
    this.setState({
      pageConfig,
    });
    this.props.changePage(pageConfig);
  };
}

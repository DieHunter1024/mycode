import React from "react";
import {
  Table,
  Button,
  Card,
  Pagination,
  Input,
  Col,
  Row,
} from "antd";
import userTab from "./userTab";
import { PlusOutlined } from "@ant-design/icons";
const { Search } = Input;
export default class ListTable extends React.Component {
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
        columns: new userTab(this)
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

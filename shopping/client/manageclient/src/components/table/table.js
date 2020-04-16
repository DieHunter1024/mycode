import React from "react";
import { Table, Button, Card, Pagination, Input, Select, Col, Row } from "antd";
import userTab from "./userTab";
import shopTab from "./shopTab";
import { PlusOutlined } from "@ant-design/icons";
import ShopType from "../../config/shopType";

const { shopType, picType } = ShopType;
const { Option } = Select;
const { Search } = Input;
export default class ListTable extends React.Component {
  state = {
    tableType: this.props.tableType,
    pageConfig: {
      totalPage: 0,
      page: 0,
      pageSize: 0,
      allNum: 0,
      shopType: "",
      picType: "",
      keyWord: "",
    },
    columns: [],
    list: [],
  };
  createSel(data, type) {
    return (
      <Select
        placeholder={type == "shopType" ? "选择商品类型" : "选择商品图片"}
        allowClear
        onChange={this.selectSearch.bind(this, type)}
        style={{ width: 150 }}
      >
        {data.map((item) => {
          return (
            <Option key={item.name} value={item.val}>
              {item.name}
            </Option>
          );
        })}
      </Select>
    );
  }
  componentDidMount() {
    if (this.state.tableType == "user") {
      this.setState({
        columns: new userTab(this),
      });
    } else {
      this.setState({
        columns: new shopTab(this),
      });
    }
    this.props.onTableRef(this);
  }
  selectSearch(type, value) {
    let { pageConfig } = this.state;
    pageConfig[type] = value;
    this.setState({
      pageConfig,
    });
  }
  clickHandler(record, type) {
    switch (type) {
      case "add": //添加
        this.props.addInfo();
        break;
      case "change": //修改
        this.props.changeInfo(record);
        break;
      case "delete": //删除
        this.props.deleteInfo(record);
        break;
      case "allow": //冻结
        this.props.freezeInfo(record);
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <Card title={this.state.tableType == "user" ? "用户列表" : "商品列表"}>
        <Row gutter={16}>
          <Col span={6}>
            <Button
              onClick={this.clickHandler.bind(this, null, "add")}
              type="primary"
            >
              <PlusOutlined />
              {this.state.tableType == "user" ? "新增用户" : "新增商品"}
            </Button>
          </Col>
          <Col span={5}>
            {this.state.tableType == "user"
              ? null
              : this.createSel(shopType, "shopType")}
          </Col>
          <Col span={5}>
            {this.state.tableType == "user"
              ? null
              : this.createSel(picType, "picType")}
          </Col>
          <Col span={8}>
            <Search
              style={{ float: "right" }}
              placeholder={
                this.state.tableType == "user"
                  ? "输入用户名/邮箱"
                  : "输入商品名称"
              }
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

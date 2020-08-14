import React from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  InputNumber,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import ShopType from "../../config/shopType";
import Events from "../../event/busEvent";
import config from "../../config/config";
import Bussiness from "../../bussiness/bussiness";
const { orderState } = ShopType;
const { ServerApi, StorageName, EventName } = config;
const { Option } = Select;
export default class userForm extends React.Component {
  formRef = React.createRef();
  state = {};
  componentDidMount() {
    this.props.onFormRef(this);
    Events.on(EventName.ADD_ORDER, this.addOrder);
  }
  addOrder = (e) => {
    this.setState({
      formType: "add",
      record: e,
    });
  };
  createSel(data) {
    return (
      <Select style={{ width: 150 }}>
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
  sendData(val) {
    if (!val.shopList || !val.shopList.length) {
      message.warning("请选择至少一件商品");
      return;
    }
    val.token = this.$utils.getStorage(StorageName.token);
    console.log(val)
    Bussiness.sendInfo.bind(this, ServerApi.order.addOrder, val)();
  }
  render() {
    return (
      <Form
        layout="vertical"
        hideRequiredMark
        ref={this.formRef}
        onFinish={this.sendData.bind(this)}
      >
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入用户名/邮箱/手机号" }]}
            >
              <Input placeholder="请输入用户名/邮箱/手机号" allowClear />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="orderState"
              rules={[{ required: true, message: "请选择订单状态" }]}
            >
              {this.createSel(orderState)}
            </Form.Item>
          </Col>
        </Row>
        <Form.List name="shopList">
          {(shopList, { add, remove }) => (
            <div>
              {shopList.map((field) => (
                <Row gutter={20} key={field.key}>
                  <Col span={10}>
                    <Form.Item
                      {...field}
                      name={[field.name, "shopName"]}
                      fieldKey={[field.fieldKey, "shopName"]}
                      rules={[{ required: true, message: "请输入商品名称" }]}
                    >
                      <Input placeholder="请输入商品名称" allowClear />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...field}
                      name={[field.name, "shopCount"]}
                      fieldKey={[field.fieldKey, "shopCount"]}
                      rules={[{ required: true, message: "请输入购买数量" }]}
                    >
                      <InputNumber
                        style={{ width: "100%" }}
                        min={1}
                        max={99}
                        placeholder="数量"
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <MinusCircleOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </Col>
                </Row>
              ))}
              <Row gutter={20}>
                <Col span={20}>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    style={{ width: "100%" }}
                  >
                    <PlusOutlined /> 添加商品
                  </Button>
                </Col>
              </Row>
            </div>
          )}
        </Form.List>
        <Row gutter={20}>
          <Col span={20}>
            <Form.Item>
              <Button
                style={{ width: "100%", marginTop: "20px" }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                提交
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

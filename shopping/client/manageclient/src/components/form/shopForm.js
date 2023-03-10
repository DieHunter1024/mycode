import React from "react";
import { Form, Button, Col, Row, Input, Select, InputNumber } from "antd";
import ShopType from "../../config/shopType";
import Events from "../../event/busEvent";
import UpdataPic from "../updata/updata";
import config from "../../config/config";
import Bussiness from "../../bussiness/bussiness";
const { shopType, picType } = ShopType;
const { ServerApi, StorageName, FilePath, EventName } = config;
const { Option } = Select;
export default class userForm extends React.Component {
  formRef = React.createRef();
  state = {};
  componentDidMount() {
    this.props.onFormRef(this);
    Events.on(EventName.ADD_SHOP, this.addShop);
    Events.on(EventName.UPDATE_SHOP, this.updateShop);
  }
  componentDidUpdate() {
    this.formRef.current.setFieldsValue(this.state.record);
  }
  updateShop = (e) => {
    this.setState(
      {
        formType: "updata",
        record: e,
      },
      () => {
        this.updateChild.updatePic(FilePath + this.state.record.shopPic);
      }
    );
  };
  addShop = (e) => {
    this.setState({
      formType: "add",
      record: e,
    });
  };
  getPic = (data) => {
    this.formRef.current.setFieldsValue({
      shopPic: data.headPath,
    });
  };
  delPic = () => {
    this.formRef.current.setFieldsValue({
      shopPic: null,
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
    if (this.state.record._id) {
      val._id = this.state.record._id;
    }
    val.token = this.$utils.getStorage(StorageName.token);
    let _url =
      this.state.formType === "add"
        ? ServerApi.shop.addShop
        : ServerApi.shop.updateShop;
    Bussiness.sendInfo.bind(this, _url, val)();
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
              name="shopPic"
              rules={[{ required: true, message: "?????????????????????" }]}
              label="????????????"
            >
              <UpdataPic
                onUpdateRef={(child) => {
                  this.updateChild = child;
                }}
                picTarget={this.getPic}
                picDelete={this.delPic}
              ></UpdataPic>
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="shopType"
              label="????????????"
              rules={[{ required: true, message: "?????????????????????" }]}
            >
              {this.createSel(shopType)}
            </Form.Item>
            <Form.Item
              name="picType"
              label="????????????"
              rules={[{ required: true, message: "?????????????????????" }]}
            >
              {this.createSel(picType)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={10}>
            <Form.Item
              name="shopName"
              label="????????????"
              rules={[{ required: true, message: "?????????????????????" }]}
            >
              <Input placeholder="?????????????????????" allowClear />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name="shopNum"
              label="??????"
              rules={[{ required: true, message: "???????????????" }]}
            >
              <InputNumber min={1} max={999} allowClear />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name="shopPrice"
              label="??????"
              rules={[{ required: true, message: "???????????????" }]}
            >
              <InputNumber min={0.1} max={100} step={0.1} allowClear />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name="shopScale"
              label="?????????/???(g)"
              rules={[{ required: true, message: "??????????????????/???(g)" }]}
            >
              <InputNumber min={1} max={500} allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Input.Group compact>
            <Form.Item name="taste" label="??????">
              <Input placeholder="???????????????" allowClear />
            </Form.Item>
            <Form.Item name="address" label="??????">
              <Input placeholder="???????????????" allowClear />
            </Form.Item>
            <Form.Item name="expiryDate" label="?????????">
              <Input placeholder="??????????????????" allowClear />
            </Form.Item>
          </Input.Group>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            ??????
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

import React from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  Radio,
  Cascader,
  message,
} from "antd";
import Events from "../../event/busEvent";
import Mail from "../../config/mail";
import City from "../../config/city";
import UpdataPic from "../updata/updata";
import config from "../../config/config";
const { ServerApi, StorageName, FilePath } = config;
const { Option } = Select;
export default class userForm extends React.Component {
  formRef = React.createRef();
  state = {};
  componentDidMount() {
    this.props.onFormRef(this);
    Events.on("addUser", this.addUser);
    Events.on("updataUser", this.updataUser);
  }
  componentDidUpdate() {
    this.formRef.current.setFieldsValue(this.state.record);
  }
  updataUser = (e) => {
    this.setState(
      {
        formType: "updata",
        record: e,
      },
      () => {
        this.updateChild.updatePic(FilePath + this.state.record.headPic);
      }
    );
  };
  addUser = (e) => {
    this.setState({
      formType: "add",
      record: e,
    });
  };
  getPic = (data) => {
    this.formRef.current.setFieldsValue({
      headPic: data.headPath,
    });
  };
  delPic = () => {
    this.formRef.current.setFieldsValue({
      headPic: null,
    });
  };
  sendData(val) {
    if (this.state.record._id) {
      val._id = this.state.record._id;
    }
    val.token = this.$utils.getStorage(StorageName.token);
    let data = this.$crypto.setCrypto(val);
    let _url =
      this.state.formType == "add"
        ? ServerApi.user.addUser
        : ServerApi.user.updateUser;
    this.$axios
      .post(_url, { crypto: data })
      .then((res) => {
        switch (res.result) {
          case 1:
            message.success(res.msg);
            this.props.onClose();
            this.props.getList();
            break;
          case 0:
            message.warning(res.msg);
            break;
          default:
            // message.warning(res.msg);
            break;
        }
      })
      .catch((err) => {
        message.error("操作失败");
      });
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
            <Form.Item name="headPic" label="头像">
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
              name="userType"
              label="用户类型"
              rules={[{ required: true, message: "请选择用户类型" }]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="admin">管理员</Radio.Button>
                <Radio.Button value="user">用户</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <Input placeholder="请输入用户名" allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password
                type="password"
                placeholder="请输入密码"
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={5}>
            <Form.Item
              name="sex"
              label="性别"
              rules={[{ required: true, message: "请选择性别" }]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="man">男</Radio.Button>
                <Radio.Button value="woman">女</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={16}>
            <Input.Group compact>
              <Form.Item
                name="mailaddress"
                label="邮箱"
                rules={[{ required: true, message: "请输入正确邮箱" }]}
              >
                <Input defaultValue="" allowClear />
              </Form.Item>
              <Form.Item
                label="邮箱类型"
                name="mailurl"
                rules={[{ required: true, message: "请选择邮箱类型" }]}
              >
                <Select style={{ width: 150 }}>
                  {(() => {
                    return Mail.address.map((item) => {
                      return (
                        <Option key={item.mail} value={item.mail}>
                          {item.mail}
                        </Option>
                      );
                    });
                  })()}
                </Select>
              </Form.Item>
            </Input.Group>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={16}>
            <Input.Group compact>
              <Form.Item name="alladdress" label="收货地址">
                <Cascader options={City} placeholder="请选择收货地址" />
              </Form.Item>
              <Form.Item name="address" label="详细地址">
                <Input placeholder="请输入详细地址" allowClear />
              </Form.Item>
            </Input.Group>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="descript" label="个性签名">
              <Input.TextArea rows={4} placeholder="个性签名" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

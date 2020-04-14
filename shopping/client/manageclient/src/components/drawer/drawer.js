import React from "react";
import Mail from "../../config/mail";
import {
  Drawer,
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
import config from "../../config/config";
import City from "../../config/city";
import UpdataPic from "../updata/updata";
const { ServerApi, StorageName, FilePath } = config;
const { Option } = Select;

export default class ListDrower extends React.Component {
  formRef = React.createRef();
  state = {
    visible: false,
    record: {},
  };
  componentDidMount() {
    this.props.onDrowerRef(this);
  }
  componentDidUpdate() {
    this.formRef.current.setFieldsValue(this.state.record);
  }

  showDrawer = (record) => {
    if (record) {
      this.setState({
        formType: "updata",
        visible: true,
        record,
      });
      this.updateChild.updatePic(FilePath + record.headPic);
    } else {
      this.setState({
        formType: "add",
        visible: true,
        record: {
          sex: "man",
          userType: "user",
          mailurl: "@qq.com",
        },
      });
    }
  };
  onClose = () => {
    this.formRef.current.resetFields();
    this.setState({
      visible: false,
      record: null,
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
    let _t = this;
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
            _t.onClose();
            _t.props.getUserList();
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
      <Drawer
        title={this.state.formType == "add" ? "新增用户" : "修改信息"}
        width={720}
        onClose={this.onClose}
        visible={this.state.visible}
        forceRender //加上预加载，防止表单异步生成，导致this.formRef.current为空
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={this.onClose} style={{ marginRight: 20 }}>
              取消
            </Button>
          </div>
        }
      >
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
              <Form.Item label="邮箱">
                <Input.Group compact>
                  <Form.Item
                    name="mailaddress"
                    rules={[{ required: true, message: "请输入正确邮箱" }]}
                  >
                    <Input defaultValue="" allowClear />
                  </Form.Item>
                  <Form.Item
                    name="mailurl"
                    rules={[{ required: true, message: "请选择邮箱类型" }]}
                  >
                    <Select onChange={this.changeMail} style={{ width: 150 }}>
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
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={16}>
              <Form.Item label="收货地址" required={false}>
                <Input.Group compact>
                  <Form.Item
                    name="alladdress"
                    // rules={[{ required: true, message: "请选择收货地址" }]}
                  >
                    <Cascader options={City} placeholder="请选择收货地址" />
                  </Form.Item>
                  <Form.Item
                    name="address"
                    // rules={[{ required: true, message: "请填写收货地址" }]}
                  >
                    <Input placeholder="请输入详细地址" allowClear />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
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
      </Drawer>
    );
  }
}

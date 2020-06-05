import React from "react";
import "./login.less";
import { Card, Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import config from "../../config/config";
const { ServerApi, StorageName } = config;
export default class Login extends React.Component {
  componentDidMount() {
    this.checkToken();
  }
  render() {
    return (
      <div className="cardBox">
        <Card title="登录">
          <Form
            name="normal_login"
            className="login-form"
            onFinish={this.sendData}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入用户名/邮箱/手机号",
                },
              ]}
            >
              <Input
                className="infoInput"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名/邮箱/手机号"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码",
                },
              ]}
            >
              <Input
                className="infoInput"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>10天内免密</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="#aaa">
              忘记密码
            </a>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
              或者<a href="#aaa">注册</a>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
  checkToken() {
    let token = this.$utils.getStorage(StorageName.token);
    if (!token) return;
    this.$axios
      .get(ServerApi.token, {
        params: { token },
      })
      .then((res) => {
        switch (res.result) {
          case 1:
            message.success(res.msg).then(() => {
              this.props.history.push({
                pathname: "/admin/shopList",
                query: res,
              });
            });
            break;
          default:
            // message.warning(res.msg);
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  sendData = (data) => {
    this.$axios
      .post(ServerApi.user.userLogin, {
        crypto: this.$crypto.setCrypto(data),
      })
      .then((res) => {
        switch (res.result) {
          case 1:
            this.$utils.saveStorage(StorageName.token, res.token);
            message.success(res.msg);
            this.props.history.push({
              pathname: "/admin/shopList",
              query: res,
            });
            break;
          default:
            message.warning(res.msg);
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentWillUnmount() {}
}

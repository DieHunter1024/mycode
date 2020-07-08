import React from "react";
import UserForm from "../form/userForm";
import ShopForm from "../form/shopForm";
import OrderForm from "../form/orderForm";
import { Drawer, Button } from "antd";

export default class ListDrower extends React.Component {
  state = {
    visible: false,
    record: {},
    formEle: this.props.formType,
  };
  componentDidMount() {
    this.props.onDrowerRef(this);
  }
  showDrawer = (formType) => {
    this.setState({
      formType,
      visible: true,
    });
  };
  onClose = () => {
    this.formChild.formRef.current.resetFields();
    this.formChild.setState({
      record: null,
    });
    this.setState({
      visible: false,
    });
  };
  checkFormType() {
    switch (this.state.formType) {
      case "add":
        return "新增用户";
      case "updata":
        return "修改信息";
      case "addShop":
        return "新增商品";
      case "updataShop":
        return "修改商品";
      case "addOrder":
        return "新增订单";
      default:
        break;
    }
  }
  render() {
    return (
      <Drawer
        title={this.checkFormType()}
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
        {this.state.formEle === "user" ? (
          <UserForm
            getList={this.props.getList}
            onClose={this.onClose}
            onFormRef={(child) => {
              this.formChild = child;
            }}
          ></UserForm>
        ) : this.state.formEle === "shop" ? (
          <ShopForm
            getList={this.props.getList}
            onClose={this.onClose}
            onFormRef={(child) => {
              this.formChild = child;
            }}
          ></ShopForm>
        ) : (
          <OrderForm
            getList={this.props.getList}
            onClose={this.onClose}
            onFormRef={(child) => {
              this.formChild = child;
            }}
          ></OrderForm>
        )}
      </Drawer>
    );
  }
}

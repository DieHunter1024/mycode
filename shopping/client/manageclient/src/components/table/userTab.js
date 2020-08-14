import React from "react";
import { Button, Popconfirm } from "antd";
import config from "../../config/config";

const { FilePath } = config;
export default class UserTable {
  constructor(_this) {
    return [
      { align: "center", title: "用户名", dataIndex: "username", width: 200 },
      {
        align: "center",
        title: "邮箱",
        dataIndex: "mailaddress",
        width: 100,
        render: (text, data) => {
          return <div>{text + data.mailurl}</div>;
        },
      },
      {
        align: "center",
        title: "手机号",
        dataIndex: "phoneNum",
        width: 100,
      },
      {
        align: "center",
        title: "密码",
        dataIndex: "password",
        width: 250,
      },
      {
        align: "center",
        title: "头像",
        dataIndex: "headPic",
        width: 100,
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
        width: 60,
        render: (sex) => {
          return <div>{sex === "man" ? "男" : "女"}</div>;
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
        width: 100,
        render: (type) => {
          return <div>{type === "admin" ? "管理员" : "用户"}</div>;
        },
      },
      {
        align: "center",
        title: "注册时间",
        dataIndex: "time",
        width: 200,
        render: (time) => {
          return new Date(time).toLocaleString();
        },
      },
      {
        align: "center",
        title: "操作",
        width: 200,
        fixed: "right",
        render: (record) => {
          return (
            <div>
              <Button
                type="primary"
                onClick={_this.clickHandler.bind(_this, record, "change")}
              >
                修改
              </Button>
              <Popconfirm
                title="是否删除？"
                onConfirm={_this.clickHandler.bind(_this, record, "delete")}
                okText="是"
                cancelText="否"
                disabled={record.userType === "admin" ? true : false}
              >
                <Button
                  type="danger"
                  disabled={record.userType === "admin" ? true : false}
                >
                  删除
                </Button>
              </Popconfirm>
              <Button
                disabled={record.userType === "admin" ? true : false}
                type={record.isactive ? "danger" : "primary"}
                onClick={_this.clickHandler.bind(_this, record, "allow")}
              >
                {record.isactive ? "禁止" : "允许"}
              </Button>
            </div>
          );
        },
      },
    ];
  }
}

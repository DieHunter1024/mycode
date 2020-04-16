import React from "react";
import { Button, Popconfirm } from "antd";
import config from "../../config/config";
import ShopType from "../../config/shopType";
const { shopType, picType } = ShopType;
const { FilePath } = config;
export default class ShopTable {
  constructor(_this) {
    return [
      { align: "center", title: "商品名", dataIndex: "shopName", width: 200 },
      {
        align: "center",
        title: "商品类型",
        dataIndex: "shopType",
        width: 100,
        render: (text, data) => {
          return <div>{shopType[data.shopType]}</div>;
        },
      },
      {
        align: "center",
        title: "图片类型",
        dataIndex: "picType",
        width: 100,
        render: (text, data) => {
          return <div>{picType[data.picType]}</div>;
        },
      },
      {
        align: "center",
        title: "商品图片",
        dataIndex: "shopPic",
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
        title: "库存",
        dataIndex: "shopNum",
        width: 100,
        render: (num) => {
          return <div>{num + "个"}</div>;
        },
      },
      {
        align: "center",
        title: "单价",
        dataIndex: "shopPrice",
        width: 100,
        render: (price) => {
          return <div>{price + "元"}</div>;
        },
      },
      {
        align: "center",
        title: "口味",
        dataIndex: "taste",
        width: 50,
      },
      {
        align: "center",
        title: "产地",
        dataIndex: "address",
        width: 100,
      },
      {
        align: "center",
        title: "保质期",
        dataIndex: "expiryDate",
        width: 100,
      },
      {
        align: "center",
        title: "注册时间",
        dataIndex: "time",
        width: 100,
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
                onClick={_this.clickHandler.bind(_this, record, "allow")}
              >
                {record.isactive ? "冻结" : "激活"}
              </Button>
            </div>
          );
        },
      },
    ];
  }
}

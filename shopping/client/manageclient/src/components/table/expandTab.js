import React from "react";
import config from "../../config/config";
import ShopType from "../../config/shopType";
const { shopType } = ShopType;
const { FilePath } = config;
export default class expandTab {
  constructor(_this) {
    return [
      {
        align: "center",
        title: "商品名",
        key: "shopName",
        dataIndex: "shopName",
        width: 50,
      },
      {
        align: "center",
        title: "商品类型",
        key: "shopType",
        dataIndex: "shopType",
        width: 50,
        render: (text) => {
          return <div>{shopType[text].name}</div>;
        },
      },
      {
        align: "center",
        title: "商品图片",
        key: "shopPic",
        dataIndex: "shopPic",
        width: 60,
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
        title: "单价",
        key: "shopPrice",
        dataIndex: "shopPrice",
        width: 30,
        render: (price) => {
          return <div>{price + "元"}</div>;
        },
      },{
        align: "center",
        title: "购买数量",
        key: "shopCount",
        dataIndex: "shopCount",
        width: 30,
      },
    ];
  }
}

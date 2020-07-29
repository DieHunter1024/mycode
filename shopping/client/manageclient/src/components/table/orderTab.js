import React from "react";
import { Button, Popconfirm, Select } from "antd";
import ShopType from "../../config/shopType";
const { orderState } = ShopType;
const { Option } = Select;
export default class OrderTable {
  static createSel(text, data) {
    return (
      <Select
        defaultValue={text}
        onChange={this.clickHandler.bind(this, data, "state")}
        style={{ width: 100 }}
      >
        {orderState.map((item) => {
          return (
            <Option key={item.name} value={item.val}>
              {item.name}
            </Option>
          );
        })}
      </Select>
    );
  }
  constructor(_this) {
    return [
      { align: "center", title: "订单号", dataIndex: "orderId", width: 50 },
      {
        align: "center",
        title: "订单状态",
        dataIndex: "orderState",
        width: 50,
        render(text, data) {
          return <div>{OrderTable.createSel.call(_this, text, data)}</div>;
        },
      },
      { align: "center", title: "用户", dataIndex: "username", width: 50 },
      {
        align: "center",
        title: "创建时间",
        dataIndex: "orderTime",
        width: 100,
      },
      {
        align: "center",
        title: "操作",
        width: 30,
        fixed: "right",
        render: (record) => {
          return (
            <div>
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
            </div>
          );
        },
      },
    ];
  }
}

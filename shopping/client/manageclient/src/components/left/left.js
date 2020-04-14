import React from "react";
import "./left.less";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import MenuData from "../../config/menuList";

const { SubMenu } = Menu;
export default class Left extends React.Component {
  createMenu(data) {
    return data.map((item) => {
      if (item.list) {
        //递归生成子项
        return (
          <SubMenu key={item.name} title={item.name}>
            {this.createMenu(item.list)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.name} title={item.name}>
            <Link to={item.route}>{item.name}</Link>
          </Menu.Item>
        );
      }
    });
  }
  render() {
    return (
      <div className="leftBox">
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
        >
          {this.createMenu(MenuData.leftMenu)}
        </Menu>
      </div>
    );
  }
}

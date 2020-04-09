import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./util/axios";
import "./util/utils";
import "./util/cryptoTool";
import "antd/dist/antd.css";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from 'antd';
// import 'antd/dist/antd.dark.css';
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();

import Config from "../config/config";
import Axios from "axios";
import { Component } from "react";
import { message } from "antd";
Axios.defaults.baseURL =
  Config.Agreement + Config.BaseUrl + Config.ServerPort + Config.Path;
// 添加请求拦截器
Axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器
Axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    if (response.data.result === -999) {
      //token验证失败
      return message.error(response.data.msg).then((res) => {
        if (window.location.href.indexOf("login") === -1) {
          localStorage.removeItem(Config.StorageName.token);
          window.location.href = "/";
        }
      });
    }
    return response.data;
  },
  function (error) {
    console.log(error);
    // 对响应错误做点什么
    message.error("操作失败");
    return Promise.reject(error);
  }
);

Component.prototype.$axios = Axios;

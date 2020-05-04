import Vue from "vue";
import Axios from "axios";
import Config from "../config/config";
import { Toast, Indicator } from "mint-ui";
Axios.defaults.baseURL = Config.RequestPath; //默认请求地址
Axios.defaults.timeout = Config.RequestTimeOut; //请求超时
// 添加请求拦截器
Axios.interceptors.request.use(
  function(config) {
    Indicator.open("加载中...");
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    Indicator.close();
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器
Axios.interceptors.response.use(
  function(response) {
    Indicator.close();
    // 对响应数据做点什么
    if (response.data.result != 1) {
      Toast(response.data.msg);
    }
    if (response.data.result === -999) {
      //token验证失败
    }
    return response.data;
  },
  function(error) {
    Indicator.close();
    Toast("加载失败");
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

Vue.prototype.$axios = Axios;

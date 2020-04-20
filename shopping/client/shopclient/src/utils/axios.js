import Vue from 'vue';
import Axios from 'axios';
import Config from '../config/config'
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

    }
    return response.data;
  },
  function (error) {
    console.log(error);
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);


Vue.prototype.$axios = Axios;

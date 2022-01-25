/*
 * @Author: Hunter
 * @Date: 2022-01-25 12:58:19
 * @LastEditTime: 2022-01-25 13:10:38
 * @LastEditors: Hunter
 * @Description:
 * @FilePath: \EmailServer\utils\axios.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
const Axios = require("axios");
const { config } = require("../config/config");
Axios.defaults.baseURL = config.RequestPath; //默认请求地址
Axios.defaults.timeout = config.RequestTimeOut; //请求超时
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
    if (response.data.result != 1) {
    }
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
exports.axios = Axios;

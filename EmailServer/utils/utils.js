/*
 * @Author: Hunter
 * @Date: 2022-01-25 12:30:13
 * @LastEditTime: 2022-01-25 21:34:01
 * @LastEditors: Hunter
 * @Description:
 * @FilePath: \EmailServer\utils\utils.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
const { axios } = require("./axios");
const { SendMail } = require("./mails");
exports.Utils = class {
  constructor() {
    this.axios = axios;
    this.sendMail = new SendMail().sendEmail;
    // console.log(this.axios,this.sendMail)
  }
};

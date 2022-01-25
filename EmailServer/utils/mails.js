/*
 * @Author: Hunter
 * @Date: 2022-01-25 12:35:02
 * @LastEditTime: 2022-01-25 13:27:18
 * @LastEditors: Hunter
 * @Description:
 * @FilePath: \EmailServer\utils\mails.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
const nodemailer = require("nodemailer");
const { config } = require("../config/config");
exports.SendMail = class {
  constructor() {
    this.transporter = nodemailer.createTransport(config.EmailTransporter); //邮箱配置项
    return this;
  }
  /* 发送邮件模块
   * @method    sendEmail
   * @for       SendMail
   * @param   {String} mail  用户邮箱号
   * @param   {String} title  邮件标题
   * @param   {String} content  邮件内容
   * @return {Promise<res>}   是否发送成功
   */
  sendEmail = async (mail, title, content) => {
    this.mailOptions = {
      from: "消息：；来自 <" + config.EmailTransporter.auth.user + ">",
      to: mail,
      subject: title,
      text: content,
    };
    return this.transporter.sendMail(this.mailOptions);
  };
};

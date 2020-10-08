const nodemailer = require("nodemailer");
const Config = require("../config/config");
module.exports = class SendMail {
  static transporter = nodemailer.createTransport(Config.EmailTransporter); //邮箱配置项
  static mailOptions = null; //邮箱配置
  /* 发送邮件模块
   * @method    sendEmail
   * @for       SendMail
   * @param   {String} mail  用户邮箱号
   * @param   {String} title  邮件标题
   * @param   {String} content  邮件内容
   * @return {Boolean}   是否发送成功
   */
  static async sendEmail(mail, title, content) {
    this.mailOptions = {
      from: '"邮箱验证" <' + Config.EmailTransporter.auth.user + ">",
      to: mail,
      subject: title,
      text: content,
    };
    try {
      let result = await this.transporter.sendMail(this.mailOptions);
      console.log("发送成功");
      return true;
    } catch (error) {
      console.log(error);
      console.log("发送失败");
      return false;
    }
  }
};

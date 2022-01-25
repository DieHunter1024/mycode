/*
 * @Author: Hunter
 * @Date: 2022-01-25 12:35:23
 * @LastEditTime: 2022-01-25 22:47:58
 * @LastEditors: Hunter
 * @Description:
 * @FilePath: \EmailServer\config\config.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
exports.config = {
  RequestPath: "",
  RequestTimeOut: 60*1000,
  EmailTransporter: {
    // service: "qq", // 运营商  qq邮箱 网易  若使用QQ邮箱，则只需配置service：qq
    host: "smtp.163.com", // 若使用网易邮箱，则只需配置host：smtp.163.com
    port: 465, //端口
    // secure: false,
    auth: {
      user: "132xxxxx16@163.com", //发送方的邮箱
      pass: "BNPxxxxxxxxxxZ", // pop3 授权码
    },
  },
  EmailConfig: {
    time: 5, //验证码有效期，单位分钟
    codeLength: 4, //验证码长度
    sendTime: 1 * 60 * 1000, //后端验证码允许再次发送时间间隔，单位毫秒
    targetTime: 5 * 60 * 1000, //验证码有效期，单位毫秒
    title: "title", //验证码标题
  },
};

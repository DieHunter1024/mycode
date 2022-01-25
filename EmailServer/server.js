/*
 * @Author: Hunter
 * @Date: 2022-01-25 12:29:20
 * @LastEditTime: 2022-01-25 13:30:33
 * @LastEditors: Hunter
 * @Description:
 * @FilePath: \EmailServer\server.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
const { Utils } = require("./utils/utils");
const utils = new Utils();
// utils.sendMail("xxxxxx@qq.com", "title", "测试");
Promise.all([
  utils.sendMail("xxxxxxxxx@qq.com", "title", "测试邮件 by hunter"),
  utils.sendMail("xxxxxxxxx@qq.com", "title", "测试邮件 by hunter"),
  utils.sendMail("xxxxxxxxx@qq.com", "title", "测试邮件 by hunter"),
]).then(res=>{
    console.log(res)
})

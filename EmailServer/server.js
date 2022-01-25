/*
 * @Author: Hunter
 * @Date: 2022-01-25 12:29:20
 * @LastEditTime: 2022-01-25 22:48:23
 * @LastEditors: Hunter
 * @Description:
 * @FilePath: \EmailServer\server.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
const { Utils } = require("./utils/utils");
const utils = new Utils();
const { axios, sendMail } = utils;
let userList = []
// let name = `亲爱的{用户名}：
// 本网站（星空内网穿透）旧域名starryah.com已不再使用，请移步至新域名frp.starryah.com，记得收藏哦~
// 感谢您的支持与理解，提前祝您春节快乐！`;
init();
function init() {
  getPerson();
}
async function getPerson() {
  try {
    const res = await axios.get("api/v1/Gxxxxxxil/", {
      params: { UserToken: "5xxxxxxxdf3" },
    });
    console.log(res);
    filterList(objToArr(res))
  } catch (error) {
    throw new Error(error);
  }
}
function objToArr(obj) {
  return Object.keys(obj).map((name) => {
    if (typeof obj[name] === "object") {
      return obj[name];
    }
  });
}
function filterList(arr) {
  return arr.map((i) => {
    if (typeof i === "object") {
      const content = `亲爱的${i.name}：
本网站（星空内网穿透）旧域名starryah.com已不再使用，请移步至新域名https://frp.starryah.com，记得收藏哦~
感谢您的支持与理解，提前祝您春节快乐！`;
      return sendMail(i.email, "星空雨服务平台", content);
    }
  });
}

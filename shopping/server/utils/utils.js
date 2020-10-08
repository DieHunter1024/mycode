const fs = require("fs");
const jwt = require("jsonwebtoken");
const cryptoJS = require("crypto-js");
const config = require("../config/config");
const SendMail = require("./sendmail");
let { UserKey, AdminKey, CryptoKey, EmailConfig } = config;
const bcrypt = require("bcryptjs");
const { json } = require("express");
let key = cryptoJS.enc.Utf8.parse(CryptoKey);
module.exports = class Utils {
  constructor() {}
  static parseUrl(req) {
    //获取前端传递的参数
    return req.method == "POST" ? req.body : this.urlSplit(req.url);
  }
  static urlSplit(url) {
    //get获取的参数解析
    let list = url.split("?")[1].split("&");
    let leng = list.length;
    let obj = {};
    for (let i = 0; i < leng; i++) {
      let key = list[i].split("=")[0];
      let val = list[i].split("=")[1];
      obj[key] = val;
    }
    return obj;
  }
  /*
   * @param {string} type 'user'||'admin'      用户类型
   * @param {string} user                      用户名
   * @param {bool} rempsd                      是否记住密码
   */
  static createToken = (type, user, rempsd) => {
    let payload = {
      user: user,
    };
    return jwt.sign(payload, type == "admin" ? AdminKey : UserKey, {
      expiresIn: rempsd ? "10d" : "6h",
    });
  };
  /*
   * @param {object} req       前端请求对象
   * @param {object} res       服务端接收对象
   * @param {fn} next          中间件响应方法
   */
  static checkToken = (req, res, next) => {
    let _data = this.parseUrl(req); //解析前端参数
    if (_data.crypto) {
      _data = this.getCrypto(_data.crypto); //对前端参数解密
    }
    let isUser = true; //用户
    let isAdmin = true; //管理员
    let _decoded = ""; //加密的用户名
    jwt.verify(_data.token, UserKey, function (err, decoded) {
      if (err) {
        isUser = false;
      } else {
        _decoded = decoded;
      }
    });
    jwt.verify(_data.token, AdminKey, function (err, decoded) {
      if (err) {
        isAdmin = false;
      } else {
        _decoded = decoded;
      }
    });
    if (isUser || isAdmin) {
      _data.id = _decoded;
      _data.userTokenType = isAdmin ? "admin" : "user";
      res._data = _data;
      next(); //中间件响应
    } else {
      res.send({
        result: -999,
        msg: "登录超时,请重新登录",
      });
    }
  };
  /* Crypto加密方法
   * @param {object} _data       对用户请求后端的参数进行加密
   */
  static setCrypto(_data) {
    let encrypted = cryptoJS.AES.encrypt(JSON.stringify(_data), key, {
      mode: cryptoJS.mode.ECB,
      padding: cryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }
  /* Crypto解密方法
   * @param {string} _token       将秘文解密成对象形式
   */
  static getCrypto(_token) {
    _token = decodeURIComponent(_token); //前端传参有特殊字符（中文）时转义（替换百分号）
    let decrypt = cryptoJS.AES.decrypt(_token, key, {
      mode: cryptoJS.mode.ECB,
      padding: cryptoJS.pad.Pkcs7,
    });
    return JSON.parse(cryptoJS.enc.Utf8.stringify(decrypt).toString());
  }
  /* 获取缓存图片
   * @param {object} _file       文件所有信息
   */
  static readPicFile(_file) {
    let { path, mimetype } = _file;
    let file = fs.readFileSync(path);
    let fileName =
      new Date().getTime() +
      parseInt(Math.random() * Math.random() * 1000000) +
      "." +
      mimetype.split("/")[1];
    this.delPicFile(path);
    return this.writePicFile(file, fileName);
  }
  /* 通过缓存生成图片
   * @param {object} _file       文件所有信息
   * @param {string} _fileName   生成随机文件名
   */
  static writePicFile(_file, _fileName) {
    let fileName = "./public/assets/img/" + _fileName;
    fs.writeFileSync(fileName, _file);
    return fileName.split("./")[1];
  }
  static delPicFile(_path) {
    fs.unlink(_path, (err) => {
      if (err) {
        console.log("删除失败");
      }
    });
  }
  static createBcrypt(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }
  static checkBcrypt(_password, _hash) {
    return bcrypt.compareSync(_password, _hash);
  }
  static joinDate() {
    return new Date();
  }

  /* 生成随机
   * @method    codeLength
   * @for    Utils
   * @param {number/string} len  随机数长度
   * @return {string}  _count   生成len个随机数
   */
  static codeLength(len) {
    let _count = "";
    for (let i = 0; i < len; i++) {
      _count += Math.floor(Math.random() * 10); //生成len个随机数
    }
    return _count;
  }
  /* 生成时间戳
   * @method    randomCode
   * @for    Utils
   * @param
   * @return {object}  _count   生成len个随机数
   */
  static randomCode() {
    return {
      code: this.codeLength(EmailConfig.codeLength), //生成的随机数
      sendTime: new Date().getTime() + EmailConfig.sendTime, //发送时间
      targetTime: new Date().getTime() + EmailConfig.targetTime, //截止时间
    };
  }
  /* 异步发送邮箱验证
   * @method    createEmailCode
   * @for    Utils
   * @param   {Object} codeList  邮箱验证码列表
   * @param   {String} email   用户邮箱
   * @param   {Object} findRes  数据库搜寻到的用户信息
   * @return {Boolean}  isSuccess   是否发送成功
   */
  static async createEmailCode(codeList, email, findRes) {
    if (!codeList[email] || new Date().getTime() > codeList[email].sendTime) {
      //已过1分钟,防止多次请求邮箱
      codeList[email] = this.randomCode();
      codeList[email].info = findRes;
      return await this.sendEmailCode(codeList[email].code, email);
    } else {
      //未过1分钟
      return false;
    }
  }
  /* 生成邮件内容
   * @method    sendEmailCode
   * @for    Utils
   * @param   {String} code  验证码内容
   * @param   {String} email   用户邮箱
   */
  static async sendEmailCode(code, email) {
    return await SendMail.sendEmail(
      email,
      EmailConfig.title,
      `您的验证码为:${code},${EmailConfig.time}分钟内有效`
    );
  }
  /* 核对验证码
   * @method    checkEmailCode
   * @for    Utils
   * @param   {Object} codeList  用户验证码列表
   * @param   {String} key   用户邮箱
   * @param   {Object} _data   用户提交的表单信息
   * @return   {Object} res   请求响应返回值
   */
  static checkEmailCode(codeList, key, _data) {
    if (!codeList[key]) {
      //未发送验证码
      return {
        result: 0,
        msg: "验证码错误",
      };
    } else if (
      new Date().getTime() < codeList[key].targetTime &&
      _data.mailcode == codeList[key].code
    ) {
      //验证码校对成功
      let _obj = {
        result: 1,
        token: Utils.createToken(
          codeList[key].info.userType || "",
          codeList[key].info.username || "",
          _data.remember || ""
        ),
        msg: "操作成功",
      };
      codeList[key] = null;
      return _obj;
    } else if (new Date().getTime() > codeList[key].targetTime) {
      //验证码超时
      return {
        result: 0,
        msg: "验证码超时",
      };
    } else {
      return {
        result: 0,
        msg: "验证失败",
      };
    }
  }
  static createOrderNo() {
    let _date = new Date();
    return (
      "D" +
      _date.getFullYear() +
      (_date.getMonth() + 1) +
      _date.getDate() +
      _date.getHours() +
      _date.getMinutes() +
      _date.getSeconds() +
      parseInt(Math.random() * 10000)
    );
  }
  static deepCopy(org) {
    //简单的对象复制
    return JSON.parse(JSON.stringify(org));
  }
};

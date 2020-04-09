const url = require("url");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const cryptoJS = require("crypto-js");
const config = require("../config/config");
let { UserKey, AdminKey, CryptoKey } = config;
const bcrypt = require("bcryptjs");
let key = cryptoJS.enc.Utf8.parse(CryptoKey);
module.exports = class Utils {
  constructor() {}
  static parseUrl(req, res) {
    return req.method == "POST" ? req.body : this.urlSplit(req.url);
  }
  static urlSplit(url) {
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
  static createToken = (type, user, rempsd) => {
    let payload = {
      user: user,
    };
    return jwt.sign(payload, type == "admin" ? AdminKey : UserKey, {
      expiresIn: rempsd ? "3d" : "6h",
    });
  };
  static checkToken = (req, res, next) => {
    let _data = this.parseUrl(req, res);
    if (_data.crypto) {
      _data = this.getCrypto(_data.crypto);
    }
    let isUser = true;
    let isAdmin = true;
    let _decoded = "";
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
      next();
    } else {
      res.send({
        result: -999,
        msg: "登录超时,请重新登录",
      });
    }
  };
  static setCrypto(_data) {
    let encrypted = cryptoJS.AES.encrypt(JSON.stringify(_data), key, {
      mode: cryptoJS.mode.ECB,
      padding: cryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }
  static getCrypto(_token) {
    _token = decodeURIComponent(_token); //前端传参有特殊字符时转义（替换百分号）
    let decrypt = cryptoJS.AES.decrypt(_token, key, {
      mode: cryptoJS.mode.ECB,
      padding: cryptoJS.pad.Pkcs7,
    });
    return JSON.parse(cryptoJS.enc.Utf8.stringify(decrypt).toString());
  }

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
};

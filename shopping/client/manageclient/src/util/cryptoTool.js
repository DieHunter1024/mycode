import * as CryptoJS from "crypto-js";
import { Component } from "react";
import config from "../config/config";
const { CryptoKey } = config;
class CryptoTool {
  /* Crypto加密方法
   * @param {object} _data       对用户请求后端的参数进行加密
   */
  static setCrypto(_data) {
    let key = CryptoJS.enc.Utf8.parse(CryptoKey);
    let encrypted = CryptoJS.AES.encrypt(JSON.stringify(_data), key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }
   /* Crypto解密方法
   * @param {string} _token       将秘文解密成对象形式
   */
  static getCrypto(_token) {
    let key = CryptoJS.enc.Utf8.parse(CryptoKey);
    let decrypt = CryptoJS.AES.decrypt(_token, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return JSON.parse(CryptoJS.enc.Utf8.stringify(decrypt).toString());
  }
}
Component.prototype.$crypto = CryptoTool;

import * as CryptoJS from "crypto-js";
import { Component } from "react";
import config from "../config/config";
const { CryptoKey } = config;
class CryptoTool {
  static setCrypto(_data) {
    let key = CryptoJS.enc.Utf8.parse(CryptoKey);
    let encrypted = CryptoJS.AES.encrypt(JSON.stringify(_data), key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }
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

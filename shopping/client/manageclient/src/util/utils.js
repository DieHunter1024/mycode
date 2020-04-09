import { Component } from "react";
class Utils {
  static saveStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }
  static getStorage(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {}
  }
  static clearStorage(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {}
  }
}
Component.prototype.$utils = Utils;

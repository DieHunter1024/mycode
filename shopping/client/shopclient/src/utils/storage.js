import Vue from "vue";
class Storage {
  static saveStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }
  static getStorage(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch (error) {}
  }
  static clearStorage(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {}
  }
}
Vue.prototype.$storage = Storage;

export default class Clone {
  static shallowClone(org) {
    return JSON.parse(JSON.stringify(org));
  }
  static deepClone(org, tag) {
    var tag = tag || {};
    var name = Object.getOwnPropertyNames(org);
    for (var i = 0; i < name.length; i++) {
      var desc = Object.getOwnPropertyDescriptor(org, name[i]);
      if (typeof desc.value === "object" && desc.value !== null) {
        var obj = desc.value.toString() === "[object Object]" ? {} : [];
        Object.defineProperty(tag, name[i], {
          configurable: desc.configurable,
          enumerable: desc.enumerable,
          writable: desc.writable,
          value: obj
        });
        Clone.deepClone(desc.value, obj);
      } else {
        Object.defineProperty(tag, name[i], desc);
      }
    }
    return tag;
  }
}

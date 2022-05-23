// 发布模式
class Observer {
  constructor(data) {
    return this.initObserver({ data })?.data;
  }
  // 劫持所有数据
  initObserver(data) {
    let _data = {};
    if (this.checkObject(data)) {
      for (const key in data) {
        _data[key] = this.defineReactive(data[key]);
      }
    }
    return _data;
  }
  checkObject(val) {
    return val && typeof val === "object";
  }
  // 响应拦截器，递归监听所有层级
  defineReactive(val) {
    if (!this.checkObject(val)) return val;
    val = this.initObserver(val); //劫持子项
    const dep = new Dep(); //将observer与watcher连接，当watcher触发数据变化后，将watcher中的回调函数注册到dep中
    return new Proxy(val, {
      set(target, key, newVal) {
        newVal !== target[key] && ((target[key] = newVal), dep.fireEvent()); //设置属性时，对比新值和旧值有无差别，若修改的值是引用型时，将属性重新注册到dep中,并更新视图
        return Reflect.set(...arguments);
      },
      get() {
        Dep.target && dep.subscribe(Dep.target); //获取属性值时,将watcher中的回调函数注册到dep中（在页面初始化时调用）
        return Reflect.get(...arguments);
      },
    });
  }
}

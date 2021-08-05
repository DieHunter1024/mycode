// 调度中心（观察者模式）
class Dep {
    constructor() {
        this.observerList = [] //调度中心,存放与属性绑定的事件
        this.target = null
    }
    get instance() { //返回当前类的实例的单例
        !Dep._instance && Object.defineProperty(Dep, "_instance", {
            value: new Dep()
        });
        return Dep._instance;
    }
    //触发所有与该属性绑定的事件
    fireEvent() {
        this.observerList.forEach(item => {
            item.compareVal()
        })
    }
    //注册事件
    subscribe(fn) {
        fn.compareVal && this.observerList.push(fn)
    }
    clearObserver() {
        this.observerList = []
    }
}
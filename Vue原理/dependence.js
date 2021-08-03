// 调度中心（观察者模式）
class Dep {
    constructor() {
        this.observerList = []
        this.target = null
    }
    get instance() { //返回当前类的实例的单例
        !Dep._instance && Object.defineProperty(Dep, "_instance", {
            value: new Dep()
        });
        return Dep._instance;
    }
    fireEvent() {
        this.observerList.forEach(item => {
            item.compareVal()
        })
    }
    subscribe(fn) {
        fn.compareVal && this.observerList.push(fn)
    }
    clearObserver() {
        this.observerList = []
    }
}
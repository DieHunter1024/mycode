// 调度中心（观察者模式）
export default class Dep {
    constructor() {
        this.observerList = []
        this.target = null
    }
    get Instance() {
        //返回当前类的实例的单例
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
        this.observerList.push(fn)
    }
    clear() {
        this.observerList = []
    }
}

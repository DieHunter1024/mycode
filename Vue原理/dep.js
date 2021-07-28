// 调度中心（观察者模式）
class Dep {
    constructor() {
        this.observerList = []
        this.target = null
    }
    get Instance() {
        //返回当前类的实例的单例
        !Dep._instance && Object.defineProperty(Dep, "_instance", {
            value: new Dep()
        });
        debugger
        console.log(Dep._instance)
        return Dep._instance;
    }
    fireEvent() {
        console.log(this.observerList)
        this.observerList.forEach(item => {
            console.log(item)
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
export default new Dep().Instance
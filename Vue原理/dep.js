// 调度中心（观察者模式）
class Dep {
    constructor() {
        this.observerList = []
    }
    get Instance() {
        //返回当前类的实例的单例
        !Dep._instance && Object.defineProperty(Dep, "_instance", {
            value: new Dep()
        });
        return Dep._instance;
    }
    fireEvent() {
        console.log('fire')
        this.observerList.forEach(item => {
            item.update()
        })
    }
    subscribe(fn) {
        console.log('subscribe')
        this.observerList.push(fn)
    }
    clear() {
        this.observerList = []
    }
}
export default new Dep().Instance
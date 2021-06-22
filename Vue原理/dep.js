// 调度中心（观察者模式）
class Dep {
    constructor() {
        this.observerList = []
    }
    fireEvent(e) {
        this.observerList.forEach(item => {
            item.update(e)
        })
    }
    subscribe(fn) {
        this.observerList.push(fn)
    }
}
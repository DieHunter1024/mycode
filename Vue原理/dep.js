// 调度中心（观察者模式）
export default class Dep {
    constructor() {
        this.observerList = []
        this.target = null
    }
    fireEvent() {
        this.observerList.forEach(item => {
            item.compareVal()
        })
    }
    subscribe(fn) {
        this.observerList.push(fn)
    }
}
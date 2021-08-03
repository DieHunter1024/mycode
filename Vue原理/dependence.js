// 调度中心（观察者模式）
class Dep {
    constructor() {
        this.observerList = []
        this.target = null
    }
    fireEvent() {
        // console.log(this.observerList)
        this.observerList.forEach(item => {
            // console.log(item)
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
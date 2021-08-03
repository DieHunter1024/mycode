// 订阅模式(比较绑定值的变化)
class Watcher {
    constructor(compile, vm, val, update) {
        this.vm = vm
        this.val = val;
        this.update = update
        this.compile = compile
        this.oldVal = this.getOldVal()
        this.update() //首次渲染初始化
    }
    getOldVal() {
        Dep.target = this
        const oldVal = this.compile.getDeepData(this.vm, this.val) //触发Observer中的getter，将watcher注册到dep中
        Dep.target = null
        return oldVal
    }
    compareVal() {
        const newVal = this.compile.getDeepData(this.vm, this.val)
        if (newVal !== this.oldVal) {
            this.update(), this.oldVal = newVal
        }
    }

}
// 订阅模式(比较绑定值的变化)
import Dep from './dep.js'
export default class Watcher {
    constructor(compile, vm, val, update) {
        this.vm = vm
        this.val = val;
        this.update = update
        this.compile = compile
        this.oldVal = this.getOldValue()
        this.update() //首次渲染初始化
    }
    getOldValue() {
        Dep.target = this
        const oldVal = this.compile.getDeepData(this.vm, this.val)
        Dep.target = null
        return oldVal;
    }

    compareVal() {
        const newVal = this.compile.getDeepData(this.vm, this.val)
        console.log(this.val)
        console.log(this.oldVal, newVal)
        if (newVal !== this.oldVal) {
            Dep.clear(), this.update(), Dep.subscribe(this), this.oldVal = newVal
        }
    }

}
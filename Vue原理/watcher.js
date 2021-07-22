// 订阅模式(比较绑定值的变化)
import Dep from './dep.js'
export default class Watcher {
    constructor(compile, vm, val, update) {
        this.vm = vm
        this.val = val;
        this.update = update
        this.oldVal = this.getOldValue(compile)
        console.log(val)
        this.compareVal()
    }
    getOldValue(compile) {
        Dep.target = this
        const oldVal = compile.getDeepData(this.vm, this.val)
        Dep.target = null
        return oldVal;
    }
    compareVal() {
        this.val !== this.oldVal && Dep.clear(), this.update(), Dep.subscribe(this)
    }

}
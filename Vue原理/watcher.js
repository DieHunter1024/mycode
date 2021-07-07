// 订阅模式(比较绑定值的变化)
import Dep from './dep.js'
export default class Watcher {
    constructor(compile, vm, val, update) {
        this.vm = vm
        this.val = val;
        this.update = update
        this.oldVal = compile.getDeepData(vm, val)

        this.compareVal('', this.oldVal)
    }
    compareVal(newVal, oldVal) {
        newVal !== oldVal && Dep.clear(),this.update(),Dep.subscribe(this)

    }

}
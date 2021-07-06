// 订阅模式(比较绑定值的变化)
import dep from './dep.js'
export default class Watcher {
    constructor(vm, val, update) {
        this.vm = vm
        this.val = val;
        this.update = update
        update()
        console.log(...arguments)
        this.compareVal()
    }
    compareVal(){}
}
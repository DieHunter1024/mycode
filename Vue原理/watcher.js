// 订阅模式(比较绑定值的变化)
import Dep from './dep.js'
const dep = new Dep()
export default class Watcher {
    constructor(compile, vm, val, update) {
        this.vm = vm
        this.val = val;
        this.update = update
        this.compile = compile
        this.oldVal = this.getOldValue()
        console.log(dep)
        this.update() //首次渲染初始化
        dep.subscribe(this)
        // console.log(this.oldVal)
    }
    getOldValue() {
        dep.target = this
        const oldVal = this.compile.getDeepData(this.vm, this.val)
        dep.target = null
        return oldVal;
    }

    compareVal() {
        const newVal = this.compile.getDeepData(this.vm, this.val)
        // console.log(dep.target)
        // console.log(this.oldVal,newVal)
        if (newVal !== this.oldVal) {
            console.log(newVal)
            this.update(), this.oldVal = newVal
        }
    }

}
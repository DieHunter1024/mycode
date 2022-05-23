// 订阅模式(比较绑定值的变化)
class Watcher {
    constructor(vm, val, update) {
        this.vm = vm
        this.val = val;
        this.update = update
        this.oldVal = this.getOldVal() //获取初始值，触发observer中属性的get
        update() //首次渲染初始化
    }
    getOldVal() {
        Dep.target = this //将watcher暂存到Dep上，在Observer中通过dep.subscribe将watcher传到dep的observerList（调度中心）中，后续当值发送修改时通过fireEvent触发watcher.compareVal来更新视图
        const oldVal = getDeepData(this.vm, this.val) //触发Observer中的getter，将watcher注册到dep中
        //watcher注册到dep中后,不允许注册其他的属性（这里有个注意点，当使用Observer中的defineReactive时，导致许多未使用的属性也会注册dep。比如：取属性时使用{{info.name}}时，data.info和data.info.name都会被劫持，而我们只需要info.name，所以在设置完Dep.target后要置空，使observer中的dep.subscribe不执行）
        Dep.target = null
        return oldVal
    }
    // 对比数据，更新视图
    compareVal() {
        const newVal = getDeepData(this.vm, this.val);
        newVal !== this.oldVal && (this.update(), this.oldVal = newVal) //更新视图后将新值赋到oldVal上
    }

}
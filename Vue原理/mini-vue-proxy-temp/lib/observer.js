// 发布模式
class Observer {
    constructor(data) {
        this.initObserver(data)
    }
    // 劫持所有数据
    initObserver(data) {
        if (data && typeof data === 'object') {
            for (const key in data) {
                this.defineReactive(data, key, data[key])
            }
        }
    }
    // 响应拦截器，递归监听所有层级
    defineReactive(data, key, val) {
        this.initObserver(val) //劫持子项
        const dep = new Dep() //将observer与watcher连接，当watcher触发数据变化后，将watcher中的回调函数注册到dep中
        Object.defineProperty(data, key, {
            enumerable: true, // 允许枚举
            configurable: false, // 不能被定义
            get: _ => {
                Dep.target && dep.subscribe(Dep.target); //获取属性值时,将watcher中的回调函数注册到dep中（在页面初始化时调用）
                return val
            },
            set: newVal => newVal !== val && (val = newVal, this.initObserver(newVal), dep.fireEvent()) //设置属性时，对比新值和旧值有无差别，若修改的值是引用型时，将属性重新注册到dep中,并更新视图
        })
    }
}
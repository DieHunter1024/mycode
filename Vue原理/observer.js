// 发布模式
class Observer {
    constructor(data) {
        this.initObserver(data)
    }
    initObserver(data) {
        if (data && typeof data === 'object') {
            for (const key in data) {
                this.newReactive(data, key, data[key])
            }
        }
    }
    // 响应拦截器，递归监听所有层级
    newReactive(data, key, val) {
        this.initObserver(val)
        const dep = new Dep()
        Object.defineProperty(data, key, {
            enumerable: true, // 允许枚举
            configurable: false, // 不能被定义
            get: _ => {
                Dep.target && dep.subscribe(Dep.target);
                // Dep.target && console.log(dep)
                return val
            },
            set: newVal => newVal !== val && (val = newVal, this.initObserver(newVal), dep.fireEvent())
        })
    }
}
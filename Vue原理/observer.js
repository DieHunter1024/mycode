// 发布模式
import Dep from './dep.js'
const dep = new Dep()
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
        // const _dep = new Dep()
        Object.defineProperty(data, key, {
            get: _ => {
                dep.target && dep.subscribe(dep.target);
                return val
            },
            set: newVal => newVal !== val && (val = newVal, this.initObserver(newVal), dep.fireEvent())
        })
    }
}
export default Observer
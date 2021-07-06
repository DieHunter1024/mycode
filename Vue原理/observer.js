// 发布模式
import dep from './dep.js'
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
        // console.log(dep)
        Object.defineProperty(data, key, {
            get: _ => val,
            set: newVal => newVal !== val && (val = newVal, this.initObserver(newVal), dep.fireEvent())
        })
    }
}
export default Observer
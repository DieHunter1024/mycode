// 发布模式
import Dep from './dep.js'
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
        Object.defineProperty(data, key, {
            get: _ => {
                console.log(Dep.target)
                Dep.target && Dep.subscribe(Dep.target);
                return val
            },
            set: newVal => {
                // console.log(Dep)
                newVal !== val && (this.initObserver(newVal), Dep.fireEvent(), val = newVal)
            }
        })
    }
}
export default Observer
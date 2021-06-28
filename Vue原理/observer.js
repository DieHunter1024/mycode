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
    // 递归监听所有层级
    newReactive(data, key, val) {
        this.initObserver(val)
        Object.defineProperty(data, key, {
            get() {
                return val
            },
            set(newVal) {
                newVal !== val && (value = newVal, this.initObserver(newVal), Dep.fireEvent());
            }
        })
    }
}
export default Observer
import DataProxy from './proxy.js'
import Compile from './compile.js'
import Observer from './observer.js'
class VueDemo {
    constructor(options) {
        this.data = options.data
        this.el = options.el
        this.options = options //配置信息
        if (this.el) {
            this.proxy = new DataProxy(this.data, this) //data代理到this
            this.compile = new Compile(options.el, this) //vue指令解析器
            this.observer = new Observer(this.data)
        }
    }
}
export default VueDemo
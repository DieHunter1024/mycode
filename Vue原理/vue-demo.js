import DataProxy from './proxy.js'
import Compile from './compile.js'
class VueDemo {
    constructor(options) {
        this.data = options.data
        this.el = options.el
        this.options = options
        if (this.el) {
            this.proxy = new DataProxy(this.data, this)//data代理到this
            this.compile = new Compile(options.el, this)
        }
    }
}
export default VueDemo
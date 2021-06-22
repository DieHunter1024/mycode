import Compile from './compile.js'
class VueDemo {
    constructor(options) {
        this.compile = new Compile(options.elem)
    }
}
export default VueDemo
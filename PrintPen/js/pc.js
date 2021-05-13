// PC端，鼠标事件
import Base from './base.js'
let that = null
export default class PcPrint extends Base {
    constructor(ele, dom) {
        super(ele, dom)
        that = this //注册全局this
        this.init()
        return this;
    }
    init() {
        that.canvasEle.addEventListener('mousedown', that.onMouseDown)
    }
    onMouseDown(e = event) {
        that.clearDefaultEvent(e)
        that.dom.addEventListener('mouseup', that.onMouseUp) //给dom添加mouseup避免产生鼠标点下时，移出画布造成其他的问题
        that.canvasEle.addEventListener('mousemove', that.onMouseMove)
        that.event.emitEvent('pointStart', that.getClient(e)) //触发开始签字事件
    }
    onMouseUp(e = event) {
        that.clearDefaultEvent(e)
        that.event.emitEvent('pointEnd') //触发结束签字事件
        that.canvasEle.removeEventListener('mousemove', that.onMouseMove) //移除移动事件
    }
    onMouseMove(e = event) {
        that.clearDefaultEvent(e)
        that.event.emitEvent('pointMove', that.getClient(e)) //触发签字事件
    }

}
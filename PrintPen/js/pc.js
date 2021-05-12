import event from './eventBus.js'
import Base from './base.js'
let that = null
export default class PcPrint extends Base {
    constructor(ele) {
        super(ele)
        that = this
        this.init()
        return this;
    }
    init() {
        that.ele.addEventListener('mousedown', that.onMouseDown)
    }
    onMouseDown(e) {
        that.clearDefaultEvent(e || event)
        that.ele.addEventListener('mouseup', that.onMouseUp)
        that.ele.addEventListener('mousemove', that.onMouseMove)
        event.emitEvent('pointStart', that.getClient(e))
    }
    onMouseUp(e) {
        that.clearDefaultEvent(e || event)
        event.emitEvent('pointEnd')
        that.ele.removeEventListener('mousemove', that.onMouseMove)
    }
    onMouseMove(e) {
        that.clearDefaultEvent(e || event)
        event.emitEvent('pointMove', that.getClient(e))
    }

}
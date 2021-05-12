import event from './eventBus.js'
import Base from './base.js'
let that = null
export default class MobilePrint extends Base {
    constructor(ele, dom, window) {
        super(ele, dom, window)
        that = this
        this.init()
        return this;
    }
    init() {
        that.ele.addEventListener('touchstart', that.onTouchStart)
    }
    onTouchStart(e) {
        that.clearDefaultEvent(e || event)
        that.ele.addEventListener('touchend', that.onTouchEnd)
        that.ele.addEventListener('touchmove', that.onTouchMove)
        event.emitEvent('pointStart', that.getClient(e.touches[0]))
    }
    onTouchEnd(e) {
        that.clearDefaultEvent(e || event)
        event.emitEvent('pointEnd')
        that.ele.removeEventListener('touchmove', that.onTouchMove)
    }
    onTouchMove(e) {
        that.clearDefaultEvent(e || event)
        event.emitEvent('pointMove', that.getClient(e.touches[0]))
    }
}
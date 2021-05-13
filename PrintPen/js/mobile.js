// Mobile端，触摸事件
import Base from './base.js'
let that = null
export default class MobilePrint extends Base {
    constructor(ele, dom) {
        super(ele, dom)
        that = this //注册全局this
        this.init()
        return this;
    }
    init() {
        that.canvasEle.addEventListener('touchstart', that.onTouchStart)
    }
    onTouchStart(e = event) {
        that.clearDefaultEvent(e)
        that.canvasEle.addEventListener('touchend', that.onTouchEnd) //没有像pc一样给dom添加touchend,因为touchmove是基于touchstart和touchend之间触发的，只要touchend触发，touchmove便失效
        that.canvasEle.addEventListener('touchmove', that.onTouchMove)
        that.event.emitEvent('pointStart', that.getClient(e.touches[0])) //这里可以做一个判断e.touches是否只有一个（e.touches表示有几个手指触碰）
    }
    onTouchEnd(e = event) {
        that.clearDefaultEvent(e)
        that.event.emitEvent('pointEnd')
        that.canvasEle.removeEventListener('touchmove', that.onTouchMove)
    }
    onTouchMove(e = event) {
        that.clearDefaultEvent(e)
        that.event.emitEvent('pointMove', that.getClient(e.touches[0]))
    }
}
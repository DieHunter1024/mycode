//基类：公共方法和属性
import event from './eventBus.js'
export default class Base {
    constructor(canvasEle, dom = document) {
        this.event = event //注册发布订阅
        this.canvasEle = canvasEle //待操作的画布标签
        this.dom = dom //dom
        return this;
    }
    /**
     * 取消默认事件和事件冒泡
     * @param e 事件对象
     */
    clearDefaultEvent(e) {
        e.preventDefault()
        e.stopPropagation()
    }
    /**
     * 获取事件元素离body可视区域的坐标
     * @param target 事件目标
     */
    getClient(target) {
        return {
            x: target.clientX,
            y: target.clientY
        }
    }
    /**
     * 抵消画布偏移
     * @param point 当前坐标
     * @param shift 偏移量
     */
    shiftingPosition(point, shift) {
        return {
            x: point.x - shift.left,
            y: point.y - shift.top
        }
    }
}
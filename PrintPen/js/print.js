import event from "./eventBus.js"
import PcPrint from './pc.js';
import MobilePrint from './mobile.js';
let that = null
export default class Print {
    constructor(canvasEle, options) {
        that = this
        this.options = options
        this.canvasEle = canvasEle
        this.init()
        this.initCanvas()
        return this
    }
    init() {
        this.Pc = this.options.Pc ? (new PcPrint(this.canvasEle)) : null
        this.Mobile = this.options.Mobile ? (new MobilePrint(this.canvasEle)) : null
        this.point = null //存储上一次坐标
        event.onEvent('pointMove', that.pointMove)
        event.onEvent('pointStart', that.pointStart)
        event.onEvent('pointEnd', that.pointEnd)
    }
    initCanvas() {
        this.context = this.canvasEle.getContext('2d')
        this.clientRect = this.canvasEle.getBoundingClientRect() // 获取标签相对可视区域的偏移量
        this.context.lineWidth = 1; // 线条宽度
        this.canvasEle.width = this.canvasEle.parentNode.offsetWidth //设置为父元素的宽
        this.canvasEle.height = this.canvasEle.parentNode.offsetHeight //设置为父元素的高
    }
    pointStart(point) {
        that.point = that.shiftingPosition(point, that.clientRect)
    }
    pointEnd() {
        that.point = null
    }
    pointMove(point) {
        that.canvasDraw(that.shiftingPosition(point, that.clientRect))
    }
    canvasDraw(point) {
        this.context.beginPath()
        this.context.moveTo(this.point.x, this.point.y)
        this.context.lineTo(point.x, point.y)
        this.context.stroke()
        this.context.closePath()
        that.point = point
    }
    shiftingPosition(point, shift) {
        return {
            x: point.x - shift.left,
            y: point.y - shift.top
        }
    }
}
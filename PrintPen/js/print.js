import Base from "./Base.js"
import PcPrint from './pc.js';
import MobilePrint from './mobile.js';
let that = null
export default class Print extends Base {
    constructor(canvasEle, options, dom) {
        super(canvasEle, dom)
        that = this
        this.options = options //配置画笔颜色，粗细，是否开启移动端或PC端，
        this.init() //初始化属性,配置,注册发布订阅等
        this.initCanvas() //初始化画布
        return this
    }
    init() {
        //Pc和Mobile启用开关
        this.Pc = this.options.Pc ? (new PcPrint(this.canvasEle)) : null
        this.Mobile = this.options.Mobile ? (new MobilePrint(this.canvasEle)) : null
        this.point = null //存储上一次坐标
        this.event.onEvent('pointMove', that.pointMove) //订阅签字事件
        this.event.onEvent('pointStart', that.pointStart) //订阅签字开始事件
        this.event.onEvent('pointEnd', that.pointEnd) //订阅签字结束事件
    }
    initCanvas() {
        this.clientRect = this.canvasEle.getBoundingClientRect() // 获取标签相对可视区域的偏移量
        this.canvasEle.width = this.canvasEle.parentNode.offsetWidth //设置为父元素的宽
        this.canvasEle.height = this.canvasEle.parentNode.offsetHeight //设置为父元素的高
        this.context = this.canvasEle.getContext('2d')
        this.context.strokeStyle = this.options.color; // 线条颜色
        this.context.lineWidth = this.options.weight; // 线条宽度
    }
    pointStart(point) {
        that.point = that.shiftingPosition(point, that.clientRect) //初始化起始位置
    }
    pointEnd() {
        that.point = null //清空起始位置
    }
    pointMove(point) {
        that.canvasDraw(that.shiftingPosition(point, that.clientRect)) //签字效果
    }
    canvasDraw(point) { //画布操作
        this.context.beginPath() //新建(重置)路径
        this.context.moveTo(this.point.x, this.point.y) //画布绘画起始点移动到前一个坐标
        this.context.lineTo(point.x, point.y) //画布从前一个坐标到当前坐标
        this.context.stroke() //从moveTo到lineTo进行绘制
        this.context.closePath() //创建从当前坐标回到前一个坐标的路径
        that.point = point //将此次坐标赋值给下一次移动时的前一个坐标
    }
}
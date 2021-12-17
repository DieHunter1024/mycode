---
title:  JS案例：支持PC端和Mobile端的Canvas电子签名功能 
date:  2021-05-13 18:33:0309-0101-2611-2603-1204-2807-2111-0111-05 
---
**前言：  
这段时间项目迭代时遇到了一个新需求，基于react实现一个Pc版电子签名功能，并生成图片上传。于是我想到了[signature\_pad](https://github.com/szimek/signature_pad/)，并且在项目使用了这个插件  
不得不说，用别人造的轮子是真的香，出于好奇，想用原生实现一下电子签名的功能**

**以下是实现过程**

**HTML和css可以参照[源码](https://gitee.com/DieHunter/myCode/tree/master/PrintPen)，这里不过多介绍**

**首先引入[eventBus](https://gitee.com/DieHunter/myCode/blob/master/%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F&%E5%8F%91%E5%B8%83%E8%80%85%E8%AE%A2%E9%98%85%E8%80%85%E6%A8%A1%E5%BC%8F/PubSubPattern/js/eventBus.js)，方便代码解耦  
然后实现Base基类存放公共方法和属性，后续有啥共用属性或方法可以往这加**

```javascript
//基类：公共方法和属性
import event from './eventBus.js'
export default class Base {
    constructor(canvasEle, dom = document) {
        this.event = event //注册发布订阅
        this.canvasEle = canvasEle //待操作的画布标签
        this.dom = dom //dom
        return this;
    }
}
```

**完成之后，我们先实现Pc版的电子签名功能，新建一个PcPrint继承自Base，参照之前写的[鼠标拖拽案例](https://blog.csdn.net/time_____/article/details/104444502)，实现在canvas上拖拽功能，并将事件结果的坐标发布出去。  
其中clearDefaultEvent函数和getClient函数在Base类中实现**

```javascript
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
```

**Base类添加以下代码：**

```javascript
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
```

**接着，我们对事件抛出的三个发布进行订阅，新建Print类，对获取的坐标通过canvas进行绘制**

```javascript
import Base from "./Base.js"
import PcPrint from './pc.js';
// import MobilePrint from './mobile.js';
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
        // this.Mobile = this.options.Mobile ? (new MobilePrint(this.canvasEle)) : null
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
```

**考虑到canvas的偏移问题，在Base中添加shiftingPosition函数，解决画布绘制时坐标偏移问题**

```javascript
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
```

**最后，在index中实例化电子签名**

```html
<script type="module">
    import Print from "./js/print.js"
    new Print(printBox,{
        Pc:true,
        Mobile:true,
        color:'lightcoral',
        weight:5
    })
</script>
```

**效果如下：**  
![](https://img-blog.csdnimg.cn/20210513181545194.gif)

**Pc端实现完成之后是Mobile端，代码大同小异，除了事件类型不用之外，还一点就是移动端的多指触碰支持，touchevent支持双指事件，此时我们要判断是否单指输入**

```javascript
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
```

**在移动端实现的效果：**

![](https://img-blog.csdnimg.cn/20210513182906294.gif)

**最后：  
附上源码地址：[Gitee](https://gitee.com/DieHunter/myCode/tree/master/PrintPen)**

**感谢你的阅读，如果这篇文章对你有帮助，希望三连支持一下，你的支持是我创作的动力，同时也欢迎大佬建议指正**
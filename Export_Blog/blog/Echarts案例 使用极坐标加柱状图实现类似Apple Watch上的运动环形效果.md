---
title:  Echarts案例：使用极坐标加柱状图实现类似Apple Watch上的运动环形效果 
date:  2020-03-21 10:10:2010-1010-2004-3004-1109-2305-1512-1201-1408-0109-2009-1512-1509-2711-2601-1407-1705-2308-2810-18 
---
分享自己公司项目类似的一个案例，用Echarts中的Polar（极坐标或称为平面直角坐标系）和Bar（柱状图）实现的

大致效果是这样的

![](https://img-blog.csdnimg.cn/20200320173636628.gif)

参照的是AntV中的[https://antv-f2.gitee.io/zh/examples/gallery/fitness-ring](https://antv-f2.gitee.io/zh/examples/gallery/fitness-ring)的效果，只不过我是用Echarts实现的  
首先需要引入Echarts.js,推荐用npm下载：npm install echarts  
或直接用cdn托管：[https://www.bootcdn.cn/echarts/](https://www.bootcdn.cn/echarts/)  
**源码：**[https://gitee.com/DieHunter/myCode/tree/master/Echart/AppleWatch](https://gitee.com/DieHunter/myCode/tree/master/Echart/AppleWatch)  
以下是全部代码：

**HTML：**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .chart_box {
            width: 300px;
            height: 300px;
            margin: 100px auto 0;
            background: #000;
        }
    </style>
    <script src="./echarts.js"></script>
</head>

<body>
    <div id="chart_box" class="chart_box"></div>
    <script type="module">
        import MyChart from './MyChart.js'
        MyChart.getInstance(echarts,chart_box).createChart()//初始化入口函数
    </script>
</body>

</html>
```

**JS：**

```javascript
export default class MyChart {
    constructor(_echart, _ele) {
        this.timeTickId = null //定时器id
        this.timer = 1.5 //更新数据频率
        this.option = null //当前echarts实例的属性
        this._echart = _echart //引入Echarts
        this._ele = _ele //案例的父元素
        this.myChart = null //当前echarts实例
        this.colorList = ['#14A5AB', '#88D903', '#E90B3A'] //上层环背景
        this.bgList = ['#183C3D', '#324214', '#40131D'] //下层环背景
        this.maxCount = 100 //圆环最大值,即转一圈的值
    }
    static getInstance() { //单例模式
        if (!MyChart._instance) {
            Object.defineProperty(MyChart, "_instance", {
                value: new MyChart(...arguments)
            })
        }
        return MyChart._instance;
    }
    createChart = () => {
        this.disposeChart() //创建前初始化chart实例，若有，则销毁
        this.myChart = this._echart.init(this._ele)
        this.option = {
            angleAxis: {
                show: false, //隐藏角度轴（圆心角）
                max: this.maxCount,
                startAngle: 90, //极坐标从第一象限开始，即平面直角坐标系,用时钟理解，0就是三点钟方向，这里我们从12点钟方向开始，也就是3点钟方向加90度
                splitLine: {
                    show: false //隐藏分隔线
                },
            },
            barMaxWidth: 50, //设置圆环最大宽度
            radiusAxis: {
                show: false, //隐藏径向轴（半径）
                type: 'category',
                data: ['A', 'B', 'C'] //传入每条圆环的径向值
            },
            polar: {
                radius: [30, 150] //总体的最小半径，最大半径
            },
            series: [{ //上层的圆环
                    type: 'bar',
                    data: [1, 2, 3], //初始值
                    coordinateSystem: 'polar', //设置类型为极坐标
                    roundCap: true, //柱状图末端呈现圆角
                    itemStyle: { //设置每一个圆环的颜色
                        color: (params) => {
                            return this.colorList[params.dataIndex]
                        }
                    },
                    animationEasing: 'bounceOut', //初始动画
                    barGap: '-100%', //柱间距离,用来将上下两种圆环重合
                    z: 200, //圆环层级，和zindex相似
                },
                { //下层的圆环
                    type: 'bar',
                    data: [this.maxCount, this.maxCount, this.maxCount],
                    coordinateSystem: 'polar',
                    roundCap: true,
                    itemStyle: { //设置每一个圆环的颜色
                        color: (params) => {
                            return this.bgList[params.dataIndex]
                        }
                    },
                    z: 100,
                    barGap: '-100%', //柱间距离,用来将上下两种圆环重合
                }
            ]
        };
        this.timeTick() //定时器入口
    }
    setOption = () => { //随机数刷新数据
        if (this.option) {
            this.option.series[0].data = this.option.series[0].data.map(item => {
                return Math.random() * this.maxCount
            })
        }
        this.myChart.setOption(this.option, true)
    }
    disposeChart = () => { //初始化chart实例
        if (this.myChart) {
            this.myChart.dispose()
            this.myChart = null
            this.option = null
        }
    }
    timeTick = () => { //定时器,最好用延时加递归，如果用setInterval，容易造成堵塞
        if (this.timeTickId) {
            clearTimeout(this.timeTickId)
            this.timeTickId = 0
        }
        this.setOption()
        this.timeTickId = setTimeout(this.timeTick, 1000 * this.timer || 5000)
    }
}
```
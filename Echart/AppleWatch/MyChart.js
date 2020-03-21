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
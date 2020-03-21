var chart, option, data, timeTickId, timer, max;
window.onload = function init() {
    chart = echarts.init(PolarGauge); //初始化chart容器
    data = { //显示的数据
        "name": '馆藏量',
        "num": 1000
    }
    timer = 1.5 //刷新频率
    max = 1000 //最大馆藏量
    createPolarGauge() //配置chart
}

function createPolarGauge() {
    option = {
        angleAxis: {
            show: false,
            max: max * 3 / 2, //这里将极坐标最大值转换成仪表盘的最大值，(360度除以240度)
            type: 'value',
            startAngle: 210, //极坐标初始角度，从第一象限算起，大约在7-8点钟角度之间
            splitLine: {
                show: false //隐藏坐标
            }
        },
        barMaxWidth: 18, //圆环宽度
        radiusAxis: { //隐藏坐标
            show: false,
            type: 'category',
        },
        polar: { //设置圆环位置和大小
            center: ['50%', '50%'],
            radius: '296'
        },
        series: [{
                type: 'bar',
                data: [{ //上层圆环，用于显示真实数据
                    value: data.num,
                    itemStyle: {
                        color: { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1, //从左到右 0-1
                            y2: 0,
                            colorStops: [{
                                offset: 0,
                                color: '#CD48AE' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#2CABFC' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        shadowColor: 'rgba(255, 255, 255, 0.2)', //加白色阴影产生高亮效果
                        shadowBlur: 10
                    }
                }],
                barGap: '-100%', //柱间距离,用来将上下两层圆环重合
                coordinateSystem: 'polar', //类型，极坐标
                roundCap: true, //顶端圆角
                z: 2 //圆环层级，和zindex相似
            }, { //下层圆环，用于显示最大值
                type: 'bar',
                data: [{
                    value: max,
                    itemStyle: {
                        color: '#265195',
                        shadowColor: 'rgba(0, 0, 0, 0.2)', //加白色阴影产生高亮效果
                        shadowBlur: 5,
                        shadowOffsetY: 2
                    }
                }],
                barGap: '-100%', //柱间距离,用来将上下两层圆环重合
                coordinateSystem: 'polar', //类型，极坐标
                roundCap: true, //顶端圆角
                z: 1 //圆环层级，和zindex相似
            },
            { //仪表盘
                type: 'gauge',
                radius: '95%',
                startAngle: 210, //起始角度，同极坐标
                endAngle: -30, //终止角度，同极坐标
                max: max,
                splitNumber: 5, //分割线个数（除原点外）
                axisLine: { // 坐标轴线
                    show: false
                },
                pointer: {
                    show: false
                },
                axisLabel: {
                    // 坐标轴数字
                    textStyle: {
                        fontSize: 8,
                        color: "#13B5FC"
                    },

                },
                axisTick: { // 坐标轴标记
                    length: 10,
                    lineStyle: {
                        color: "#13B5FC"
                    }
                },
                splitLine: { // 分隔线
                    length: 5,
                    lineStyle: {
                        width: 1,
                    }
                },
                title: { //标题，显示'馆藏量'
                    textStyle: {
                        color: '#fff',
                        shadowColor: '#fff',
                        fontSize: 30
                    },
                    offsetCenter: ["0", '-35%'] //位置偏移
                },
                detail: { //仪表盘数值
                    formatter: function (params) {
                        var name = data.num.toString()
                        var list = ''
                        for (var i = 0; i < name.length; i++) {
                            list += '{value|' + name[i] + '}' //每个数字用border隔开
                            if (i !== name.length - 1) {
                                list += '{margin|}' //添加margin值
                            }
                        }
                        return [list]
                    },
                    offsetCenter: ["0", '5%'],
                    rich: { //编辑富文本样式
                        value: {
                            width: 34,
                            height: 42,
                            borderColor: '#02A0F0',
                            borderWidth: 2,
                            borderRadius: 5,
                            lineHeight: 1000,
                            fontSize: 36,
                            padding: [0, 0, 4, 0],
                            color: '#fff',
                            shadowColor: 'rgb(2,157,239)',
                            shadowBlur: 5
                        },
                        margin: {
                            width: 8,
                            height: 42,
                        }
                    }

                },
                data: [{
                    value: data.num,
                    name: data.name
                }]
            }
        ]
    }
    timeTick()
}

function setOption() { //更新数据
    data.num = parseInt(Math.random() * max)
    option.series[2].data[0].value = data.num
    option.series[0].data[0].value = data.num
    chart.setOption(option)
}


function timeTick() { //定时器,最好用延时加递归，如果用setInterval，容易造成堵塞
    if (timeTickId) {
        clearTimeout(timeTickId)
        timeTickId = 0
    }
    setOption()
    timeTickId = setTimeout(timeTick, 1000 * timer || 5000)
}
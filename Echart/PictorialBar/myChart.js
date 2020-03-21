let createChart = () => {
    _option = {
        grid: [{ //设置边距
            left: 55,
            bottom: 53,
            top: 20,
            right: 10
        }],
        yAxis: { //Y轴配置
            show: true,
            axisLine: {
                show: false,
                lineStyle: { //隐藏Y轴
                    opacity: 0
                }
            },
            axisTick: { //隐藏刻度
                show: false,
            },
            splitLine: { //隐藏刻度
                show: false,
            },
            axisLabel: { //Y轴文字
                color: '#fff',
                fontSize: 12
            },
        },
        xAxis: { //X轴配置
            data: category, //X轴数据
            show: true,
            axisLabel: { //X轴文字样式
                color: '#a9aabc',
                fontSize: 12,
                interval: 0,
                padding: [10, 0, 0, 0]
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false,
            }
        },
        series: [{
            name: '',
            type: 'pictorialBar', //设置类型为象形柱状图
            symbol: 'roundRect', //图形类型，带圆角的矩形
            barWidth: '11%', //柱图宽度
            barMaxWidth: '20%', //最大宽度
            symbolMargin: '3', //图形垂直间隔
            animationDelay: (dataIndex, params) => { //每个图形动画持续时间
                return params.index * 50;
            },
            itemStyle: {
                normal: {
                    color: params => { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
                        return new echarts.graphic.LinearGradient(
                            1, 1, 0, 0, [{
                                    offset: 0,
                                    color: colorList.first[params.dataIndex]
                                },
                                {
                                    offset: 1,
                                    color: colorList.second[params.dataIndex]
                                }
                            ])
                    }
                }
            },
            z: 1,
            symbolRepeat: true, //图形是否重复
            symbolSize: [25, 6], //图形元素的尺寸
            data: lineData, //Y轴数据
            animationEasing: 'elasticOut' //动画效果
        }]
    }
    timeTick()
}
let disposeChart = () => { //销毁chart
    _myChart.dispose()
    _myChart = null
}
let setOption = () => { //重置数据
    _option.xAxis.data = category.slice(chartConfig.first, chartConfig.second)
    _option.series[0].data = lineData.slice(chartConfig.first, chartConfig.second)
    _myChart.setOption(_option, true)
}
let timeTick = () => { //定时器,最好用延时加递归，如果用setInterval，容易造成堵塞
    if (timeTickId) {
        clearTimeout(timeTickId)
        timeTickId = 0
    }
    autoChangeData()
    timeTickId = setTimeout(timeTick, 1000 * timer || 5000)
}
let autoChangeData = () => { //偏移数组，切换数据
    if (!chartConfig.max) {
        return
    }
    if (chartConfig.second >= chartConfig.max) {
        chartConfig.second = chartConfig.second - chartConfig.first
        chartConfig.first = 0
    } else {
        chartConfig.first++
        chartConfig.second++
    }
    setOption()
}
let filterData = (data, category = [], lineData = []) => { //过滤后端数据，分别变成X轴数组和Y轴数组
    data.forEach(item => {
        item.typeName = item.typeName.length > 2 ? item.typeName.substring(0, 2) : item.typeName
        category.push(item.typeName || '')
        lineData.push(item.bnum || 0)
    })
    return {
        category,
        lineData
    }
}
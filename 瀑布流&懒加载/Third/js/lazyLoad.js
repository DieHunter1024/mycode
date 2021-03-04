import eventBus
    from './eventBus.js'
import Utils
    from './utils.js'

const utils = new Utils()
export default class LazyLoad {
    constructor (pageConfig, ele, data) {
        Object.defineProperties(this, {
            //前端分页功能的分页配置
            'pageConfig': {
                value: pageConfig,
                writable: true
            },
            //待监听滚动的元素
            'ele': {
                value: ele,
                writable: false
            },
            //所有数据，图片列表
            'data': {
                value: data,
                writable: false
            }
        });
        this.init()
    }

    /**
     * 对总列表分页后截取start到end数据，并通知渲染页面
     * @param val  截取的数据
     */
    set pagingData (val) {
        //是否清除上一页
        this.pageConfig.clear ? (utils.clearEle(this.ele), this.ele.scrollTop = 0) : ""
        eventBus.emitEvent('lazyLoadStep', val)//数据翻页后通知渲染层，并将截取的数据传递过去
    }

    /*
     * 初始化函数
     */
    init () {
        this.scrollLoadPage(this.ele)
        this.nextPage()//获取第一页
    }

    /*
     * 翻页功能，若大于总页数则跳出
     */
    nextPage () {
        if(this.pageConfig.page > this.pageConfig.totalPage) {
            console.log('到底了！')
            return
        }
        this.pagingData = this.paging(this.pageConfig, this.data)
        this.pageConfig.page ++
    }

    /*
     * 滚动事件
     */
    scrollLoadPage (ele) {
        ele.addEventListener('scroll', this.loadHandler.bind(this))
    }
    /*
     * 滚动事件回调
     */
    loadHandler (e) {
        if(
            e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight
        ) {
            this.nextPage()
        }
    }
    /*
     * 分页功能,截取数据
     * @param pageConfig  分页配置属性（page：第几页，pageSize；单页大小，totalPage：总页数,第一页无此属性）
     * @param data 总数据
     * @return data 当前页面截取的数据
     */
    paging (pageConfig, data) {
        let {
            page,
            pageSize
        } = pageConfig
        pageConfig.totalPage = Math.ceil(data.length / pageConfig.pageSize)
        let startIndex = page * pageSize - pageSize
        let endIndex = page * pageSize
        return data.slice(startIndex, endIndex)
    }
}
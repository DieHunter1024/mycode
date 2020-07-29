import View from './view.js'
export default class Model { //模型层，用于数据存放及数据逻辑，通过事件处理机制（controller）传递数据，再由command进行对数据操作
    constructor() {
        this._imgList = null
        this._nowPicCount = 0
    }

    static getInstance() { //单例写法与java中getinstance相似，new会生成一个新对象，分配内存，而这么写可以把一个已存在的引用给你使用，节省效能,若只使用get + 属性名而不用set产生只读属性，只允许调用，无法修改
        if (!Model._instance) {
            Object.defineProperty(Model, "_instance", {
                value: new Model()
            })
        }
        return Model._instance;
    }
    set imgList(value) { //设置商品列表
        this._imgList = value;
        View.initView()
    }
    get imgList() {
        return this._imgList
    }
    set nowPicCount(value) {
        if (value < 0) {
            this._nowPicCount = 0
        } else if (value >= this.imgList.length) {
            this._nowPicCount = this.imgList.length - 1
        } else {
            this._nowPicCount = value;
            View.checkPic()
        }

    }
    get nowPicCount() {
        return this._nowPicCount
    }
}
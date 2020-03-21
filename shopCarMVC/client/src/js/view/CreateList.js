import Api from '../config/Api.js'
import Utils from '../utils/Utils.js'
import ShopEvent from '../event/ShopEvent.js'
import ShopController from '../controller/ShopController.js'

export default class CreateList { //视图层，用于元素渲染，显示数据，依据（model）模型数据创建
    constructor(parentEle) {
        this.parentEle = parentEle
        this._shopList = null
    }
    set shopList(value) { //使用对象代理，每当数据发生更改时渲染商品列表
        if (this._shopList) {
            this.createListEle(this._shopList, this.parentEle)
            return;
        }
        this._shopList = value
        this.createListEle(value, this.parentEle)
    }
    get shopList() {
        return this._shopList
    }
    createListEle(data, parentEle) {
        let li = Utils.createEle('li', {}, {
            'className': 'liItem'
        })
        let img = Utils.createEle('img', {}, {
            'src': Api.IMGPATH + data.icon
        })
        let title = Utils.createEle('div', {}, {
            'textContent': data.name
        })
        let price = Utils.createEle('span', {}, {
            'textContent': data.price + "元"
        })
        li.appendChild(img);
        li.appendChild(title);
        li.appendChild(price);
        li.addEventListener('click', this.addItemEvent)
        parentEle.appendChild(li);
    }
    addItemEvent = e => { //当用户点击添加商品时，将数据通过controller层发送至事件总线，再驱动model层并修改数据,后续由Model提供数据刷新表格
        ShopController.dispatch(ShopEvent.ADD_SHOPIING_ITEM, this.shopList)
    }
}
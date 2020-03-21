import Api from '../config/Api.js'
import Utils from '../utils/Utils.js'
import Counter from '../components/Counter.js'
import ShopEvent from '../event/ShopEvent.js'
import ShopController from '../controller/ShopController.js'

export default class CreateTable { //视图层，用于元素渲染，显示数据，依据（model）模型数据创建
    constructor(parentEle) {
        this.parentEle = parentEle
        this._shoppingList = null
        this._table = null
    }
    set shoppingList(value) { //对象代理，若model数据改变时，刷新表格
        let table = document.getElementById('table')
        if (table) { //初始化表格，若有则删除
            table.remove()
            table = null;
        }
        this._shoppingList = value || []
        this.createTab(value, this.parentEle)
    }
    get shoppingList() {
        return this._shoppingList
    }
    createTab(data, parentEle) {
        this._table = Utils.createEle('table', {}, {
            id: "table"
        })
        let thr = Utils.createEle('tr')
        for (let prop in data[0]) { //创建表头，如果属性名是select，就创建全选按钮
            let th = Utils.createEle('th')
            if (prop === "select") {
                let input = Utils.createEle('input', {}, {
                    type: "checkbox",
                    className: "checkbox",
                    checked: this.checkedAll() //查询是否全选
                })
                input.addEventListener("change", this.seleteEvent);
                th.appendChild(input);
            } else {
                th.textContent = prop;
            }
            thr.appendChild(th)
        }
        this._table.appendChild(thr)
        for (let i = 0; i < data.length; i++) {
            let tr = Utils.createEle('tr')
            this._table.appendChild(tr);
            for (let str in this.shoppingList[i]) {
                let td = document.createElement("td");
                this.selectTdType(td, this.shoppingList[i], str);
                tr.appendChild(td);
            }
        }
        parentEle.appendChild(this._table)
    }
    selectTdType(td, data, type) {
        switch (type) {
            case 'select':
                let input = Utils.createEle('input', {}, {
                    type: 'checkbox',
                    className: 'checkbox',
                    checked: data['select'],
                    data
                })
                input.addEventListener("change", this.seleteEvent);
                td.appendChild(input);
                break;
            case 'icon':
                let img = Utils.createEle('img', {}, {
                    'src': Api.IMGPATH + data.icon
                })
                td.appendChild(img);
                break;
            case 'num':
                new Counter(data, td) //实例化计数器组件
                break;
            case 'delete':
                let btn = Utils.createEle('button', {}, {
                    textContent: '删除',
                    data
                })
                td.appendChild(btn);
                btn.addEventListener("click", this.deleteItemEvent);
                break;
            default:
                td.textContent = data[type];
                break;
        }
    }
    deleteItemEvent = e => { //触发删除事件，通过command删除后通知model驱动view进行刷新
        ShopController.dispatch(ShopEvent.DEL_SHOPIING_ITEM, e.target.data)
    }
    seleteEvent = e => { //触发选择商品事件，通过command删除后通知model驱动view进行刷新
        ShopController.dispatch(ShopEvent.SELECT_SHOPIING_ITEM, e.target.data)
    }
    checkedAll() {
        let count = 1
        this.shoppingList.map((item) => {
            count *= item.select
        })
        return count
    }
}
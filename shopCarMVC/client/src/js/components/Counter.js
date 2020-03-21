import ShopEvent from '../event/ShopEvent.js'
import ShopController from '../controller/ShopController.js'
import Utils from '../utils/Utils.js'
export default class Counter { //计数器组件
    constructor(_data, _parentEle) {
        this.data = _data
        this.parentEle = _parentEle
        this.ele = this.createCounter()
    }
    createCounter() { //创建数量计数器
        let div = Utils.createEle('div', {}, {
            className: 'numBox'
        })
        this.parentEle.appendChild(div);
        let leftBtn = this.createMark(div, 'reduce') //减少商品按钮
        let input = Utils.createEle('input', {}, {
            type: 'text',
            value: this.data.num
        })
        div.appendChild(input);
        let rightBtn = this.createMark(div, 'add') //新增商品按钮
        leftBtn.addEventListener("click", this.reduceItemEvent);
        rightBtn.addEventListener("click", this.addItemEvent);
        input.addEventListener("input", Utils.throttle(this.changeItemEvent, 500)); // 节流
        return div;
    }
    createMark(parentEle, type) { //判断增加或减少键
        let markBtn = Utils.createEle('button', {}, {
            textContent: type == "add" ? '+' : '-'
        })
        parentEle.appendChild(markBtn);
        return markBtn
    }
    addItemEvent = e => { //新增商品时，抛发事件至command控制model修改数据，刷新表格
        ShopController.dispatch(ShopEvent.ADD_SHOPIING_ITEM, this.data)
    }
    reduceItemEvent = e => { //减少商品
        ShopController.dispatch(ShopEvent.REDUCE_SHOPIING_ITEM, this.data)
    }
    changeItemEvent = e => { //修改商品
        e.target.value = this.data.num = this.checkNumber(e.target.value)
        ShopController.dispatch(ShopEvent.CHANGE_SHOPIING_ITEM, this.data)
    }
    checkNumber(value) { //过滤数据
        value = value.replace(/[^0-9]/g, ""); //只允许输入数字
        if (value === "0") { // 如果=0，就设为1
            value = "1";
        }
        if (value.length > 2) { // 如果输入的内容大于2位，让这个值为99（最大99个）
            value = "99";
        }
        if (value.length === 0) { //  如果什么都没有输入，也设为1
            value = "1";
        }
        return value
    }
}
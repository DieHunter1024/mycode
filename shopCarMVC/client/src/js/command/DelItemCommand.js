import ShopModel from '../model/ShopModel.js'
export default class DelItemCommand { //行为类，用于执行ctrl层通过事件的方式发来的指令
    constructor() { //删除商品

    }
    eventHandler(e) { //使用动态方法，而不是static静态方法，因为该方法将被使用多次，使用new AddShopCommand实例化后调用
        let {
            data
        } = e
        DelItemCommand.delItem(ShopModel.getInstance().shoppingList, data)
    }
    static delItem(list, data) { //遍历查询某项商品增加或减少
        data.num = 0; //此处初始化model中的shopList，否则会假删除（删除栈中的数量）
        data.select = false; //此处初始化model中的shopList，否则会假删除（删除栈中的数量）
        ShopModel.getInstance().shoppingList = list.filter(function (item) { //数组过滤函数，返回id属性不等于当前id的数组，即删除当前选中的对象，并重新赋值
            return item.id !== data.id;
        });
    }
}
import ShopModel from '../model/ShopModel.js'
export default class SelectItemCommand { //行为类，用于执行ctrl层通过事件的方式发来的指令
    constructor() {

    }
    eventHandler(e) { //使用动态方法，而不是static静态方法，因为该方法将被使用多次，使用new AddShopCommand实例化后调用
        let {
            data
        } = e
        SelectItemCommand.selItem(ShopModel.getInstance().shoppingList, data)
    }
    static selItem(list, data) { //遍历查询某项商品增加或减少
        if (!data) { //全选框
            list.checkedAll = !list.checkedAll
            list.map(function (item) {
                item.select = list.checkedAll; //其他选项框与全选框状态一致
            })
        } else { //单选框
            list.checkedAll = 1 //计数器，用来查询是否为全选状态
            list.map(function (item) { //单选，选中某一个（在表格初始化时执行checkAll判断是否全选）
                if (item.id === data.id) {
                    item.select = !item.select
                }
                list.checkedAll *= item.select
            })
        }
        ShopModel.getInstance().shoppingList = list
    }
}
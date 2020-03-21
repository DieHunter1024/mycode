import ShopModel from '../model/ShopModel.js'
export default class ChangeItemCommand { //行为类，用于执行ctrl层通过事件的方式发来的指令
    constructor() { //修改商品数量

    }
    eventHandler(e) { //使用动态方法，而不是static静态方法，因为该方法将被使用多次，使用new AddShopCommand实例化后调用
        let {
            data
        } = e
        ChangeItemCommand.changeItem(ShopModel.getInstance().shoppingList, data)
    }
    static changeItem(list, data) {
        let arr = list.filter(function (item) {
            return item.id === data.id;
        });
        arr[0].sum = arr[0].num * arr[0].price;
        ShopModel.getInstance().shoppingList = list
    }
}
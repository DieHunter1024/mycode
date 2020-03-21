import ShopModel from '../model/ShopModel.js'
export default class AddItemCommand { //行为类，用于执行ctrl层通过事件的方式发来的指令
    constructor() { //新增商品

    }
    eventHandler(e) { //使用动态方法，而不是static静态方法，因为该方法将被使用多次，使用new AddShopCommand实例化后调用
        let {
            data
        } = e
        AddItemCommand.addItem(ShopModel.getInstance().shoppingList, data)
    }
    static addItem(list, data) { //遍历查询某项商品增加或减少
        let arr = list.filter(function (item) {
            return item.id === data.id;
        }); //若有返回值则对某项商品操作（在1-99区间，若为0则直接删除）
        if (arr.length == 0) {
            data.num++;
            data.sum = data.num * data.price;
            list.push(data);
        } else if (arr[0].num < 99) {
            arr[0].num++;
            arr[0].sum = arr[0].num * arr[0].price;
        }
        ShopModel.getInstance().shoppingList = list
    }
}
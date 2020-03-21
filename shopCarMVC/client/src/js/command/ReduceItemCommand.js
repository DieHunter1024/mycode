import ShopModel from '../model/ShopModel.js'
export default class ReduceItemCommand { //行为类，用于执行ctrl层通过事件的方式发来的指令
    constructor() { //减少商品

    }
    eventHandler(e) { //使用动态方法，而不是static静态方法，因为该方法将被使用多次，使用new AddShopCommand实例化后调用
        let {
            data
        } = e
        ReduceItemCommand.reduceItem(ShopModel.getInstance().shoppingList, data)
    }
    static reduceItem(list, data) { //遍历查询某项商品增加或减少
        let arr = list.filter(function (item) {
            return item.id === data.id;
        }); //若有返回值则对某项商品操作（在1-99区间，若为0则直接删除）
        if (arr[0].num > 1) {
            arr[0].num--;
            arr[0].sum = arr[0].num * arr[0].price;
        } else {
            data.num = 0; //此处初始化model中的shopList，否则会假删除（删除栈中的数量）
            list = list.filter(function (item) {
                return item.id !== data.id;
            });
        }
        ShopModel.getInstance().shoppingList = list
    }
}
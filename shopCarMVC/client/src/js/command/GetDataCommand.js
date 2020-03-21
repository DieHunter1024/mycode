import ShopModel from '../model/ShopModel.js'
export default class GetDataCommand { //行为类，用于执行ctrl层通过事件的方式发来的指令
    constructor() {

    }
    eventHandler(e) { //使用动态方法，而不是static静态方法，因为该方法将被使用多次，使用new AddShopCommand实例化后调用
        let {
            data
        } = e
        ShopModel.getInstance().shopList = data.shopData//将ajax获取的数据发送到Model
    }
}
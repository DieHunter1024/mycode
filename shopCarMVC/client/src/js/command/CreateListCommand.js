import CreateList from '../view/CreateList.js'
export default class CreateListCommand { //行为类，用于执行ctrl层通过事件的方式发来的指令
    constructor() {//创建商品列表

    }
    eventHandler(e) { //使用动态方法，而不是static静态方法，因为该方法将被使用多次，使用new AddShopCommand实例化后调用
        let {
            data
        } = e
        for (let i = 0; i < data.length; i++) {
            let createList = new CreateList(document.body)
            createList.shopList = data[i]
        }
    }
}
import CreateTable from '../view/CreateTable.js'
export default class ShopCommand { //行为类，用于执行ctrl层通过事件的方式发来的指令
    constructor() {//刷新购物车表格

    }
    eventHandler(e) { //使用动态方法，而不是static静态方法，因为该方法将被使用多次，使用new AddShopCommand实例化后调用
        let {
            data
        } = e
        let createTable = new CreateTable(document.body)
        createTable.shoppingList = data
    }
}
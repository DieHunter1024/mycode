export default class ShopEvent { //模型层，用于数据存放及数据逻辑
    constructor() {

    }
    // 所有自定义事件名称
    static GET_DATA = 'get_data'
    static GET_SHOP_LIST = 'get_shop_list'
    static GET_SHOPIING_LIST = 'get_shopping_list'
    static ADD_SHOPIING_ITEM = 'add_shopping_item'
    static DEL_SHOPIING_ITEM = 'del_shopping_item'
    static REDUCE_SHOPIING_ITEM = 'reduce_shopping_item'
    static CHANGE_SHOPIING_ITEM = 'change_shopping_item'
    static SELECT_SHOPIING_ITEM = 'select_shopping_item'
}
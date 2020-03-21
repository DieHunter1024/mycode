import ShopEvent from '../event/ShopEvent.js'
import ShopController from '../controller/ShopController.js'
export default class ShopModel { //模型层，用于数据存放及数据逻辑，通过事件处理机制（controller）传递数据，再由command进行对数据操作
    constructor() {
        this._shopList = null
        this._shoppingList = []
    }

    static getInstance() { //单例写法与java中getinstance相似，new会生成一个新对象，分配内存，而这么写可以把一个已存在的引用给你使用，节省效能,若只使用get + 属性名而不用set产生只读属性，只允许调用，无法修改
        if (!ShopModel._instance) {
            Object.defineProperty(ShopModel, "_instance", {
                value: new ShopModel()
            })
        }
        return ShopModel._instance;
    }
    set shopList(value) {//设置商品列表
        this._shopList = value;
        ShopController.dispatch(ShopEvent.GET_SHOP_LIST, value)
    }
    get shopList() {
        return this._shopList
    }
    set shoppingList(value) {//数据修改时，驱动view进行表格刷新
        this._shoppingList = value;
        ShopController.dispatch(ShopEvent.GET_SHOPIING_LIST, value)
    }
    get shoppingList() {
        return this._shoppingList
    }
}
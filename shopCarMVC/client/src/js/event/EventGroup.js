import ShopEvent from './ShopEvent.js'
import ShopController from '../controller/ShopController.js'
import MainCommand from '../command/MainCommand.js'
let {
    GetDataCommand,
    CreateListCommand,
    CreateTableCommand,
    AddItemCommand,
    DelItemCommand,
    ReduceItemCommand,
    ChangeItemCommand,
    SelectItemCommand
} = MainCommand
export default class EventGroup { //事件总线，注册所有model层与其它层的业务逻辑,全程通过controller层中的事件机制进行通信
    constructor() {
        /*
        1.Ajax获取到数据后，触发GetDataCommand中的方法，用于传递数据至Model层中，然后通过Model层调用CreateListCommand创造商品列表
        2.当用户对商品做任何操作时，都会修改Model从而触发CreateTableCommand，以下操作会触发CreateTableCommand
        3.点击商品列表或点击商品加号按钮时触发AddItemCommand，通过AddItemCommand修改model中的数据，从而驱动CreateTableCommand
        4.点击商品减号按钮时触发ReduceItemCommand，修改model中的数据，从而驱动CreateTableCommand
        5.点击商品删除按钮时触发DelItemCommand，删除model中的数据，从而驱动CreateTableCommand
        6.修改商品数量时触发ChangeItemCommand，更新model中的数据，从而驱动CreateTableCommand
        7.选中商品时触发SelectItemCommand，更新model中的数据，从而驱动CreateTableCommand
         */
        ShopController.runCommand(ShopEvent.GET_DATA, GetDataCommand)//获取商品列表数据
        ShopController.runCommand(ShopEvent.GET_SHOP_LIST, CreateListCommand)//新建商品列表
        ShopController.runCommand(ShopEvent.GET_SHOPIING_LIST, CreateTableCommand)//刷新购物车表格
        ShopController.runCommand(ShopEvent.ADD_SHOPIING_ITEM, AddItemCommand)//商品新增或数量加一
        ShopController.runCommand(ShopEvent.DEL_SHOPIING_ITEM, DelItemCommand)//商品删除
        ShopController.runCommand(ShopEvent.REDUCE_SHOPIING_ITEM, ReduceItemCommand)//商品数量减一
        ShopController.runCommand(ShopEvent.CHANGE_SHOPIING_ITEM, ChangeItemCommand)//修改商品数量
        ShopController.runCommand(ShopEvent.SELECT_SHOPIING_ITEM, SelectItemCommand)//选择商品
    }
}
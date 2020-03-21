import Api from '../config/Api.js'
import AJAX from '../bussiness/Ajax.js'
import EventGroup from '../event/EventGroup.js'
export default class ShopView { //视图层，用于元素渲染，显示数据，依据（model）模型数据创建
    constructor() {
        new EventGroup() //注册所有自定义事件，用于数据传输
        AJAX.AjaxTool(Api.GET, Api.ServerApi.getShopList, { //请求服务端购物车列表
            token: 'hello'//发送从后端获取的token用于验证，此处未做获取，直接用一个字符代替
        })
    }
}
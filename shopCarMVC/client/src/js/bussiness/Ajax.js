import ShopEvent from '../event/ShopEvent.js'
import Utils from '../utils/Utils.js'
import Api from '../config/Api.js'
import ShopController from '../controller/ShopController.js'
export default class Ajax {//Ajax类，用于请求后端或本地数据
    // Ajax请求函数
    static AjaxTool(method = Api.GET, url, data) {
        let xhr;
        if (window.ActiveXObject) { //ie浏览器
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } else if (window.XMLHttpRequest) { //其他浏览器
            xhr = new XMLHttpRequest();
        }
        url = Api.URL + Api.PORT + Api.PATH + url
        if (method !== Api.POST) {
            method = Api.GET
            url = Utils.urlJoin(url, data)
            data = null
        } else {
            method = Api.POST
        }
        xhr.open(method, url);
        xhr.send(data ? JSON.stringify(data) : '')
        xhr.addEventListener('load', Ajax.loadHandler) //Ajax类是静态类，无法使用this
    }
    static loadHandler(e) {
        //this指向xhr
        let xhr = e.currentTarget;
        if (xhr.readyState === 4 && xhr.status === 200) {
            Ajax.data = xhr.response
        } else {
            Ajax.data = 'error'
        }

    }
    static set data(value) { //使用set对象代理模式替代请求数据回调函数（只写set表示data只可写入，不可读取）
        let res = JSON.parse(value)
        switch (res.result) {
            case 1:
                console.log(res.msg)
                ShopController.dispatch(ShopEvent.GET_DATA, res)//获取到数据后不做其他操作，将数据通过事件抛出至Event总线中
                break;
            case 0:
                console.log('加载失败')
                console.log(res.msg)
                break;
            default:
                break;
        }
    }
}
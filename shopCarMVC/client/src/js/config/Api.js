export default class Api {//接口配置类
    static URL = "http://127.0.0.1";
    static PORT = ":1024";
    static PATH = '/'
    static GET = "get";
    static POST = "post";
    static IMGPATH = Api.URL + Api.PORT + Api.PATH;
    static ServerApi = {
        getShopList: 'getShopList' //获取商品列表
    }
}
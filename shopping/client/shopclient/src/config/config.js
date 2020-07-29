export default class Config {
  static Agreement = "http://";
  static BaseUrl = "127.0.0.1";
  static ServerUrl = "";
  static ServerPort = ":1024";
  static Path = "/";
  static CryptoKey = "tokenkey"; //加密信息关键字
  static RequestPath =
    Config.Agreement + Config.BaseUrl + Config.ServerPort + Config.Path;
  static RequestTimeOut = 10 * 1000;
  static GetCodeTime = 60 * 1000;
  static ShopMaxCount = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  static ServerApi = {
    //接口名
    token: "user/checkToken",
    user: {
      userLogin: "user/userLogin",
      getMailCode: "user/getMailCode",
      updateUser: "user/updateUser",
      userReg: "user/userReg"
    },
    shop: {
      shopList: "shop/shopList"
    },
    order: {
      orderList: "order/orderList",
      addOrder: "order/addOrder",
      delOrder: "order/delOrder"
    }
  };
  static UploadName = {
    headPic: "upload/headPic"
  };
  static UploadKey = {
    headKey: "headPic"
  };
  static StorageName = {
    Token: "token",
    ShopCar: "shopCar",
    UserInfo: "userInfo"
  };
  static EventName = {
    SelectKind: "selectKind",
    ChangeCount: "changeCount",
    ShowPicker: "showPicker",
    CountShop: "countShop",
    SelectAllChild: "selectAllChild",
    SelectParent: "selectParent",
    IsLogin: "isLogin",
    UploadPic: "uploadPic"
  };
  static DefaultPageConfig = {
    shopType: "",
    picType: "",
    keyWord: "",
    page: 1,
    isactive: true,
    pageSize: "",
    totalPage: 1,
    orderId: "",
    sort: "1"
  };
}

export default class Config {
  static Agreement = "http://";
  static BaseUrl = "127.0.0.1";
  static ServerUrl = "";
  static ServerPort = ":1024";
  static Path = "/";
  static CryptoKey = "tokenkey"; //加密信息关键字
  static FilePath = this.Agreement + this.BaseUrl + this.ServerPort + this.Path;
  static ServerApi = {
    //接口名
    token: "checkToken",
    user: {
      userLogin: "user/userLogin",
      userList: "user/userList",
      addUser: "user/addUser",
      freezeUser: "user/freezeUser",
      delUser: "user/delUser",
      updateUser: "user/updateUser",
    },
    shop: {
      shopList: "shop/shopList",
      addShop: "shop/addShop",
      freezeShop: "shop/freezeShop",
      delShop: "shop/delShop",
      updateShop: "shop/updateShop",
    },
  };
  static UploadName = {
    headPic: "upload/headPic",
    shopPic: "upload/shopPic",
  };
  static UploadKey = {
    headKey: "headPic",
    shopKey: "shopPic",
  };
  static StorageName = {
    token: "token",
    userInfo: "userInfo",
  };
  static FormDefaultVal = {
    user: {
      sex: "man",
      userType: "user",
      mailurl: "@qq.com",
    },
    shop: {
      shopType: "0",
      picType: "0",
      shopNum: 100,
      shopPrice: 1,
      taste: "酸甜苦辣咸",
      address: "江西南昌",
      expiryDate: "180天",
    },
  };
}

export default class Config {
  static Agreement = "http://";
  static BaseUrl = "127.0.0.1";
  static ServerUrl = "";
  static ServerPort = ":1024";
  static Path = "/";
  static CryptoKey = "tokenkey";//加密信息关键字
  static FilePath = this.Agreement + this.BaseUrl + this.ServerPort + this.Path;
  static ServerApi = {//接口名
    token: "checkToken",
    user: {
      userLogin: "user/userLogin",
      userList: "user/userList",
      addUser: "user/addUser",
      freezeUser: "user/freezeUser",
      delUser: "user/delUser",
      updateUser: "user/updateUser"
    }
  };
  static UploadName = {
    headPic: "upload/headPic"
  };
  static UploadKey = {
    headKey: "headPic"
  };
  static StorageName = {
    token: "token",
    userInfo: "userInfo"
  };
}
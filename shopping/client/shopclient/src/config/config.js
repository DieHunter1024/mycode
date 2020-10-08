export default class Config {
  static Agreement = "http://"; //协议
  static BaseUrl = "127.0.0.1"; //请求ip或域名
  static ServerUrl = ""; //多级路径名
  static ServerPort = ":1024"; //端口
  static Path = "/"; //静态文件目录
  static CryptoKey = "tokenkey"; //加密信息关键字
  static RequestPath =
    Config.Agreement + Config.BaseUrl + Config.ServerPort + Config.Path; //服务端静态目录
  static RequestTimeOut = 10 * 1000; //请求超时时间
  static GetCodeTime = 60 * 1000; //邮箱验证码重发时间
  static CodeText = '获取验证码'; //邮箱验证码按钮文本
  static ShopMaxCount = [1, 2, 3, 4, 5, 6, 7, 8, 9]; //每件商品可购买数量（选择器配置）
  static ServerApi = {
    //接口名
    token: "user/checkToken", //验证token
    user: {
      userLogin: "user/userLogin", //用户登录
      getMailCode: "user/getMailCode", //获取验证码
      updateUser: "user/updateUser", //更新用户
      userReg: "user/userReg" //注册（移动端）
    },
    shop: {
      shopList: "shop/shopList" //获取商品列表
    },
    order: {
      orderList: "order/orderList", //获取订单列表
      addOrder: "order/addOrder", //新增订单
      delOrder: "order/delOrder", //删除订单
      updateOrder: "order/updateOrder" //更新订单状态
    }
  };
  static UploadName = {
    headPic: "upload/headPic" //图片路径
  };
  static UploadKey = {
    headKey: "headPic" //头像上传关键字
  };
  static StorageName = {
    //本地缓存
    Token: "token",
    ShopCar: "shopCar", //购物车列表
    UserInfo: "userInfo" //用户信息
  };
  static EventName = {
    //自定义事件
    SelectKind: "selectKind", //分类选择
    ChangeCount: "changeCount", //修改商品数量
    ShowPicker: "showPicker", //显示，隐藏Picker
    CountShop: "countShop", //购物车商品总价
    SelectAllChild: "selectAllChild", //全选子选项
    SelectParent: "selectParent", //全选父选项
    IsLogin: "isLogin", //登录成功
    UploadPic: "uploadPic" //上传图片
  };
  static DefaultPageConfig = {
    //默认分页配置
    shopType: "",
    picType: "",
    keyWord: "",
    page: 1,
    isactive: true,
    pageSize: "",
    totalPage: 1,
    orderId: "",
    sort: "1",
    orderState: ""
  };
}

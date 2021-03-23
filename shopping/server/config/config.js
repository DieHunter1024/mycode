module.exports = {
  Agreement: "http://", //协议
  DataBaseUrl: "127.0.0.1", //ip或域名
  DataBasePort: ":27017", //数据库端口
  DataBaseName: "shopping", //数据库文档名称
  ServerUrl: "",
  ServerPort: "2468", //服务端请求端口
  Path: "/", //路由名
  UserKey: "user", //用户token加密标识
  AdminKey: "admin", //管理员token加密标识
  CryptoKey: "tokenkey", //Crypto加密关键字，用于生成16进制秘钥
  EmailTransporter: {
    // service: "qq", // 运营商  qq邮箱 网易  若使用QQ邮箱，则只需配置service：qq
    host: "smtp.163.com",// 若使用网易邮箱，则只需配置host：smtp.163.com
    port: 465, //端口
    // secure: false,
    auth: {
      user: "13257912516@163.com", //发送方的邮箱
      pass: "WAQMAIFURPWQEFKB", // pop3 授权码
    },
  },
  EmailConfig: {
    time: 5,//验证码有效期，单位分钟
    codeLength: 4,//验证码长度
    sendTime: 1 * 60 * 1000,//后端验证码允许再次发送时间间隔，单位毫秒
    targetTime: 5 * 60 * 1000,//验证码有效期，单位毫秒
    title: "零食商贩",//验证码标题
  },
  Collections: {
    Users: {
      modelName: "users",
      data: {
        headPic: {
          //头像
          type: String,
          default: "public/assets/img/default.gif",
        },
        userType: {
          //用户类型（管理员/用户）
          type: String,
          required: true,
          default: "user",
        },
        phoneNum: {
          //手机号
          type: String,
          required: true,
          default: "暂无",
        },
        username: {
          //用户名
          type: String,
          required: true,
        },
        password: {
          //密码
          type: String,
          required: true,
        },
        sex: {
          //性别
          type: String,
          required: true,
          default: "man",
        },
        mailaddress: {
          //邮箱地址
          type: String,
          required: true,
        },
        mailurl: {
          //邮箱类型
          type: String,
          required: true,
        },
        alladdress: {
          //省市县
          type: Array,
          required: true,
          default: ["江西省", "南昌市", "青云谱区"],
        },
        address: {
          //具体地址
          type: String,
          default: "",
        },
        descript: {
          //个人说明
          type: String,
          required: true,
          default: "这个人啥也没写",
        },
        time: {
          //注册时间
          type: String,
          required: true,
        },
        isactive: {
          //是否冻结用户
          type: Boolean,
          default: true,
        },
      },
    },
    Shop: {
      modelName: "shops",
      data: {
        shopPic: {
          //商品图片
          type: String,
          required: true,
        },
        shopType: {
          //商品类型
          type: String,
          required: true,
        },
        picType: {
          //图片类型
          type: String,
          required: true,
        },
        shopName: {
          //商品名
          type: String,
          required: true,
        },
        shopNum: {
          //库存
          type: Number,
          required: true,
        },
        shopPrice: {
          //单价
          type: Number,
          required: true,
        },
        shopScale: {
          //净含量
          type: Number,
          required: true,
        },
        taste: {
          //口味
          type: String,
          required: false,
          default: "酸，甜，苦，辣",
        },
        address: {
          //产地
          type: String,
          required: false,
          default: "南昌市",
        },
        expiryDate: {
          //保质期
          type: String,
          required: false,
          default: "180天",
        },
        morePic: {
          //详情图片
          type: Array,
          required: false,
          default: [],
        },
        time: {
          //添加时间
          type: String,
          required: true,
        },
        isactive: {
          //是否激活商品
          type: Boolean,
          default: true,
        },
      },
    },
    Order: {
      modelName: "orders",
      data: {
        orderId: {
          // 订单号
          type: String,
          required: true,
        },
        username: {
          //用户名
          type: String,
          required: true,
        },
        phoneNum: {
          //手机号
          type: String,
          required: true,
        },
        address: {
          //具体地址
          type: String,
          required: true,
        },
        orderState: {
          //订单状态
          type: String,
          required: true,
        },
        orderPrice: {
          // 订单总价
          type: String,
          required: true,
        },
        shopList: {
          //商品列表
          type: Array,
          required: true,
        },
        orderTime: {
          //订单创建时间
          type: String,
          required: true,
        },
      },
    },
  },
  ServerApi: {
    //接口名称
    checkToken: "/checkToken", //验证token
    getMailCode: "/getMailCode", //获取验证码
    userLogin: "/userLogin", //用户登录
    userReg: "/userReg", //注册（移动端）
    addUser: "/addUser", //添加用户
    userList: "/userList", //获取用户列表
    freezeUser: "/freezeUser", //冻结用户
    delUser: "/delUser", //删除用户
    updateUser: "/updateUser", //更新用户
    addShop: "/addShop", //添加商品
    shopList: "/shopList", //获取商品列表
    freezeShop: "/freezeShop", //冻结商品
    delShop: "/delShop", //删除商品
    updateShop: "/updateShop", //更新商品
    addOrder: "/addOrder", //新增订单
    orderList: "/orderList", //获取订单列表
    delOrder: "/delOrder", //删除订单
    updateOrder: "/updateOrder", //更新订单状态
  },
};

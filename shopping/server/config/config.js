module.exports = {
  Agreement: "http://", //协议
  DataBaseUrl: "127.0.0.1", //ip或域名
  DataBasePort: ":27017", //数据库端口
  DataBaseName: "shopping", //数据库文档名称
  ServerUrl: "",
  ServerPort: ":1024", //服务端请求端口
  Path: "/", //路由名
  UserKey: "user", //用户token加密标识
  AdminKey: "admin", //管理员token加密标识
  CryptoKey: "tokenkey", //Crypto加密关键字，用于生成16进制秘钥
  Collections: {
    Users: {
      modelName: "users",
      data: {
        headPic: {
          //头像
          type: String,
          required: false,
          default: "public/assets/img/default.gif",
        },
        userType: {
          //用户类型（管理员/用户）
          type: String,
          required: true,
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
          required: false,
          default: [],
        },
        address: {
          //具体地址
          type: String,
          required: false,
          default: "",
        },
        descript: {
          //个人说明
          type: String,
          required: false,
          default: "",
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
  },
  ServerApi: {
    //接口名称
    checkToken: "/checkToken",//验证token
    userLogin: "/userLogin",//用户登录
    userReg: "/userReg",//注册（移动端）
    addUser: "/addUser",//添加用户
    userList: "/userList",//获取用户列表
    freezeUser: "/freezeUser",//冻结用户
    delUser: "/delUser",//删除用户
    updateUser: "/updateUser",//更新用户
  },
};

module.exports = {
  Agreement: "http://",
  DataBaseUrl: "127.0.0.1",
  DataBasePort: ":27017",
  DataBaseName: "shopping",
  ServerUrl: "",
  ServerPort: ":1024",
  Path: "/",
  UserKey: "user",
  AdminKey: "admin",
  CryptoKey: "tokenkey",
  Collections: {
    Users: {
      modelName: "users",
      data: {
        headPic: {
          type: String,
          required: false,
          default: "public/assets/img/default.gif"
        },
        userType: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true
        },
        sex: {
          type: String,
          required: true
        },
        mailaddress: {
          type: String,
          required: true
        },
        mailurl: {
          type: String,
          required: true
        },
        alladdress: {
          type: Array,
          required: false,
          default: []
        },
        address: {
          type: String,
          required: false,
          default: ''
        },
        descript: {
          type: String,
          required: false,
          default: ''
        },
        time: {
          type: String,
          required: true
        },
        isactive: {
          type: Boolean,
          default: true
        }
      }
    }
  },
  ServerApi: {
    checkToken: "/checkToken",
    userLogin: "/userLogin",
    userReg: "/userReg",
    addUser: "/addUser",
    userList: "/userList",
    freezeUser: "/freezeUser",
    delUser: "/delUser",
    updateUser: "/updateUser"
  }
};

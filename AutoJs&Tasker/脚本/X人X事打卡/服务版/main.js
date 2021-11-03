importPackage(Packages["okhttp3"]); //导入包
const wsUrl = "ws://192.168.202.35:1024/ws/?machineId=test";
var appName = "薪人薪事", //app名
  packageName = getPackageName(appName), //包名
  isLoginActivity = "com.client.xrxs.com.xrxsapp.activity.LoginActivity", //判断是否在登录界面
  cardViewBtn = () => id("ll_clock").findOne(), //打卡界面按钮
  cardTakeBtn = () => id("rl_my_clock_to_clock_in").findOne(), //打卡按钮
  userLoginBtn = () => id("tv_password_login").findOne(), //账号密码登录按钮
  cbAgreeCheck = () => id("cb_agree").findOne(), //同意选项
  userInput = () => id("et_phone").findOne(), //用户名输入框
  pwdInput = () => id("et_password").findOne(), //密码输入框
  submit = () => id("btn_login").findOne(), //登录按钮
  menuMine = () => id("rl_mine").findOne(), //我的
  menuSetting = () => id("iv_setting").findOne(), //设置
  userLogout = () => id("tv_logout").findOne(), //注销，登出
  okBtn = () => id("tv_confirm").findOne(), //确定按钮
  userName = "123", //用户名
  passWord = "123", //密码
  takeCard,
  commandSocket;
let timeTicker = setInterval(function () {
  // 防止主线程退出
}, 10000); //线程定时器
function CommandSocket() {
  toast("websocket");
  this.client = null;
  this.request = null;
  this.ws = null;
}

CommandSocket.prototype = {
  init(_wsUrl) {
    if (this.client) {
      this.client.dispatcher().cancelAll(); //清理一次
    }
    this.client = new OkHttpClient.Builder()
      .retryOnConnectionFailure(true)
      .build();
    this.request = new Request.Builder().url(_wsUrl || wsUrl).build();
    return this;
  },
  connect(_wsUrl) {
    if (!this.client) {
      this.init(_wsUrl || wsUrl);
    }
    this.ws = this.client.newWebSocket(
      this.request,
      new WebSocketListener({
        onOpen: this.onOpen.bind(this),
        onMessage: this.onMessage.bind(this),
        onClosing: this.onClosing.bind(this),
        onClosed: this.onClosed.bind(this),
        onFailure: this.onFailure.bind(this),
      })
    ); //创建链接
    return this;
  },
  onOpen: function (webSocket, response) {
    print("onOpen");
    this.sendWs({ msg: "连接成功", ModeCode: "Open" });
  },
  onMessage: function (webSocket, msg) {
    //msg可能是字符串，也可能是byte数组，取决于服务器送的内容
    print("msg");
    console.log("onMessage", msg);
    this.command(JSON.parse(msg));
  },
  onClosing: function (webSocket, code, response) {
    print("正在关闭");
  },
  onClosed: function (webSocket, code, response) {
    print("已关闭");
  },
  onFailure: function (webSocket, t, response) {
    print("错误");
    print(t);
  },
  closeWs() {
    this.ws && this.ws.cancel(); //清理一次
  },
  sendWs(msg) {
    this.ws &&
      this.ws.send(typeof msg === "string" ? msg : JSON.stringify(msg));
  },
  command(msg) {
    toast(msg.type);
    switch (msg.type) {
      case "login":
        console.log("获取用户名密码", msg);
        userName = msg.username;
        passWord = msg.password;
        break;
      case "open":
        console.log("打开App", msg);
        takeCard.startProgram();
        break;
      case "signIn":
        console.log("用户登录", msg);
        takeCard.startProgram().checkLogin()
          ? takeCard.login().exitApp()
          : takeCard.exitApp();
        break;
      case "signOut":
        console.log("退出登录", msg);
        takeCard.startProgram().checkLogin()
          ? takeCard.exitApp()
          : takeCard.signOut().exitApp();
        break;
      case "take":
        console.log("执行打卡", msg);
        (takeCard.startProgram().checkLogin()
          ? takeCard.login()
          : takeCard.openCardView()
        )
          .takeCard()
          .exitApp();
        break;
      case "exitApp":
        console.log("退出App", msg);
        takeCard.exitApp();
        break;
      case "exitJs":
        console.log("退出脚本", msg);
        takeCard.exitJs();
        break;
      default:
        break;
    }
  },
};
CommandSocket.prototype.constructor = CommandSocket;

function TakeCard() {}
TakeCard.prototype = {
  //开启应用
  startProgram() {
    toast("launchApp:" + appName);
    console.log("launchApp:" + appName, launchApp(appName)); //打开app
    waitForPackage(packageName); //等待app打开
    console.log("launchAppSuccess", packageName);
    toast("launchAppSuccess", packageName);
    sleep(3000); //等待首页加载
    return this;
  },
  //是否登录
  checkLogin() {
    return currentActivity() == isLoginActivity;
  },
  // 用户登录
  login() {
    // 等待界面组件加载
    id("tv_password_login").waitFor();
    console.log("userLoginBtn", userLoginBtn().click());
    id("cb_agree").waitFor();
    id("et_phone").waitFor();
    id("et_password").waitFor();
    if (!cbAgreeCheck().checked()) {
      //用户协议同意判断
      console.log("cbAgree", cbAgreeCheck().click());
    }
    console.log("userName", userInput().setText(userName));
    console.log("passWord", pwdInput().setText(passWord));
    console.log("submit", submit().click());
    return this;
  },
  //首页--->打卡页
  openCardView() {
    id("ll_clock").waitFor();
    toast("打卡界面按钮click");
    var cardButton = cardViewBtn();
    console.log("打卡界面按钮click", cardButton.click());
    return this;
  },
  //打卡
  takeCard() {
    id("rl_my_clock_to_clock_in").clickable().waitFor(); //等待定位成功
    console.log("打卡按钮click", cardTakeBtn().click());
    commandSocket.sendWs({ msg: "打卡成功", ModeCode: "Email" })
    return this;
  },
  signOut() {
    id("rl_mine").waitFor();
    console.log("我的按钮click", menuMine().click());
    console.log("设置按钮click", menuSetting().click());
    console.log("退出按钮click", userLogout().click());
    console.log("确定按钮click", okBtn().click());
    return this;
  },
  //退出程序
  exitApp() {
    console.log("back", back());
    if (currentPackage() == packageName) {
      //判断是否在应用内,如果在则再次返回
      sleep(200);
      this.exitApp();
      return this;
    }
  },
  exitJs() {
    console.log("关闭", exit());
  },
};
TakeCard.prototype.constructor = TakeCard;

takeCard = new TakeCard();
commandSocket = new CommandSocket().connect();

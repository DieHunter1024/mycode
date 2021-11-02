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
  userName = "123", //用户名
  passWord = "123"; //密码
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
    var json = { msg: "连接成功", ModeCode: "Open" };
    this.sendWs(json);
  },
  onMessage: function (webSocket, msg) {
    //msg可能是字符串，也可能是byte数组，取决于服务器送的内容
    print("msg");
    console.log("onMessage", msg);
    this.command(JSON.parse(msg));
    // takeCard.startProgram();
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
    this.ws && this.ws.close();
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
      case "take":
        console.log("执行打卡", msg);
        takeCard.startProgram();
        break;
      case "exitApp":
        console.log("退出程序", msg);
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
setInterval(() => {
  // 防止主线程退出
}, 1000);

function TakeCard() {}
TakeCard.prototype = {
  //开启应用
  startProgram() {
    toast("launchApp:" + appName);
    console.log("launchApp:" + appName, launchApp(appName)); //打开app
    waitForPackage(packageName); //等待app打开
    console.log("launchAppSuccess", packageName);
    toast("launchAppSuccess", packageName);
    sleep(1000); //等待首页加载
    this.checkLogin();
  },
  //是否登录
  checkLogin() {
    if (currentActivity() == isLoginActivity) {
      id("tv_password_login").waitFor();
      console.log("userLoginBtn", userLoginBtn().click());
      this.login();
      return;
    }
    this.openCardView();
  },
  // 用户登录
  login() {
    // 等待界面组件加载
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
    toast("submit");
    setTimeout(function () {
      if (id("tv_password_login").find().size() > 0) {
        this.login();
        return;
      }
    }, 1000);
    this.openCardView();
  },
  //首页--->打卡页
  openCardView() {
    id("ll_clock").waitFor();
    toast("打卡界面按钮click");
    var cardButton = cardViewBtn();
    console.log("打卡界面按钮click", cardButton.click());
    this.takeCard();
  },
  //打卡
  takeCard() {
    id("rl_my_clock_to_clock_in").clickable().waitFor(); //等待定位成功
    console.log("打卡按钮click", cardTakeBtn().click());
    this.exitApp();
  },
  //退出程序
  exitApp() {
    console.log("back", back());
    if (currentPackage() == packageName) {
      //判断是否在应用内,如果在则再次返回
      sleep(200);
      this.exitApp();
      return;
    }
    this.exitJs();
  },
  exitJs() {
    try {
      exit();
    } catch (e) {}
  },
};
TakeCard.prototype.constructor = TakeCard;

var takeCard = new TakeCard();
var commandSocket = new CommandSocket().connect();

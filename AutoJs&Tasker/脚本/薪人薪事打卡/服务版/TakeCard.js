var appName = "薪人薪事", //app名
  packageName = getPackageName(appName), //包名
  roundTimer = 20 * 1000, //定时器间隔60秒
  isLoginActivity = "com.client.xrxs.com.xrxsapp.activity.LoginActivity", //判断是否在登录界面
  cardViewBtn = () => id("ll_clock").findOne(), //打卡界面按钮
  cardTakeBtn = () => id("rl_my_clock_to_clock_in").findOne(), //打卡按钮
  userLoginBtn = () => id("tv_password_login").findOne(), //账号密码登录按钮
  cbAgreeCheck = () => id("cb_agree").findOne(), //同意选项
  userInput = () => id("et_phone").findOne(), //用户名输入框
  pwdInput = () => id("et_password").findOne(), //密码输入框
  submit = () => id("btn_login").findOne(); //登录按钮

const userName = "123", //用户名
  passWord = "123"; //密码
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
    this.checkLogin();
  },
  //是否登录
  checkLogin() {
    if (currentActivity() === isLoginActivity) {
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
    if (currentPackage() === packageName) {
      //判断是否在应用内,如果在则再次返回
      sleep(200);
      this.exitApp();
      return;
    }
    // 未设置自动计时时退出脚本
    if (!isAuto) {
      try {
        exit();
      } catch (e) {}
    }
  },
};
TakeCard.prototype.constructor = TakeCard;
module.exports = TakeCard;

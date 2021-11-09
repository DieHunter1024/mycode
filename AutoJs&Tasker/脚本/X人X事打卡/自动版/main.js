/*
 * @Author: Hunter
 * @Date: 2021-11-01 10:41:31
 * @LastEditTime: 2021-11-09 21:04:06
 * @LastEditors: your name
 * @Description:
 * @FilePath: \自动版\main.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
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
  passWord = "123", //密码
  mailApi = "https://api.emailjs.com/api/v1.0/email/send", //邮箱请求地址
  mailConfig = {
    user_id: "user_id",
    service_id: "service_id",
    template_id: "template_id",
    // template_params: {
    //   title: "自动打卡通知",
    //   content: "打卡成功",
    //   email: "123@qq.com",
    // },
  }; //邮箱配置
console.show(true);
console.log("发送邮件",sendEmail());
init();

function init() {
  startProgram();
}
//开启应用
function startProgram() {
  toast("launchApp:" + appName);
  console.log("launchApp:" + appName, launchApp(appName)); //打开app
  waitForPackage(packageName); //等待app打开
  console.log("launchAppSuccess", packageName);
  toast("launchAppSuccess", packageName);
  sleep(3000); //等待首页加载
  checkLogin();
}
//是否登录
function checkLogin() {
  if (currentActivity() === isLoginActivity) {
    id("tv_password_login").waitFor();
    console.log("userLoginBtn", userLoginBtn().click());
    login();
    return;
  }
  openCardView();
}
// 用户登录
function login() {
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
      login();
      return;
    }
  }, 1000);
  openCardView();
}
//首页--->打卡页
function openCardView() {
  id("ll_clock").waitFor();
  toast("打卡界面按钮click");
  var cardButton = cardViewBtn();
  console.log("打卡界面按钮click", cardButton.click());
  takeCard();
}
//打卡
function takeCard() {
  id("rl_my_clock_to_clock_in").clickable().waitFor(); //等待定位成功
  console.log(
    "发送邮件",
    sendEmail()
  );
  console.log("打卡按钮click", cardTakeBtn().click());
  exitApp();
}
//退出程序
function exitApp() {
  console.log("back", back());
  if (currentPackage() === packageName) {
    //判断是否在应用内,如果在则再次返回
    sleep(200);
    exitApp();
    return;
  }
  exit();
}
function sendEmail(params) {
  var res = http.post(mailApi, params || mailConfig, {
    contentType: "application/json",
  });
  return res
  // console.log("res", res.body.json());
}

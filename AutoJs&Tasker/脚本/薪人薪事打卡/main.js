/*
 * @Author: Hunter
 * @Date: 2021-10-09 15:44:31
 * @LastEditTime: 2021-10-12 12:09:21
 * @LastEditors: Hunter
 * @Description:
 * @FilePath: \薪人薪事打卡\main.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

var appName = "薪人薪事", //app名
  packageName = getPackageName(appName), //包名
  isAuto = false, // 自动打卡
  timer = null, // 时间标记
  roundTimer = 20 * 1000, //定时器间隔60秒
  cardViewBtn = () => id("ll_clock").findOne(), //打卡界面按钮
  cardTakeBtn = () => id("rl_my_clock_to_clock_in").findOne(), //打卡按钮
  userLoginBtn = () => id("tv_password_login").findOne(), //账号密码登录按钮
  cbAgreeCheck = () => id("cb_agree").findOne(), //同意选项
  userInput = () => id("et_phone").findOne(), //用户名输入框
  pwdInput = () => id("et_password").findOne(), //密码输入框
  submit = () => id("btn_login").findOne(); //登录按钮

const userName = "123", //用户名
  passWord = "123", //密码
  timeTick = {
    //上下班时间，建议获取法定节假日
    onWork: 0,
    offWork: 0,
  };

init();

function init() {
  if (isAuto) {
    //自动打卡
    !timer &&
      (timer = setInterval(() => {
        startProgram();
      }, roundTimer));
    return;
  }
  startProgram();
}
function startProgram() {
  toast("launchApp:" + appName);
  console.log("launchApp:" + appName, launchApp(appName)); //打开app
  waitForPackage(packageName); //等待app打开
  console.log("launchAppSuccess", packageName);
  toast("launchAppSuccess", packageName);
  sleep(1000); //等待首页加载
  checkLogin();
}
function checkLogin() {
  if (id("tv_password_login").find().size() > 0) {
    //通过打卡按钮判断是否登录
    console.log("userLogin", userLoginBtn().click());
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
  sleep(1000);
  if (!cbAgreeCheck().checked()) {
    //用户协议同意判断
    console.log("cbAgree", cbAgreeCheck().click());
  }
  sleep(1000);
  console.log("userName", userInput().setText(userName));
  sleep(1000);
  console.log("passWord", pwdInput().setText(passWord));
  sleep(1000);
  console.log("submit", submit().click());
  sleep(1000);
  toast("submit");
  setTimeout(function(){
  if (id("tv_password_login").find().size() > 0) {
    login();
    return;
  }
      },1000)
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
  // 未设置自动计时时退出脚本
  if (!isAuto) {
    try {
      exit();
    } catch (e) {}
  }
}

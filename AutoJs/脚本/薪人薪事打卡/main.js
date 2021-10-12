var appName = "薪人薪事", //app名
  packageName = getPackageName(appName), //包名
  cardViewBtn = () => id("ll_clock").findOne(), //打卡界面按钮
  cardTakeBtn = () => id("rl_my_clock_to_clock_in").findOne(), //打卡按钮
  userLoginBtn = () => id("tv_password_login").findOne(), //账号密码登录按钮
  cbAgreeCheck = () => id("cb_agree").findOne(), //同意选项
  userInput = () => id("et_phone").findOne(), //用户名输入框
  pwdInput = () => id("et_password").findOne(), //密码输入框
  submit = () => id("btn_login").findOne(), //登录按钮
  bus = events.emitter();
const userName = "123",
  passWord = "123";

init();

function init() {
  toast("launchApp:" + appName);
  console.log("launchApp:" + appName, launchApp(appName));
  waitForPackage(packageName);
  console.log("launchAppSuccess", packageName);
  toast("launchAppSuccess", packageName);
  sleep(200);
  checkLogin();
}
function checkLogin() {
  if (id("tv_password_login").find().size() > 0) {
    console.log("userLogin", userLoginBtn().click());
    login();
    return;
  }
  openCardView();
}
function login() {
  id("cb_agree").waitFor();
  id("et_phone").waitFor();
  id("et_password").waitFor();
  if (!cbAgreeCheck().checked()) {
    console.log("cbAgree", cbAgreeCheck().click());
  }
  console.log("userName", userInput().setText(userName));
  console.log("passWord", pwdInput().setText(passWord));
  console.log("submit", submit().click());
  toast("submit");
  openCardView();
}
function openCardView() {
  id("ll_clock").waitFor();
  toast("打卡界面按钮click");
  var cardButton = cardViewBtn();
  console.log("打卡界面按钮click", cardButton.click());
  takeCard();
}

function takeCard() {
  id("rl_my_clock_to_clock_in").clickable().waitFor();
  console.log("打卡按钮click", cardTakeBtn().click());
  exitApp();
}

function exitApp() {
  console.log("back", back());
  if (currentPackage() === packageName) {
    sleep(200);
    exitApp();
    return;
  }
}

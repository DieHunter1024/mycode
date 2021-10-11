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
const EventName = {
    TakeCard: "TakeCard", //打卡完成
    AppLoad: "AppLoad", //App加载完成
  },
  userName = "123",
  passWord = "123";

init();

function init() {
  regEvent();
  toast("launchApp:" + appName);
  console.log("launchApp:" + appName, launchApp(appName));
  waitForPackage(packageName);
  bus.emit(EventName.AppLoad);
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
  var cbAgree = cbAgreeCheck();
  if (!cbAgree.checked()) {
    console.log("cbAgree", cbAgree.click());
  }
  console.log("userName", userInput().setText(userName));
  console.log("passWord", pwdInput().setText(passWord));
  console.log("submit", submit().click());
  toast("submit");
  openCardView();
}
function openCardView() {
  toast("打卡界面按钮click");
  var cardButton = cardViewBtn();
  console.log("打卡界面按钮click", cardButton.click());
  exitApp();
}

function takeCard() {
  var takeCardButton;
  var timer = setInterval(function takeCardTick() {
    takeCardButton = cardTakeBtn();
    console.log("clickable", takeCardButton.clickable());
    if (takeCardButton.clickable()) {
      console.log("打卡按钮click", takeCardButton.click());
      bus.emit(EventName.TakeCard);
      clearInterval(timer);
    }
  }, 1000);
}

function exitApp() {
  var sh = new Shell(true);
  sh.exec("am force-stop" + " " + packageName);
  sleep(1000);
  sh.exit();
}

function regEvent() {
  bus.on(EventName.AppLoad, function () {
    console.log("launchAppSuccess", packageName);
    toast("launchAppSuccess", packageName);
    checkLogin();
  });
  bus.on(EventName.TakeCard, exitApp);
}

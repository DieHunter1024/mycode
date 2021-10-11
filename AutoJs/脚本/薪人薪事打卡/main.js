var appName = "薪人薪事", //app名
  packageName = getPackageName(appName), //包名
  cardViewBtn = "ll_clock", //打卡界面按钮
  cardTakeBtn = "rl_my_clock_to_clock_in", //打卡按钮
  userLoginBtn = "tv_password_login", //账号密码登录按钮
  cbAgreeCheck = "cb_agree", //同意选项
  userInput = "et_phone", //用户名输入框
  pwdInput = "id_home_content_spet_phone", //密码输入框
  events = events.emitter(),
const EventName = {
  TakeCard: "TakeCard", //打卡完成
  AppLoad: "AppLoad", //App加载完成
};

init();

function init() {
  regEvent();
  toast("launchApp:" + appName);
  console.log("launchApp:" + appName, launchApp(appName));
  waitForPackage(packageName);
  events.emit(EventName.AppLoad);
  // openCardView();
  // sleep(1000);
  // takeCard(exitApp);
}
function checkLogin() {
  var userLogin = id(userLoginBtn).findOne(),
    cbAgree = id(cbAgreeCheck).findOne();
  if (userLogin && cbAgree) {
    login(userLogin, cbAgree);
    return;
  }
  openCardView();

  // cbAgree && !cbAgree.checked() && console.log("cbAgree", cbAgree.click());
}
function login(userLogin, cbAgree) {
  console.log("userLogin", userLogin.click());
  var user = id(userInput).findOne(),
    pwd = id(pwdInput).findOne();
    user.setText('text')
}
function openCardView() {
  toast("打卡界面按钮click");
  var cardButton = id(cardViewBtn).findOne();
  console.log("打卡界面按钮click", cardButton.click());
}

function takeCard() {
  var takeCardButton;
  var timer = setInterval(function takeCardTick() {
    takeCardButton = id(cardTakeBtn).findOne();
    console.log("clickable", takeCardButton.clickable());
    if (takeCardButton.clickable()) {
      console.log("打卡按钮click", takeCardButton.click());
      events.emit(EventName.TakeCard);
      clearInterval(timer);
    }
  }, 1000);
}

function exitApp() {
  sleep(2000);
  toast("back");
  console.log("back", back());
  sleep(300);
  console.log("back", back());
  sleep(300);
  console.log("back", back());
  sleep(300);
  console.log("back", back());
}

function regEvent() {
  events.on(EventName.AppLoad, function () {
    console.log("launchAppSuccess", packageName);
    toast("launchAppSuccess", packageName);
    checkLogin();
    // openCardView();
  });
  events.on(EventName.TakeCard, exitApp);
}

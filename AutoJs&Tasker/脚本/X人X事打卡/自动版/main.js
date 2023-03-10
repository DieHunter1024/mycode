/*
 * @Author: Hunter
 * @Date: 2021-11-01 10:41:31
 * @LastEditTime: 2022-12-09 14:59:03
 * @LastEditors: Hunter
 * @Description:
 * @FilePath: \自动版\main.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
var appName = "薪人薪事", //app名
  packageName = getPackageName(appName), //包名
  roundTimer = 30 * 1000, //超时定时器间隔30秒
  randomTimer = parseInt(Math.random() * 10) * 60 * 1000, //随机定时器0-10分钟
  loginTimer = null, //登录界面轮询计时器
  loginTimerCount = 10, //登录界面轮询最大次数
  maxRetryCount = 3, //重试打卡次数
  isLoginActivity = "com.client.xrxs.com.xrxsapp.activity.LoginActivity", //判断是否在登录界面
  cardViewBtn = () => id("ll_clock").findOne(), //打卡界面按钮
  cardTakeBtn = () => id("rl_my_clock_to_clock_in").findOne(), //打卡按钮
  userLoginBtn = () => id("tv_password_login").findOne(), //账号密码登录按钮
  cbAgreeCheck = () => id("cb_agree").findOnce(), //同意选项
  userInput = () => id("et_phone").findOnce(), //用户名输入框
  pwdInput = () => id("et_password").findOnce(), //密码输入框
  submit = () => id("btn_login").findOnce(), //登录按钮
  earlyCardTakeBtn = () => id("tv_confirm").findOnce(); //早退打卡按钮

const userName = "13*********", //用户名||手机号
  passWord = "*********", //密码
  allowEarlyCard = true,//是否允许早退打卡
  mailApi = "https://api.emailjs.com/api/v1.0/email/send", //邮箱请求地址
  mailConfig = {
    user_id: "user*********",
    service_id: "service*********",
    template_id: "template_*********",
    accessToken: "8a*********9",
    template_params: {
      title: "自动打卡通知",
      content: "打卡成功",
      email: "3*********@qq.com",
    },
  }, //邮箱配置，需要去emailjs官网申请api，每月免费200次
  dateApi = "http://api.tianapi.com/jiejiari/index", //节假日接口
  dateConfig = {
    key: "9d*********",
    date: formatDate(new Date()),
  }; //在天行数据申请节假日api（每天免费查询100次）：https://www.tianapi.com/
console.show(true);
console.log("randomTimer", randomTimer);
checkDateIsWork(dateConfig, function (res) {
  if (res.newslist[0].isnotwork) {
    toast("今天是法定节假日，无需打卡");
    sendEmail(setNewMessage("今天是法定节假日，无需打卡"));
    exitApp(true);
    return;
  }
  exitApp(false);
  setTimeout(init, randomTimer);
});

function init() {
  if (!!maxRetryCount) {
    console.log("剩余重试次数" + maxRetryCount);
    timeOutMsg();
    maxRetryCount--;
    startProgram();
    return;
  }
  exitApp(true);
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
    !loginTimer && (loginTimer = setInterval(login, 1000));
    return;
  }
  openCardView();
}
// 用户登录
function login() {
  clearLoginTimer();
  if (!cbAgreeCheck() || !cbAgreeCheck().checked()) {
    //用户协议同意判断
    console.log("cbAgree", cbAgreeCheck() && cbAgreeCheck().click());
    return;
  }
  userInput() && console.log("userName", userInput().setText(userName));
  pwdInput() && console.log("passWord", pwdInput().setText(passWord));
  if (submit().enabled && submit().click()) {
    loginTimerCount = 0;
    clearLoginTimer();
    console.log("submit");
    toast("submit");
    openCardView();
  }
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
  if (cardTakeBtn().click()) {
    // 查询早退卡弹窗按钮
    allowEarlyCard && earlyCardTakeBtn().click();
    sendSuccEmail();
  }
}
// 打卡成功发邮件
function sendSuccEmail() {
  toast("发送邮件");
  console.log("发送邮件", sendEmail());
  exitApp(true);
}
//退出程序
function exitApp(exitJs, fn) {
  shell("am force-stop " + packageName, true);
  fn && fn();
  exitJs && exit();
}

// 程序超时处理
function timeOutMsg() {
  threads.start(function () {
    //在新线程执行的代码
    setTimeout(function () {
      toast("打卡超时，正在重试");
      sendEmail(setNewMessage("自动打卡超时，正在重试"));
      exitApp(false, init);
    }, roundTimer);
  });
}
// 发送邮件api
function sendEmail(params) {
  var res = http.post(mailApi, params || mailConfig, {
    contentType: "application/json",
  });
  return res;
}
// 节假日api请求
function checkDateIsWork(params, fn) {
  var res = http.post(dateApi, params || dateConfig).body.json();
  if (res.code === 200) {
    fn(res);
    return;
  }
  sendEmail(setNewMessage(res.msg));
}
// 修改默认邮件提示信息
function setNewMessage(msg) {
  var _mailConfig = simpleCloneObj(mailConfig, {
    contentType: "application/json",
  });
  _mailConfig.template_params.content = msg + new Date();
  return _mailConfig;
}

//日期格式转换 YYYY-MM-DD
function formatDate(date) {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date.getDate();
  d = d < 10 ? "0" + d : d;
  return y + "-" + m + "-" + d;
}

// 简单的深复制
function simpleCloneObj(target) {
  return typeof target === "object" && JSON.parse(JSON.stringify(target));
}
const _loginTimerCount = loginTimerCount;
function clearLoginTimer() {
  if (!loginTimerCount--) {
    clearInterval(loginTimer);
    loginTimer = null;
    loginTimerCount = _loginTimerCount;
  }
}

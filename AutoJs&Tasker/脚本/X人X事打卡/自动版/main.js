/*
 * @Author: Hunter
 * @Date: 2021-11-01 10:41:31
 * @LastEditTime: 2021-11-15 14:28:31
 * @LastEditors: Hunter
 * @Description:
 * @FilePath: \自动版\main.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
var appName = "薪人薪事", //app名
  packageName = getPackageName(appName), //包名
  roundTimer = 20 * 1000, //超时定时器间隔20秒
  randomTimer = parseInt(Math.random() * 10) * 30 * 1000, //随机定时器0-5分钟
  maxRetryCount = 3, //重试打卡次数
  isLoginActivity = "com.client.xrxs.com.xrxsapp.activity.LoginActivity", //判断是否在登录界面
  cardViewBtn = () => id("ll_clock").findOne(), //打卡界面按钮
  cardTakeBtn = () => id("rl_my_clock_to_clock_in").findOne(), //打卡按钮
  userLoginBtn = () => id("tv_password_login").findOne(), //账号密码登录按钮
  cbAgreeCheck = () => id("cb_agree").findOne(), //同意选项
  userInput = () => id("et_phone").findOne(), //用户名输入框
  pwdInput = () => id("et_password").findOne(), //密码输入框
  submit = () => id("btn_login").findOne(); //登录按钮

const userName = "13212345678", //用户名||手机号
  passWord = "123123123", //密码
  mailApi = "https://api.emailjs.com/api/v1.0/email/send", //邮箱请求地址
  mailConfig = {
    user_id: "user_id",
    service_id: "service_id",
    template_id: "template_id",
    accessToken: "8a73dxxxxxxxxxxxxxxxxxxbd99",
    template_params: {
      title: "自动打卡通知",
      content: "打卡成功",
      email: "example@qq.com",
    },
  }, //邮箱配置，需要去emailjs官网申请api，每月免费200次
  dateApi = "http://api.tianapi.com/jiejiari/index", //节假日接口
  dateConfig = {
    key: "9daxxxxxxxxxxxxxxxxxxxx1b93",
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
  setTimeout(init, randomTimer);
});

function init() {
  exitApp(false);
  if (!!maxRetryCount) {
    console.log("剩余重试次数" + maxRetryCount);
    timeOutMsg();
    maxRetryCount--;
  }
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
  if (cardTakeBtn().click()) {
    toast("发送邮件");
    console.log("发送邮件", sendEmail());
    exitApp(true);
  }
}
//退出程序
function exitApp(exitJs, fn) {
  shell("am force-stop " + packageName, true);
  threads.shutDownAll();
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
      init()
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
  console.log(res.msg);
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

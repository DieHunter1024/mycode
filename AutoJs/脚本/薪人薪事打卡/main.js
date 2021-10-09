var packageName = "薪人薪事", //包名
  cardViewBtn = "ll_clock", //打卡界面按钮
  cardTakeBtn = "rl_my_clock_to_clock_in"; //打卡按钮
init();

function init() {
  toast("launchApp:" + packageName);
  console.log("launchApp:" + packageName, launchApp(packageName));
  sleep(1000);
  openCardView();
  sleep(1000);
  takeCard(exitApp);
}

function openCardView() {
  toast("打卡界面按钮click");
  var cardButton = id(cardViewBtn).findOne();
  console.log("打卡界面按钮click", cardButton.click());
}

function takeCard(fn) {
  var takeCardButton;
  var timer = setInterval(function takeCardTick() {
    takeCardButton = id(cardTakeBtn).findOne();
    console.log("clickable", takeCardButton.clickable());
    if (takeCardButton.clickable()) {
      console.log("打卡按钮click", takeCardButton.click());
      sleep(2000);
      fn();
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

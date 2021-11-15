// 自启tasker，防止开机被kill
var appName = "Tasker", //app名
  packageName = getPackageName(appName); //包名
startProgram();
//开启应用
function startProgram() {
  toast("launchApp:" + appName);
  console.log("launchApp:" + appName, launchApp(appName)); //打开app
  waitForPackage(packageName); //等待app打开
  console.log("launchAppSuccess", packageName);
  toast("launchAppSuccess", packageName);
  exit();
}

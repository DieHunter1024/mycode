const appName = "Tasker",
  getSearchBtn = () => desc("搜索 Tasker"), //搜索按钮，desc文本查找控件
  getSearchInput = () => id("filter_text"), //输入框
  startSearchBtn = () => id("search"), //开始查询按钮
  str = "打卡";
console.log("launchApp:" + appName, launchApp(appName)); //打开Tasker app
console.log("getSearchBtn", getElem(getSearchBtn()).click()); //点击搜索按钮
console.log("getSearchInput", getElem(getSearchInput()).setText(str)); //输入关键字
console.log("startSearchBtn", getElem(startSearchBtn()).click()); //点击开始搜索按钮
function getElem(ele) {
  return ele.findOne();
}

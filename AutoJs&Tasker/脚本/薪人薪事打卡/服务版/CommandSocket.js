importPackage(Packages["okhttp3"]); //导入包
const wsUrl = "ws://192.168.202.35:1024/ws/?name=test";
function CommandSocket(takeCard) {
  toast("websocket");
  this.client = null;
  this.request = null;
  this.ws = null;
  this.takeCard = takeCard
}

CommandSocket.prototype = {
  init(_wsUrl) {
    if (this.client) {
      this.client.dispatcher().cancelAll(); //清理一次
    }
    this.client = new OkHttpClient.Builder()
      .retryOnConnectionFailure(true)
      .build();
    this.request = new Request.Builder().url(_wsUrl || wsUrl).build();
    return this;
  },
  connect(_wsUrl) {
    if (!this.client) {
      this.init(_wsUrl || wsUrl);
    }
    this.ws = this.client.newWebSocket(
      this.request,
      new WebSocketListener({
        onOpen: this.onOpen.bind(this),
        onMessage: this.onMessage.bind(this),
        onClosing: this.onClosing.bind(this),
        onClosed: this.onClosed.bind(this),
        onFailure: this.onFailure.bind(this),
      })
    ); //创建链接
    return this;
  },
  onOpen: function (webSocket, response) {
    print("onOpen");
    var json = { name: 111 };
    this.sendWs(json);
  },
  onMessage: function (webSocket, msg) {
    //msg可能是字符串，也可能是byte数组，取决于服务器送的内容
    print("msg");
    this.takeCard.startProgram()
    print(msg);
  },
  onClosing: function (webSocket, code, response) {
    print("正在关闭");
  },
  onClosed: function (webSocket, code, response) {
    print("已关闭");
  },
  onFailure: function (webSocket, t, response) {
    print("错误");
    print(t);
  },
  closeWs() {
    this.ws && this.ws.close();
  },
  sendWs(msg) {
    this.ws &&
      this.ws.send(typeof msg === "string" ? msg : JSON.stringify(msg));
  },
};
CommandSocket.prototype.constructor = CommandSocket;
module.exports = CommandSocket;
setInterval(() => {
  // 防止主线程退出
}, 10000);

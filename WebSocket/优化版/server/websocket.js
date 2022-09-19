const WebSocket = require("ws");
const clientKey = "name"; //客户端标识符
exports.WebSocketServer = class extends WebSocket.Server {
  constructor(_, opts) {
    super(...arguments);
    this.clientKey = opts.clientKey ?? clientKey;
    this.webSocketClient = {}; //存放已连接的客户端
  }

  set ws(val) {
    //代理当前的ws，赋值时将其初始化
    this._ws = val;
    val.on("error", this.errorHandler);
    val.on("close", this.closeHandler);
    val.on("message", this.messageHandler);
  }

  get ws() {
    return this._ws;
  }

  messageHandler = (e) => {
    console.info("接收客户端消息");
    const data = JSON.parse(e);
    switch (data.ModeCode) {
      case "message":
        console.log(`收到${this.ws[this.clientKey]}消息${data.msg},已返回`);
        this.send(this.ws, data);
        break;
      case "heart_beat":
        console.log(`收到${this.ws[this.clientKey]}心跳${data.msg}`);
        this.send(this.ws, data);
        break;
    }
  };
  send = (ws, data) => {
    ws.send(JSON.stringify(data));
  };
  errorHandler = (e) => {
    this.removeClient(this.ws);
    console.info("客户端出错");
  };

  closeHandler = (e) => {
    this.removeClient(this.ws);
    console.info("客户端已断开");
  };

  addClient = (item) => {
    //设备上线时添加到客户端列表
    if (this.webSocketClient[item[this.clientKey]]) {
      console.log(item[this.clientKey] + "客户端已存在");
      this.webSocketClient[item[this.clientKey]].close();
    }
    console.log(item[this.clientKey] + "客户端已添加");
    this.webSocketClient[item[this.clientKey]] = item;
  };

  removeClient = (item) => {
    //设备断线时从客户端列表删除
    if (!this.webSocketClient[item[this.clientKey]]) {
      console.log(item[this.clientKey] + "客户端不存在");
      return;
    }
    console.log(item[this.clientKey] + "客户端已移除");
    this.webSocketClient[item[this.clientKey]] = null;
  };
};

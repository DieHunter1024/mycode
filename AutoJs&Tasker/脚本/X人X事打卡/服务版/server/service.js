const { webSocketServer } = require("./src/socketServer.js");
const { apiServer } = require("./src/apiServer.js");
const { EventBus } = require("./src/utils");
EventBus.onEvent("login", (e) => {
  const { res, data } = e;
  const clientItem = webSocketServer.webSocketClient[data["machineId"]];
  if (clientItem) {
    clientItem.send(JSON.stringify(data));
    sendResMsg({ res });
    return;
  }
  sendResMsg({ res, state: 0, msg: "设备未在线" });
});

function sendResMsg({ res, state = 1, msg = "发送成功", data = {} }) {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write(JSON.stringify({ state, msg, data }));
  res.end();
}

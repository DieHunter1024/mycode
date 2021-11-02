const { webSocketServer } = require("./src/socketServer.js");
const { apiServer } = require("./src/apiServer.js");
const { EventBus, sendResMsg } = require("./src/utils");
EventBus.onEvent("@command", (e) => {
  const { res, data } = e;
  const clientItem = webSocketServer.webSocketClient[data["machineId"]];
  if (!clientItem) {
    sendResMsg({ res, state: 0, msg: "设备未在线" });
    return;
  }
  clientItem.send(JSON.stringify(data));
  sendResMsg({ res });
});

const { webSocketServer } = require("./socketServer.js");
const { apiServer } = require("./apiServer.js");
const { EventBus } = require("./utils");
// webSocketServer.sendMsg({ name: "111" });
EventBus.onEvent("login", (e) => {
  const { res, data } = e;
  const clientItem = webSocketServer.webSocketClient[data["phone"]];
  if (clientItem) {
    clientItem.send(JSON.stringify(data));
  }
  res.write(JSON.stringify({ result: 1 }));
  res.end();
});

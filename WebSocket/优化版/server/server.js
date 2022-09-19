const http = require("http");
const WebSocketServer = require("./websocket").WebSocketServer;
const port = 2048; //端口
const pathname = "/ws/"; //访问路径
const server = http.createServer();
const clientKey = "name"; //客户端标识符

const webSocketServer = new WebSocketServer(
  { noServer: true },
  {
    clientKey,
  }
);
const initSocket = ({ name, req, socket, head }) => {
  webSocketServer.handleUpgrade(req, socket, head, (ws) => {
    ws[clientKey] = name; //添加索引，方便在客户端列表查询某个socket连接
    webSocketServer.addClient(ws);
    webSocketServer.ws = ws;
  });
};
server
  .on("upgrade", (req, socket, head) => {
    //通过http.server过滤数据
    const url = new URL(req.url, `http://${req.headers.host}`);
    const name = url.searchParams.get(clientKey); //获取连接标识
    if (!checkUrl(url.pathname, pathname)) {
      //未按标准
      socket.write("路由未按标准访问");
      socket.pipe(socket);
      return;
    }
    initSocket({ name, req, socket, head });
  })
  .listen(port, () => {
    console.log("服务开启");
  });

//验证url标准
function checkUrl(url, key) {
  //判断url是否包含key
  return url.includes(key);
}

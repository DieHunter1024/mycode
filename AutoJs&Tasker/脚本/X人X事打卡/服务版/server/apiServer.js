const http = require("http");
const fs = require("fs");
const { EventBus } = require("./utils");
let server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //设置响应头解决跨域
  let url = new URL(req.url, `http://${req.headers.host}`); //解析请求的地址
  let data = urlSplit(url.href); //获取参数
  if (req.url.indexOf("/public/") !== -1) {
    console.log("获取静态文件");
    readFile("./server" + req.url).then((data) => {
      console.log(req.url);
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write(data, "binary");
      res.end();
    });
  } else {
    switch (url.pathname) {
      case "/userLogin":
        console.log("登录", data);
        EventBus.emitEvent("login", { data, res });
        // res.write(JSON.stringify({ result: 1 }));
        // res.end();
        break;
      default:
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write("not find");
        res.end();
        break;
    }
  }
});

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "binary", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

//拆分url变成对象
function urlSplit(url) {
  if (url.indexOf("?") === -1) {
    return {};
  }
  let list = url.split("?")[1].split("&");
  let len = list.length;
  let obj = {};
  for (let i = 0; i < len; i++) {
    let key = list[i].split("=")[0];
    obj[key] = list[i].split("=")[1];
  }
  return obj;
}

server.listen(2048, () => {
  console.log("Api服务开启！");
});
exports.apiServer = server;

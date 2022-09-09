const http = require("http");
const fs = require("fs");
const picList = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
let server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //设置响应头解决跨域
  let url = new URL(req.url, `http://${req.headers.host}`); //解析请求的地址
  let data = urlSplit(url.href); //获取参数
  if (req.url.indexOf("/static/") !== -1) {
    console.log("获取静态文件");
    readFile("." + req.url).then((data) => {
      res.write(data, "binary");
      res.end();
    });
  } else {
    switch (url.pathname) {
      case "/getList":
        console.log("获取列表");
        res.write(
          JSON.stringify(["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"])
        );
        res.end();
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

function random(count) {
  return Math.floor(Math.random() * count);
}

function createPicList(len) {
  let _list = [];
  for (let i = 0; i < len; i++) {
    _list.push(picList[random(picList.length)]);
  }
  return _list;
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

server.listen(1024, () => {
  console.log("服务开启！");
});

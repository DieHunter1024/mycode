const express = require("express");
const app = express();
const config = require("./config/config")
const routes = require("./routes/routes");
const cors = require("cors"); //引入cors模块（解决跨域问题）
const path = require("path");
app.use(cors());
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type"); //允许的header类型
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS"); //跨域允许的请求方式
  next(); //是否继续向下执行
});
let bodyParser = require("body-parser"); //post传输数据类型
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "./public")));//静态目录
new routes(app);//初始化路由

app.listen(config.ServerPort, () => {
  console.log("Server Start~");
});

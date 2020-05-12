const user = require("../src/controller/user/user");
const shop = require("../src/controller/shopList/shop")
const upload = require("../src/controller/upload/upload");
const Util = require("../utils/utils");
const Config = require("../config/config");
module.exports = class Route {
  constructor(app) {
    app.use("/user", user);
    app.use("/shop", shop);
    app.use("/upload", upload);
  }
};

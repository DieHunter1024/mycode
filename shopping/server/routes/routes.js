const user = require("../src/controller/user/user");
const shop = require("../src/controller/shopList/shop")
const order = require('../src/controller/order/order')
const upload = require("../src/controller/upload/upload");
module.exports = class Route {
  constructor(app) {
    app.use("/user", user);
    app.use("/shop", shop);
    app.use("/order", order);
    app.use("/upload", upload);
  }
};

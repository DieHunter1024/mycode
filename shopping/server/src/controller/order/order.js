const router = require("express").Router();
const UserMod = require("../user/mod");
const ShopMod = require("../shopList/mod");
const Mod = require("./mod");
const Util = require("../../../utils/utils");
const Config = require("../../../config/config");
const Bussiness = require("../../bussiness/bussiness");
const { addData, updateData, findData } = require("../../command/command");
router.post(Config.ServerApi.addOrder, Util.checkToken, async (req, res) => {
  let userFindRes = await Bussiness.hasUser(req, res, UserMod);
  if (!userFindRes) {
    return;
  }
  let shopFindRes = await findData(ShopMod, {
    shopName: {
      $in: res._data.shopList.map((item) => {
        return item.shopName;
      }),
    },
  });
  if (
    !shopFindRes ||
    !shopFindRes.length ||
    shopFindRes.length != res._data.shopList.length
  ) {
    res.send({
      result: 0,
      msg: "有商品不存在",
    });
    return;
  }
  shopFindRes.forEach((item, index) => {
    item.shopNum = res._data.shopList[index].shopNum;
  });
  res._data.username = userFindRes[0].username;
  res._data.orderId = Util.createOrderNo();
  res._data.shopList = shopFindRes;
  res._data.orderTime = Util.joinDate();
  let addRes = await addData(Mod, res._data);
  if (!addRes || !addRes.length) {
    res.send({
      result: 0,
      msg: "添加失败",
    });
    return;
  }
  res.send({
    result: 1,
    msg: "添加成功",
  });
});
router.get(Config.ServerApi.orderList, Util.checkToken, async (req, res) => {
  if (!Bussiness.isAdmin(res)) {
    return;
  }
  Bussiness.findInfo(
    req,
    res,
    Mod,
    {
      orderTime: res._data.sort,
    },
    {
      username: new RegExp(res._data.keyWord, "i"),
      orderState: new RegExp(res._data.orderState, "i"),
    }
  );
});
router.get(Config.ServerApi.delOrder, Util.checkToken, async (req, res) => {
  if (!Bussiness.isAdmin(res)) {
    return;
  }
  Bussiness.delInfo(req, res, Mod);
});
router.post(Config.ServerApi.updateOrder, Util.checkToken, async (req, res) => {
  if (!Bussiness.isAdmin(res)) {
    return;
  }
  let updateRes = await updateData(Mod, res._data._id, res._data);
  if (updateRes) {
    res.send({
      result: 1,
      msg: "修改成功",
    });
    return;
  }
  res.send({
    result: 0,
    msg: "修改失败",
  });
});
module.exports = router;

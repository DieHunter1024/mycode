const router = require("express").Router();
const UserMod = require("../user/mod");
const ShopMod = require("../shopList/mod");
const Mod = require("./mod");
const Util = require("../../../utils/utils");
const Config = require("../../../config/config");
const Bussiness = require("../../bussiness/bussiness");
const { addData, updateData, findData } = require("../../command/command");
router.post(Config.ServerApi.addOrder, Util.checkToken, async (req, res) => {
  if (await Bussiness.hasUser(req, res, UserMod)) {
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
      orderId: new RegExp(res._data.keyWord, "i"),
    }
  );
});
router.get(Config.ServerApi.delOrder, Util.checkToken, async (req, res) => {
  if (!Bussiness.isAdmin(res)) {
    return;
  }
  Bussiness.delInfo(req, res, Mod);
});
module.exports = router;

const router = require("express").Router();
const Mod = require("./mod");
const Util = require("../../../utils/utils");
const Config = require("../../../config/config");
const Bussiness = require("../../bussiness/bussiness");
const {
  addData,
  updateData,
  findData,
} = require("../../command/command");

router.post(Config.ServerApi.addShop, Util.checkToken, async (req, res) => {
  if (!Bussiness.isAdmin(res)) {
    return;
  }
  if (res._data.shopPic) {
    res._data.shopPic = Util.readPicFile(res._data.shopPic || "") || "";
  }
  let findRes = await findData(Mod, {
    shopName: res._data.shopName,
  });
  if (findRes && findRes.length > 0) {
    res.send({
      result: 0,
      msg: "添加失败,商品已存在",
    });
    Util.delPicFile(res._data.shopPic);
    return;
  }
  res._data.time = Util.joinDate(); //添加时间
  res._data.isactive = true;
  let addRes = await addData(Mod, res._data);
  if (addRes) {
    res.send({
      result: 1,
      msg: "添加成功",
    });
    return;
  }
  Util.delPicFile(res._data.shopPic);
  res.send({
    result: 0,
    msg: "添加失败",
  });
});
router.get(Config.ServerApi.shopList, async (req, res) => {
  res._data = Util.getCrypto(Util.parseUrl(req, res).crypto);
  let _info = {
    shopType: new RegExp(res._data.shopType, "i"),
    picType: new RegExp(res._data.picType, "i"),
    shopName: new RegExp(res._data.keyWord, "i"),
  }
  if (res._data.isactive) {
    _info.isactive = res._data.isactive
  }
  Bussiness.findInfo(
    req,
    res,
    Mod, {
      picType: res._data.sort,
    },
    _info
  );
});
router.get(Config.ServerApi.freezeShop, Util.checkToken, async (req, res) => {
  if (!Bussiness.isAdmin(res)) {
    return;
  }
  Bussiness.freezeInfo(req, res, Mod);
});
router.get(Config.ServerApi.delShop, Util.checkToken, async (req, res) => {
  if (!Bussiness.isAdmin(res)) {
    return;
  }
  Bussiness.delInfo(req, res, Mod, "shopPic");
});
router.post(Config.ServerApi.updateShop, Util.checkToken, async (req, res) => {
  if (!Bussiness.isAdmin(res)) {
    return;
  }
  if (!res._data.shopPic || !res._data.shopPic.length) {
    //这里判断是否是修改头像，若是新增，则是上传相关的头像信息，是个object类型，length属性不存在
    let findRes = await findData(Mod, {
      _id: res._data._id,
    });
    Util.delPicFile(findRes[0].shopPic);
    res._data.shopPic = Util.readPicFile(res._data.shopPic || "");
  }
  let updateRes = await updateData(Mod, res._data._id, res._data);
  if (updateRes) {
    res.send({
      result: 1,
      msg: "修改成功",
    });
    return;
  }
  Util.delPicFile(res._data.headPic);
  res.send({
    result: 0,
    msg: "修改失败",
  });
});

module.exports = router;
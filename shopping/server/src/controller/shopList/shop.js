const router = require("express").Router();
const Mod = require("./mod");
const Util = require("../../../utils/utils");
const Config = require("../../../config/config");
const {
  addData,
  delData,
  updateData,
  findData,
  findByPage,
  getTotalPage,
} = require("../../command/command");

router.post(Config.ServerApi.addShop, Util.checkToken, async (req, res) => {
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
router.get(Config.ServerApi.shopList, Util.checkToken, async (req, res) => {
  if (res._data.userTokenType != "admin") {
    //非管理员
    res.send({
      result: -999,
      msg: "请用管理员账号登录",
    });
    return;
  }
  let total = await getTotalPage(Mod, res._data.pageSize);
  res.send({
    result: 1,
    data: {
      page: res._data.page,
      pageSize: res._data.pageSize,
      totalPage: total.totalPage,
      allNum: total.allNum,
      list: await findByPage(
        Mod,
        {
          shopType: res._data.sort,
        },
        res._data.page,
        res._data.pageSize,
        {
          shopType: new RegExp(res._data.shopType, "i"),
          picType: new RegExp(res._data.picType, "i"),
          shopName: new RegExp(res._data.keyWord, "i"),
        }
      ),
    },
    msg: "查找成功",
  });
});
router.get(Config.ServerApi.freezeUser, Util.checkToken, async (req, res) => {
  if (res._data.userTokenType != "admin") {
    //非管理员
    res.send({
      result: -999,
      msg: "请用管理员账号登录",
    });
    return;
  }
  let freezeRes = await updateData(Mod, res._data._id, {
    isactive: res._data.isactive,
  });
  if (freezeRes) {
    res.send({
      result: 1,
      msg: res._data.isactive ? "激活成功" : "冻结成功",
    });
    return;
  }
  res.send({
    result: 0,
    msg: res._data.isactive ? "激活失败" : "冻结失败",
  });
});
router.get(Config.ServerApi.delUser, Util.checkToken, async (req, res) => {
  if (res._data.userTokenType != "admin") {
    //非管理员
    res.send({
      result: -999,
      msg: "请用管理员账号登录",
    });
    return;
  }
  if (
    res._data.headPic &&
    res._data.headPic.length > 0 &&
    res._data.headPic != "public/assets/img/default.gif"
  ) {
    Util.delPicFile(res._data.headPic);
  }
  deleteRes = await delData(Mod, res._data._id);
  if (deleteRes) {
    res.send({
      result: 1,
      msg: "删除成功",
    });
    return;
  }
  res.send({
    result: 0,
    msg: "删除失败",
  });
});
router.post(Config.ServerApi.updateUser, Util.checkToken, async (req, res) => {
  if (!res._data.headPic || !res._data.headPic.length) {
    //这里判断是否是修改头像，若是新增，则是上传相关的头像信息，是个object类型，length属性不存在
    let findRes = await findData(Mod, {
      _id: res._data._id,
    });
    if (findRes[0].headPic != "public/assets/img/default.gif") {
      Util.delPicFile(findRes[0].headPic);
    }
    if (res._data.headPic) {
      res._data.headPic = Util.readPicFile(res._data.headPic || "");
    } else {
      res._data.headPic = "public/assets/img/default.gif";
    }
  }
  res._data.password = Util.createBcrypt(res._data.password); //密码盐加密
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

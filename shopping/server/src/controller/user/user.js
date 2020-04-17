const router = require("express").Router();
const Mod = require("./mod");
const Util = require("../../../utils/utils");
const Config = require("../../../config/config");
const Bussiness = require("../../bussiness/bussiness");
const {
  addData,
  delData,
  updateData,
  findData,
  findByPage,
  getTotalPage,
} = require("../../command/command");
router.get(Config.ServerApi.userLogin, async (req, res) => {
  let _data = Util.getCrypto(Util.parseUrl(req, res).crypto);
  let findRes = await findData(Mod, {
    $or: [
      {
        email: _data.username,
      },
      {
        username: _data.username,
      },
    ],
  });
  if (findRes && findRes.length > 0) {
    Util.checkBcrypt(_data.password, findRes[0].password)
      ? res.send({
          result: 1,
          token: Util.createToken(
            findRes[0].userType,
            findRes[0].username,
            _data.remember
          ),
          msg: "登录成功",
        })
      : res.send({
          result: 0,
          msg: "密码错误",
        });
    return;
  }
  res.send({
    result: 0,
    msg: "用户不存在",
  });
});
router.post(Config.ServerApi.addUser, Util.checkToken, async (req, res) => {
  if (res._data.headPic) {
    res._data.headPic = Util.readPicFile(res._data.headPic || "") || "";
  }
  let findRes = await findData(Mod, {
    $or: [
      {
        mailaddress: res._data.mailaddress,
        mailurl: res._data.mailurl,
      },
      {
        username: res._data.username,
      },
      {
        mailaddress: res._data.username,
      },
      {
        username: res._data.mailaddress + res._data.mailurl,
      },
    ],
  });
  if (findRes && findRes.length > 0) {
    res.send({
      result: 0,
      msg: "添加失败,用户已存在",
    });
    Util.delPicFile(res._data.headPic);
    return;
  }
  res._data.time = Util.joinDate(); //添加时间
  res._data.password = Util.createBcrypt(res._data.password); //盐加密
  res._data.isactive = true;
  let addRes = await addData(Mod, res._data);
  if (addRes) {
    res.send({
      result: 1,
      msg: "添加成功",
    });
    return;
  }
  Util.delPicFile(res._data.headPic);
  res.send({
    result: 0,
    msg: "添加失败",
  });
});
router.get(Config.ServerApi.userList, Util.checkToken, async (req, res) => {
  if (!Bussiness.isAdmin(res)) {
    return;
  }
  Bussiness.findInfo(
    req,
    res,
    Mod,
    {
      userType: res._data.sort,
    },
    res._data.keyWord.length
      ? {
          $or: [
            {
              mailaddress: new RegExp(res._data.keyWord, "i"),
            },
            {
              username: new RegExp(res._data.keyWord, "i"),
            },
          ],
        }
      : {}
  );
});
router.get(Config.ServerApi.freezeUser, Util.checkToken, async (req, res) => {
  if (!Bussiness.isAdmin(res)) {
    return;
  }
  Bussiness.freezeInfo(req, res, Mod);
});
router.get(Config.ServerApi.delUser, Util.checkToken, async (req, res) => {
  if (!Bussiness.isAdmin(res)) {
    return;
  }
  Bussiness.delInfo(req, res, Mod, "headPic");
});
router.post(Config.ServerApi.updateUser, Util.checkToken, async (req, res) => {
  let findRes = await findData(Mod, {
    _id: res._data._id,
  });
  if (!res._data.headPic || !res._data.headPic.length) {
    //这里判断是否是修改头像，若是新增，则是上传相关的头像信息，是个object类型，length属性不存在
    if (findRes[0].headPic != "public/assets/img/default.gif") {
      Util.delPicFile(findRes[0].headPic);
    }
    if (res._data.headPic) {
      res._data.headPic = Util.readPicFile(res._data.headPic || "");
    } else {
      res._data.headPic = "public/assets/img/default.gif";
    }
  }
  if (res._data.password !== findRes[0].password) {
    res._data.password = Util.createBcrypt(res._data.password); //密码盐加密
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

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
  res._data.time = Util.joinDate();
  res._data.password = Util.createBcrypt(res._data.password);
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
  if (res._data.userTokenType != "admin") {
    //非管理员
    res.send({
      result: -999,
      msg: "请用管理员账号登录",
    });
    return;
  }
  let total = await getTotalPage(Mod, res._data.pageSize);
  let query = new RegExp(res._data.keyWord, "i");
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
          time: res._data.sort,
        },
        res._data.page,
        res._data.pageSize,
        res._data.keyWord.length
          ? {
              $or: [
                {
                  mailaddress: query,
                },
                {
                  username: query,
                },
              ],
            }
          : {}
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
  if (!res._data.headPic.length) {
    let findRes = await findData(Mod, {
      _id: res._data._id,
    });
    if (findRes[0].headPic != "public/assets/img/default.gif") {
      Util.delPicFile(findRes[0].headPic);
    }
    res._data.headPic = Util.readPicFile(res._data.headPic || "") || "";
  }
  res._data.password = Util.createBcrypt(res._data.password);
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

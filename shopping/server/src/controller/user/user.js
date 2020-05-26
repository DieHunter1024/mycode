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
userCodeList = {}
router.get(Config.ServerApi.checkToken, Util.checkToken, async (_req, res) => {
  let findRes = await findData(Mod, {
    username: res._data.id.user
  });
  if (findRes.length && findRes) {
    res.send({
      result: 1,
      msg: "验证成功",
      data: findRes[0]
    });
    return;
  }
  res.send({
    result: 0,
    msg: "未查到用户信息"
  });
});
router.get(Config.ServerApi.getMailCode, async (_req, res) => {
  let _data = Util.getCrypto(Util.parseUrl(_req, res).crypto);
  let findRes = await findData(Mod, {
    mailaddress: _data.username.split('@')[0],
    mailurl: '@' + _data.username.split('@')[1],
  });
  if (!findRes.length || !findRes) {
    res.send({
      result: 0,
      msg: "用户未注册"
    });
    return;
  }
  await Util.createEmailCode(userCodeList, _data.username, findRes[0]) ? res.send({
    result: 1,
    msg: "发送成功",
  }) : res.send({
    result: 0,
    msg: "发送失败"
  });
});
router.get(Config.ServerApi.userLogin, async (req, res) => {
  let _data = Util.getCrypto(Util.parseUrl(req, res).crypto);
  switch (_data.loginType) {
    case 'code':
      if (!userCodeList[_data.username]) {
        res.send({
          result: 0,
          msg: "验证码错误",
        });
      } else if (new Date().getTime() < userCodeList[_data.username].targetTime && _data.mailcode == userCodeList[_data.username].code) {
        res.send({
          result: 1,
          token: Util.createToken(
            userCodeList[_data.username].info.userType,
            userCodeList[_data.username].info.username,
            _data.remember
          ),
          msg: "登录成功"
        })
        userCodeList[_data.username] = null
      } else if (new Date().getTime() > userCodeList[_data.username].targetTime) {
        res.send({
          result: 0,
          msg: "验证码超时",
        });
      } else {
        res.send({
          result: 0,
          msg: "验证码错误",
        });
      }
      break;
    case 'psd':
    default:
      let findRes = await findData(Mod, {
        $or: [{
            mailaddress: _data.username.split('@')[0],
            mailurl: '@' + _data.username.split('@')[1],
          },
          {
            username: _data.username,
          },
          {
            phoneNum: _data.username
          }
        ],
      });
      if (findRes && findRes.length > 0) {
        Util.checkBcrypt(_data.password, findRes[0].password) ?
          res.send({
            result: 1,
            token: Util.createToken(
              findRes[0].userType,
              findRes[0].username,
              _data.remember
            ),
            msg: "登录成功",
          }) :
          res.send({
            result: 0,
            msg: "密码错误",
          });
        return;
      }
      res.send({
        result: 0,
        msg: "用户不存在",
      });
      break;
  }
});
router.post(Config.ServerApi.addUser, Util.checkToken, async (req, res) => {
  if (res._data.headPic) {
    res._data.headPic = Util.readPicFile(res._data.headPic || "") || "";
  }
  let findRes = await findData(Mod, {
    $or: [{
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
    Mod, {
      userType: res._data.sort,
    },
    res._data.keyWord.length ? {
      $or: [{
          mailaddress: new RegExp(res._data.keyWord, "i"),
        },
        {
          username: new RegExp(res._data.keyWord, "i"),
        },
      ],
    } : {}
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
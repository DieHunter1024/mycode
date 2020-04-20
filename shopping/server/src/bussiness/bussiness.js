const {
  delData,
  updateData,
  findByPage,
  getTotalPage,
} = require("../command/command");
const Util = require("../../utils/utils");
module.exports = class Bussiness {
  static async freezeInfo(_req, res, _mod) {
    let freezeRes = await updateData(_mod, res._data._id, {
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
  }
  static async findInfo(_req, res, _mod, _sort, _keyWord) {
    let total = await getTotalPage(_mod, res._data.pageSize,_keyWord);
    res.send({
      result: 1,
      data: {
        page: res._data.page,
        pageSize: res._data.pageSize,
        totalPage: total.totalPage,
        allNum: total.allNum,
        list: await findByPage(
          _mod,
          _sort,
          res._data.page,
          res._data.pageSize,
          _keyWord
        ),
      },
      msg: "查找成功",
    });
  }
  static async delInfo(_req, res, _mod, _type) {
    if (
      res._data[_type] &&
      res._data[_type].length > 0 &&
      res._data[_type] != "public/assets/img/default.gif"
    ) {
      Util.delPicFile(res._data[_type]);
    }
    let deleteRes = await delData(_mod, res._data._id);
    if (deleteRes.ok) {
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
  }
  static async addInfo(_req, _res, _mod, _info) {}
  static isAdmin(res) {
    if (res._data.userTokenType != "admin") {
      //非管理员
      res.send({
        result: -999,
        msg: "请用管理员账号登录",
      });
      return false;
    }
    return true;
  }
};

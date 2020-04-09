module.exports = class Command {
  constructor() {}
  static addData(mod, _data) {
    //增
    return mod
      .insertMany(_data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return false;
      });
  }
  static delData(mod, _id) {
    //删
    return mod
      .remove({ _id })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return false;
      });
  }
  static updateData(mod, _id, data) {
    //改
    return mod
      .updateOne(
        {
          _id,
        },
        data
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return false;
      });
  }
  static findData(mod, _key) {
    //查
    return mod
      .find(_key)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return false;
      });
  }
  static async findByPage(mod, sort, page, pageSize, keyWord) {
    //分页查
    return await mod
      .find(keyWord)
      .sort(sort)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
  }
  static async getTotalPage(mod, pageSize) {
    let allNum = await mod.find().estimatedDocumentCount();
    return { totalPage: parseInt(allNum / pageSize) + 1, allNum };
  }
};

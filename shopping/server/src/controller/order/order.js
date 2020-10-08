const router = require("express").Router();//路由
const UserMod = require("../user/mod");//user表联动
const ShopMod = require("../shopList/mod");//shop表联动
const Mod = require("./mod");//order表
const Util = require("../../../utils/utils");//工具类
const Config = require("../../../config/config");//配置文件
const Bussiness = require("../../bussiness/bussiness");//接口逻辑
const { addData, updateData, findData } = require("../../command/command");//数据库操作
router.post(Config.ServerApi.addOrder, Util.checkToken, async (req, res) => {
  let userFindRes = await Bussiness.hasUser(req, res, UserMod);//检测用户及地址是否存在
  if (!userFindRes) {
    return;
  }
  if (!userFindRes[0].alladdress || !userFindRes[0].address) {
    res.send({
      result: -1,
      msg: "添加失败，请完善收货地址",
    });
    return;
  }
  let shopFindRes = await findData(ShopMod, {//检测商品是否存在
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
      result: -2,
      msg: "有商品不存在",
    });
    return;
  }
  let _orderPrice;//初始化商品总价
  let _shopFindRes = Util.deepCopy(shopFindRes); //解决数据库对象只读属性
  _shopFindRes.forEach((item, index) => {//合计总费用
    if (index == 0) {
      _orderPrice = 0;
    }
    _shopFindRes[index].shopCount = res._data.shopList[index].shopCount;
    _orderPrice +=
      _shopFindRes[index].shopCount * _shopFindRes[index].shopPrice;
  });
  res._data = {
    ...res._data,
    username: userFindRes[0].username,
    phoneNum: userFindRes[0].phoneNum,
    address: userFindRes[0].alladdress.join("") + userFindRes[0].address,
    orderId: Util.createOrderNo(),
    orderTime: Util.joinDate(),
    shopList: _shopFindRes,
    orderPrice: _orderPrice,
  };
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
    orderId: res._data.orderId,
  });
});
router.get(Config.ServerApi.orderList, Util.checkToken, async (req, res) => {
  Bussiness.findInfo(
    req,
    res,
    Mod,
    {
      orderTime: res._data.sort,//时间排序
    },
    {
      orderId: new RegExp(res._data.orderId, "i"),//orderId（订单号）模糊过滤
      username: new RegExp(res._data.keyWord, "i"),//订单用户名模糊过滤
      orderState: new RegExp(res._data.orderState, "i"),//订单状态模糊过滤
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
  // if (!Bussiness.isAdmin(res)) {
  //   return;
  // }
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

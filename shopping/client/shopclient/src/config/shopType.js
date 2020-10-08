export default class ShopType {
  //商品类型，图片类型，订单状态
  static shopType = [
    { name: "炒货", val: "0" },
    { name: "果味", val: "1" },
    { name: "蔬菜", val: "2" },
    { name: "点心", val: "3" },
    { name: "粗茶", val: "4" },
    { name: "淡饭", val: "5" }
    // { name: "其他", val: "6" },
  ];
  static picType = [
    { name: "单个商品", val: "0" },
    { name: "轮播图", val: "1" },
    { name: "分类", val: "2" },
    { name: "主题", val: "3" },
    { name: "其他", val: "4" }
  ];
  static orderState = [
    { name: "未付款", val: "0" },
    { name: "已付款", val: "1" },
    { name: "未发货", val: "2" },
    { name: "已发货", val: "3" },
    { name: "已完成", val: "4" },
    { name: "已退款", val: "5" }
  ];
}

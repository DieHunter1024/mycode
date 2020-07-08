export default class MenuList {
  static leftMenu = [
    {
      name: "商品管理",
      list: [
        { name: "商品列表", route: "/admin/shopList" },
      ]
    },
    {
      name: "用户管理",
      list: [
        { name: "用户列表", route: "/admin/userlist" },
      ]
    },
    {
      name: "订单管理",
      list: [
        { name: "订单列表", route: "/admin/orderlist" },
      ]
    }
  ];
}

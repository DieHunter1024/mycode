export default class MenuList {
  static leftMenu = [
    {
      name: "商品管理",
      list: [
        { name: "查找商品", route: "/admin/findshop" },
        { name: "新增商品", route: "/admin/addshop" },
        { name: "修改商品", route: "/admin/updatashop" }
      ]
    },
    {
      name: "用户管理",
      list: [
        { name: "用户列表", route: "/admin/userlist" },
      ]
    }
  ];
}

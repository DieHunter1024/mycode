import ShopList from "../page/shop/shopList/shopList";
import UserList from "../page/user/userList/userList";
export default class RouteList {
  static leftMenu = [
    { name: "商品列表", route: "/admin/shopList", comp: ShopList },
    { name: "用户列表", route: "/admin/userlist", comp: UserList },
  ];
}

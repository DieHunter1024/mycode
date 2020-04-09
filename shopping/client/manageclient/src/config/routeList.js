import FindShop from "../page/shop/findItem/find";
import AddShop from "../page/shop/addItem/add";
import UpdataShop from "../page/shop/findItem/find";
import UserList from "../page/user/userList/userList";
export default class RouteList {
  static leftMenu = [
    { name: "查找商品", route: "/admin/findshop", comp: FindShop },
    { name: "新增商品", route: "/admin/addshop", comp: AddShop },
    { name: "修改商品", route: "/admin/updatashop", comp: UpdataShop },
    { name: "用户列表", route: "/admin/userlist", comp: UserList },
  ];
}

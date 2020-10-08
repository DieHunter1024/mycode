import Home from "../page/home/home";//商品首页
import Kind from "../page/kind/kind";//分类界面
import ShopCar from "../page/shopCar/shopCar";//购物车
import Info from "../page/info/info";//个人主页
import Order from "../page/order/order";//订单管理界面
import ShopTheme from "../page/shopTheme/shopTheme";//主题界面
import ShopInfo from "../page/shopInfo/shopInfo";//商品详情
import Register from "../page/register/register";//注册界面
import UpdateInfo from "../page/updateInfo/updateInfo";//个人信息修改

export default class RouteConfig {
  static routes = [
    {
      path: "/",
      redirect: "/Home"
    },
    {
      path: "/Home",
      name: "Home",
      component: Home,
      meta: {
        index: 0
      }
    },
    {
      path: "/Kind",
      name: "Kind",
      component: Kind,
      meta: {
        index: 0
      }
    },
    {
      path: "/ShopCar",
      name: "ShopCar",
      component: ShopCar,
      meta: {
        index: 0
      }
    },
    {
      path: "/Info",
      name: "Info",
      component: Info,
      meta: {
        index: 0
      }
    },
    {
      path: "/ShopTheme",
      name: "ShopTheme",
      component: ShopTheme,
      meta: {
        index: 1
      }
    },
    {
      path: "/ShopInfo",
      name: "ShopInfo",
      component: ShopInfo,
      meta: {
        index: 2
      }
    },
    {
      path: "/Register",
      name: "Register",
      component: Register,
      meta: {
        index: 1
      }
    },
    {
      path: "/UpdateInfo",
      name: "UpdateInfo",
      component: UpdateInfo,
      meta: {
        index: 1
      }
    },
    {
      path: "/Order",
      name: "Order",
      component: Order,
      meta: {
        index: 1
      }
    }
  ];
}

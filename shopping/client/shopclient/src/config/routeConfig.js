import Home from "../page/home/home";
import Kind from "../page/kind/kind";
import ShopCar from "../page/shopCar/shopCar";
import Info from "../page/info/info";
import ShopTheme from "../page/shopTheme/shopTheme";
import ShopInfo from "../page/shopInfo/shopInfo"
export default class RouteConfig {
  static routes = [{
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
    }, {
      path: "/ShopInfo",
      name: "ShopInfo",
      component: ShopInfo,
      meta: {
        index: 2
      }
    }
  ];
}

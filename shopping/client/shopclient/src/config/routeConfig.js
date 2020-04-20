import Home from "../page/home/home"
import Kind from "../page/kind/kind"
import ShopCar from "../page/shopCar/shopCar"
import Info from "../page/info/info"
export default class RouteConfig {
  static routes = [{
    path: '/',
    redirect: "/Home"
  }, {
    path: '/Home',
    name: 'Home',
    component: Home
  }, {
    path: '/Kind',
    name: 'Kind',
    component: Kind
  }, {
    path: '/ShopCar',
    name: 'ShopCar',
    component: ShopCar
  }, {
    path: '/Info',
    name: 'Info',
    component: Info
  }]

}

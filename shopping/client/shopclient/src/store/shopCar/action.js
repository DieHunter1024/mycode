import State from "./state"
import Vue from "vue"
import Config from "../../config/config"
const {
  EventName
} = Config;
export default class Action extends Vue {
  constructor() {
    super()
    this._state = new State()
  }
  set state(val) {
    this._state.shopCar = val
  }
  get state() {
    return this._state.shopCar
  }
  countShopItem(_data) {
    if (!_data._id) {//阻塞商品id为空现象
      return
    }
    let _shopCar = this.state//获取原购物车列表
    let list = _shopCar.filter(function (item) {
      return item._id === _data._id;//通过id查找购物车中传递项
    });
    if (list.length == 0) {//未找到时新建购物车商品
      _data.sum = _data.shopCount * _data.shopPrice;//商品总价
      _data.isSelect = false//是否选中商品，购物车界面默认值
      _shopCar.push(_data);
    } else if ((_data.shopNum > list[0].shopCount + _data.shopCount) && (list[0].shopCount + _data.shopCount <= 9) && list[0].shopCount + _data.shopCount > 0) {//找到时更新商品
      list[0].shopCount += _data.shopCount;
      list[0].sum = list[0].shopCount * list[0].shopPrice;
    } else if (list[0].shopCount + _data.shopCount <= 0) {//购物车允许最小值
      this.$events.emitEvent(EventName.CountShop, 'min');
      return;
    } else {//购物车允许最大值
      this.$events.emitEvent(EventName.CountShop, 'max');
      return;
    }
    this.state = _shopCar
    this.$events.emitEvent(EventName.CountShop);
  }
  delShopItem(_id) {
    let _shopCar = this.state//获取现有购物车列表
    _shopCar.splice(_id, 1)//数组删除第_id项
    this.state = _shopCar//刷新购物车列表
    this.$events.emitEvent(EventName.CountShop);//刷新界面
  }
  selAllChild(_sel) {//修改商品全选，全选按钮驱动单个商品，刷新数据
    this.state = this.state.map(item => {
      item.isSelect = _sel;//当全选按钮选中，修改所有商品状态
      return item;
    });
    this.$events.emitEvent(EventName.SelectAllChild);
  }
  filterSelect() {//修改商品全选，单个商品驱动全选按钮，刷新数据
    let shopConfig = {//所有商品总计初始值
      _count: 1,//是否全选
      _selCount: 0,//商品总数
      _sum: 0//商品总价
    }
    this.state.forEach(item => {
      shopConfig._selCount += item.isSelect ? 1 : 0;
      shopConfig._count *= item.isSelect;//判断是否全选，初始值0，若全为false，相乘等于0，若全为true，相乘为1，即等于1是全选，等于0是未全选
      shopConfig._sum += item.isSelect ? item.sum : 0
    });
    this.$events.emitEvent(EventName.SelectParent, shopConfig);
  }
  delSelShop() {//直接通过遍历商品选中状态值进行删除，并刷新数据
    let _list = []
    this.state.map(item => {
      if (!item.isSelect) {
        _list.push(item)
      }
    });
    this.state = _list
    this.$events.emitEvent(EventName.CountShop);
  }
}

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
    if (!_data._id) {
      return
    }
    let _shopCar = this.state
    let list = _shopCar.filter(function (item) {
      return item._id === _data._id;
    });
    if (list.length == 0) {
      _data.sum = _data.shopCount * _data.shopPrice;
      _data.isSelect = false
      _shopCar.push(_data);
    } else if ((_data.shopNum > list[0].shopCount + _data.shopCount) && (list[0].shopCount + _data.shopCount <= 9) && list[0].shopCount + _data.shopCount > 0) {
      list[0].shopCount += _data.shopCount;
      list[0].sum = list[0].shopCount * list[0].shopPrice;
    } else if (list[0].shopCount + _data.shopCount <= 0) {
      this.$events.emitEvent(EventName.CountShop, 'min');
      return;
    } else {
      this.$events.emitEvent(EventName.CountShop, 'max');
      return;
    }
    this.state = _shopCar
    this.$events.emitEvent(EventName.CountShop);
  }
  delShopItem(_id) {
    let _shopCar = this.state
    _shopCar.splice(_id, 1)
    this.state = _shopCar
    this.$events.emitEvent(EventName.CountShop);
  }
  selAllChild(_sel) {
    this.state = this.state.map(item => {
      item.isSelect = _sel;
      return item;
    });
    this.$events.emitEvent(EventName.SelectAllChild);
  }
  filterSelect() {
    let shopConfig = {
      _count: 1,
      _selCount: 0,
      _sum: 0
    }
    this.state.forEach(item => {
      shopConfig._selCount += item.isSelect ? 1 : 0;
      shopConfig._count *= item.isSelect;
      shopConfig._sum += item.isSelect ? item.sum : 0
    });
    this.$events.emitEvent(EventName.SelectParent, shopConfig);
  }
  delSelShop() {
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

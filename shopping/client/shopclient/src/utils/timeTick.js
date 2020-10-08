import Vue from "vue";
import Config from "../config/config";
const { GetCodeTime, CodeText } = Config;
class TimeTick {
  static timer = GetCodeTime / 1000;//倒计时时间
  static _timeTick = null;//定时器
  static timeTick(fn) {
    if (!TimeTick._timeTick) {
      TimeTick._timeTick = setInterval(() => {
        if (TimeTick.timer-- <= 1) {
          // 重置倒计时和发送邮箱验证开关
          TimeTick.clearTick();
          fn({ content: CodeText, res: 1 });//倒计时归零
        } else {
          fn({ content: TimeTick.timer + "S", res: 0 });//倒计时中，阻止用户重复点击
        }
      }, 1000);
    }
  }
  static clearTick() {
    //清除定时器
    clearInterval(TimeTick._timeTick);
    TimeTick._timeTick = null;
  }
}
Vue.prototype.$timeTick = TimeTick;

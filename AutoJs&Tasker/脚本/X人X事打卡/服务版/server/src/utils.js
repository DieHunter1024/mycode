const nodemailer = require("nodemailer");

// 发布/订阅设计模式(Pub/Sub)
class EventBus {
  constructor() {
    this._eventList = {}; //调度中心列表
  }

  static Instance() {
    //返回当前类的实例的单例
    if (!EventBus._instance) {
      Object.defineProperty(EventBus, "_instance", {
        value: new EventBus(),
      });
    }
    return EventBus._instance;
  }

  /**
   * 注册事件至调度中心
   * @param type 事件类型，特指具体事件名
   * @param fn 事件注册的回调
   */
  onEvent(type, fn) {
    //订阅者
    if (!this.isKeyInObj(this._eventList, type)) {
      //若调度中心未找到该事件的队列，则新建某个事件列表（可以对某个类型的事件注册多个回调函数）
      Object.defineProperty(this._eventList, type, {
        value: [],
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }
    this._eventList[type].push(fn);
  }

  /**
   * 触发调度中心的某个或者某些该事件类型下注册的函数
   * @param type 事件类型，特指具体事件名
   * @param data 发布者传递的参数
   */
  emitEvent(type, data) {
    //发布者
    if (this.isKeyInObj(this._eventList, type)) {
      for (let i = 0; i < this._eventList[type].length; i++) {
        this._eventList[type][i] && this._eventList[type][i](data);
      }
    }
  }

  offEvent(type, fn) {
    //销毁监听
    for (let i = 0; i < this._eventList[type].length; i++) {
      if (this._eventList[type][i] && this._eventList[type][i] === fn) {
        this._eventList[type][i] = null;
      }
    }
  }

  /**
   * 检查对象是否包含该属性，除原型链
   * @param obj 被检查对象
   * @param key 被检查对象的属性
   */
  isKeyInObj(obj, key) {
    return Object.hasOwnProperty.call(obj, key);
  }
}

exports.EventBus = EventBus.Instance();

exports.sendResMsg = function ({
  res,
  type = "login",
  state = 1,
  msg = "发送成功",
  data = {},
}) {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write(JSON.stringify({ state, msg, data, type }));
  res.end();
};

const EmailTransporter = {
  // service: "qq", // 运营商  qq邮箱 网易  若使用QQ邮箱，则只需配置service：qq
  host: "smtp.163.com", // 若使用网易邮箱，则只需配置host：smtp.163.com
  port: 465, //端口
  // secure: false,
  auth: {
    // user: "321321@163.com", //发送方的邮箱
    // pass: "123123", // pop3 授权码
  },
};
exports.SendEmail = class {
  static transporter = nodemailer.createTransport(EmailTransporter); //邮箱配置项
  static mailOptions = null; //邮箱配置
  /* 发送邮件模块
   * @method    sendEmail
   * @for       SendMail
   * @param   {String} mail  用户邮箱号
   * @param   {String} title  邮件标题
   * @param   {String} content  邮件内容
   * @return {Boolean}   是否发送成功
   */
  static async sendEmail(mail, title, content) {
    this.mailOptions = {
      from: '"自动打卡通知" <' + EmailTransporter.auth.user + ">",
      to: mail,
      subject: title,
      text: content,
    };
    try {
      let result = await this.transporter.sendMail(this.mailOptions);
      console.log("发送成功");
      return true;
    } catch (error) {
      console.log(error);
      console.log("发送失败");
      return false;
    }
  }
};

import Vue from "vue";
class Events extends Vue {
  constructor() {
    super();
  }
  static getInstance() {
    if (!Events._instance) {
      Object.defineProperty(Events, "_instance", {
        value: new Events()
      });
    }
    return Events._instance;
  }
  onEvent(_event, _fn) {
    this.$on(_event, _fn);
  }
  onceEvent(_event, _fn) {
    this.$once(_event, _fn);
  }
  emitEvent(_event, _data) {
    this.$emit(_event, _data);
  }
  offEvent(_event, _fn) {
    this.$off(_event, _fn)
  }
}
Vue.prototype.$events = Events.getInstance()

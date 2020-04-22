import Vue from 'vue'
export default class Events extends Vue {
  constructor() {
    super()
  }
  static getInstance() {
    if (!Events._instance) {
      Object.defineProperty(Events, "_instance", {
        value: new Events()
      })
    }
    return Events._instance;
  }
  onEvent(_event, _data) {
    this.$on(_event, _data)
  }
  emitEvent(_event, _fn) {
    this.$emit(_event, _fn)
  }
}

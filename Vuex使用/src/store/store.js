import Vue
from "vue";
import Vuex
from "vuex";

Vue.use(Vuex);
const state = {
  val: ''
}

const mutations = {
  changeVal(state, _val) {
    state.val = _val
  },
  clearVal(state, _val) {
    state.val = ''
  }
}
const actions = {
  actionVal(state, _val) {
    state.commit('changeVal', _val)
  },
  actionClearVal(state) {
    state.commit('clearVal')
  }
}
const getters = {
  getValueLength(state) {
    return `长度：${state.val.length}`
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

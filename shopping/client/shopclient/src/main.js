import Vue from 'vue'
import App from './App'
import router from './router'
import "./style/main.less"
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
import './utils/axios'
import './utils/cryptoTool'

Vue.use(MintUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

import 'babel-polyfill'
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import * as ElIcons from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import { Excel, mixinGlobal, mixinComponent } from "./utils"
const app = createApp(App).use(ElementPlus)
const excel = new Excel()
mixinComponent(app, ElIcons)
mixinGlobal(app, { excel })
Window.prototype.app = app
app.mount('#app')

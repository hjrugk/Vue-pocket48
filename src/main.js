import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Menu,MenuItem,Submenu } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Menu,MenuItem,Submenu,Form,FormItem,Input,Carousel,CarouselItem,Tag } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import axios from 'axios'

Vue.use(Menu)
Vue.use(Tag)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Carousel)
Vue.use(CarouselItem)

Vue.filter('picPathFormat',function (item) {
  return item.includes("http")?item.split(',')[0]:("https://source.48.cn" + item.split(',')[0])
})

Vue.config.productionTip = false

Vue.prototype.axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

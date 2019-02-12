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
  if (item.lastIndexOf('http') === -1){
    return ((item.lastIndexOf(',')===-1)?("https://source.48.cn" + item):("https://source.48.cn" + item.split(',')[0]))
  } else {
    return item
  }
})

Vue.filter('liveUrlFormat', function (item) {
  return ('https://h5.48.cn/2017appshare/memberLiveShare/index.html?id=' + item)
})

Vue.config.productionTip = false

Vue.prototype.axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

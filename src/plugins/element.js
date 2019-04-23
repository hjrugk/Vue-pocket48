import Vue from 'vue'
import {
  Button,
  Menu,
  MenuItem,
  Submenu,
  Form,
  FormItem,
  Input,
  Carousel,
  CarouselItem,
  Tag,
  Message,
  Radio,
  MessageBox,
  Select,
  Option,
} from 'element-ui'

Vue.use(Button)
Vue.use(Menu)
Vue.use(Tag)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Radio)
Vue.use(Select)
Vue.use(Option)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
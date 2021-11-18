import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// ElementUI
import { Icon, Button, Carousel, CarouselItem } from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
// ElementUI
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(Icon)
Vue.use(Button)
Vue.component(Carousel.name, Carousel)
Vue.component(CarouselItem.name, CarouselItem)

// 导入
import toast from "./components/common/toast"
// 安装toast插件
Vue.use(toast) //调用Vue.use 本质上会去执行对象的install方法


// 添加事件总线
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')






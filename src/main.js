import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import toast from "@/components/common/toast";
Vue.config.productionTip = false

//vue实例可以作为事件总线，创建一个新的vue实例赋值给bus
Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// http 请求
import http from './api/http'

Vue.prototype.$http = http


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

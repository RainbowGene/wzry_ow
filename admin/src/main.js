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

// 为全局的 el-upload 加上 header 携带 token的属性
Vue.mixin({
  computed: {
    getUploadUrl() { // 上传文件路径
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeader() { // 在任意组件内可以使用该方法
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

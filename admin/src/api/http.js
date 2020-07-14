import axios from 'axios'
import Vue from 'vue'
import router from '../router'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

// 请求拦截 : 请求头中携带token
http.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token // 标准行业规范的请求头
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截
http.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.msg) {
    // 错误的状态码：与服务端约定，凡是错误请求返回 json  {msg:'错误信息'}
    // console.log(err.response.data.msg)
    Vue.prototype.$message.info(err.response.data.msg)
  }
  // 401 跳转登录页
  if (err.response.status === 401) {
    router.push('/login') // 这里使用原型链访问不到，需要先引用
  }
  return Promise.reject(err)
})

export default http
import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

// 请求拦截
http.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.msg) {
    // 错误的状态码：与服务端约定，凡是错误请求返回 json  {msg:'错误信息'}
    // console.log(err.response.data.msg)
    Vue.prototype.$message.info(err.response.data.msg)
  }
  return Promise.reject(err)
})

export default http
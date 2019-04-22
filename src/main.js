import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './assets/font/iconfont.css'
import BreadCrumb from '@/components/BreadCrumb'
import Pagination from '@/components/Pagination'

axios.defaults.baseURL = 'http://127.0.0.1:11333/api/private/v1/'
axios.interceptors.request.use(
  config => {
    let token = sessionStorage.getItem('token')
    config.headers.Authorization = token
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.component('bread-crumb', BreadCrumb)
Vue.component('pagination', Pagination)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

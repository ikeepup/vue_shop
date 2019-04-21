import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './assets/font/iconfont.css'
import BreadCrumb from '@/components/BreadCrumb'

axios.defaults.baseURL = 'http://127.0.0.1:11333/api/private/v1/'
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.component(
  'bread-crumb', BreadCrumb
)

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (!sessionStorage.getItem('token')) {
      router.push('/login')
      return
    }
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

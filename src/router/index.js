import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import '../assets/css/globle.css'
import ELementUi from 'element-ui'
Vue.use(Router)

Vue.use(ELementUi)

export default new Router({
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', component: Login}
  ]
})
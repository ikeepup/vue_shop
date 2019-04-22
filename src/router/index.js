import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Welcome from '@/components/Welcome'
import '../assets/css/globle.css'
import ELementUi from 'element-ui'
import HelloWorld from '@/components/HelloWorld'
import Users from '@/components/Users'

Vue.use(Router)
Vue.use(ELementUi)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/welcome',
      component: Welcome,
      children: [
        { path: '/welcome', component: HelloWorld },
        { path: '/users', component: Users }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (!sessionStorage.getItem('token')) {
      return next('/login')
    }
  }
  next()
})

export default router

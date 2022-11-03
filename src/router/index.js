import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    
    path: '/',
    name: 'main',
    redirect: '/login',
    component:Main,
    children: [
      /* {
        path: '/home',
        name: 'home',
        component: () => import('views/home/Home')
      },
      {
        path: '/mall',
        name: 'mall',
        component: () => import('views/mall/Mall')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('views/user/User')
      },
      {
        path: '/page1',
        name: 'page1',
        component: () => import('views/other/Otherone')
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('views/other/Othertwo')
      } */
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('views/login/Login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/qq',
      name: 'qqmusic',
      component: () => import('./components/qqmusic.vue')
    },
    {
      path: '/roomlist',
      name: 'roomlist',
      component: () => import('./components/roomlist.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/login.vue')
    },
    {
      path: '/roommsg/:id',
      name: 'roommsg',
      component: () => import('./components/roommsg.vue')
    }
  ]
})
